export type EasingFunction = (coeff: number) => number

export let inverseEasing: EasingFunction = (coeff: number): number => {
    return 1 - coeff
}

export let linearEasing: EasingFunction = (coeff: number): number => {
    return coeff
}

export function constantEasing(constant: number): EasingFunction {
    return (coeff: number) => constant
}

export function exponentEasing(exp: number): EasingFunction {
    return (coeff: number): number => {
        return coeff ** exp
    }
}

export function biExponentEasing(exp: number): EasingFunction {
    return compoundEasing(
        compositeEasing(
            exponentEasing(exp)
        ),
        compositeEasing(
            inverseEasing, exponentEasing(exp), inverseEasing
        )
    )
}

export function remapEasing(min: number, max: number): EasingFunction {
    return (coeff: number): number => {
        return min + coeff * (max - min)
    }
}

export function compositeEasing(...easings: EasingFunction[]): EasingFunction {
    return (coeff: number): number => {
        easings.forEach(easing => coeff = easing(coeff))
        return coeff
    }
}

export function compoundEasing(...easings: EasingFunction[]): EasingFunction {
    return (coeff: number): number => {
        if (!easings.length) return coeff
        let easingIndex = Math.floor(coeff * easings.length)
        if (easingIndex >= easings.length) easingIndex = easings.length - 1
        else if (easingIndex < 0) easingIndex = 0
        
        coeff = (coeff * easings.length - easingIndex) % 1
        if (coeff < 0) coeff += 1

        let coeffLength = 1 / easings.length
        let coeffStart = coeffLength * easingIndex
        
        return coeffStart + easings[easingIndex](coeff) * coeffLength
    }
}

export function remapDTime(
    dTime: number, levelTime: number,
    easingFunction: EasingFunction
): {
    dTime: number, levelTime: number
} {
    let intPart = Math.floor(levelTime)
    let presentFractLevelTime = levelTime - intPart
    let pastFractLevelTime = presentFractLevelTime - dTime

    presentFractLevelTime = easingFunction(presentFractLevelTime)
    if (pastFractLevelTime < 0)
        pastFractLevelTime = easingFunction(pastFractLevelTime + 1) - 1
    else
        pastFractLevelTime = easingFunction(pastFractLevelTime)

    return {
        dTime: presentFractLevelTime - pastFractLevelTime,
        levelTime: intPart + presentFractLevelTime
    }
}