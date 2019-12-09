/*
    Hi sister!
    This is an example G4X plugin.

    This one will create a "Retrox" mode which will
    work just like the built-in Nox mode, but with
    a retro LeWk.
*/

// A class representing a moving "star"
class Star {
    constructor() {
        this.x = Math.random()
        this.y = 1
        this.yVelo = Math.random() * 0.5 + 0.5
    }
}

/*
    This is the custom mode class.
*/
class RetroxMode extends G4.Mode {
    constructor() {
        /*
            When calling the super() method in the
            constructor, pass the name of your mode
            as the argument.
        */
        super("RetroX")

        // Some objects used for rendering
        this.stars = []
        this.lastTime = 0
    }

    /*
        G4.Mode.getRings() returns the level geometry
        for a given level. The first parameter (levelIndex)
        stores the # of the level (the same number that's
        visible in the top bar of the game).
    */
    getRings(
        levelIndex // the number of the generated level
    ) {
        return G4.levelGen.generateMode("nox", levelIndex)
    }

    // Just a quick function that clears up the invisible stars
    removeInvisibleStars() {
        this.stars.forEach((star, i) => {
            if (star.y < -0.1) this.stars.splice(i, 1)
        })
    }

    /*
        G4.Mode.renderBackground() is called by the game right
        before rendering the level geometry.
    */
    renderBackground(viewport, gameTime) {
        this.removeInvisibleStars()
        this.stars.push(new Star())

        this.stars.forEach(star => {
            // viewport.createPath() returns a regular Path2D object
            // https://developer.mozilla.org/en-US/docs/Web/API/Path2D
            let starPath = viewport.createPath()

            let x = star.x * viewport.width
            let y = star.y * viewport.height

            starPath.rect(
                1.5 * x - 5, 1.5 * y - 10, 10, 20
            )
            // Draw the star!
            viewport.fillPath(starPath, "#333")

            star.y -= star.yVelo * 0.03
        })
    }

    /*
        G4.Mode.renderRings() replaces the default level geometry
        rendering code.
    */
    renderRings(rings, viewport, gameTime) {
        let ringsPath = viewport.createPath()

        rings.forEach(ring => {
            ringsPath.addPath(
                // getRingPath() can be used to get the default paths used by the game
                G4.render.getRingPath(ring)
            )
        })

        let colors = [
            ["red", 10 * Math.sin(gameTime) + 20],
            ["green", 10 * Math.sin(gameTime) + 20],
            ["blue", 10 * Math.sin(gameTime) + 20]
        ]

        let acc = 0
        colors.forEach(v => acc += v[1])

        // scale() and translate() can be used to apply transformations to the viewport
        // Note that the transformation is reset before every call to the render*() functions
        viewport.scale(1, 0.8)
    
        viewport.translate(
            0,
            acc
        )


        for (let i = colors.length - 1; i >= 0; i--) {
            viewport.fillPath(ringsPath, colors[i][0])
            viewport.translate(
                0,
                -colors[i][1]
            )
        }

        viewport.fillPath(ringsPath, "yellow")
    }

    /*
        G4.Mode.renderCannon() replaces the default function
        used to render the cannon.
    */
    renderCannon(cannon, viewport, gameTime) {
        let path = G4.render.getCannonPath(cannon)

        viewport.scale(1, 0.8)

        viewport.translate(0, 100)
        viewport.fillPath(path, "#222")

        viewport.translate(0, -25)
        viewport.fillPath(path, "#555")

        viewport.translate(0, -25)
        viewport.fillPath(path, "#999")

        viewport.translate(0, -25)
        viewport.fillPath(path, "#ccc")

        viewport.translate(0, -25)
        viewport.fillPath(path, "#fff")
    }


    /*
        G4.Mode.renderProjectile() replaces the default function
        used to render the bullet. When there is no bullet in the
        level, this function will not be called.
    */
    renderProjectile(bullet, viewport, gameTime) {
        let path = viewport.createPath()

        path.arc(
            bullet.x, bullet.y,
            10, 0, Math.PI * 2
        )

        viewport.scale(1, 0.8)
        viewport.fillPath(path, "white")
    }

    /*
        G4.Mode.getColors() is used to provide the game
        with the theme colors used by the mode.
        Please note that custom modes do not support
        customization through the built-in themes yet.
    */
    getColors() {
        return {
            background: "#000000",
            damage: "#100000",

            foreground: "#AAAAAA",
            obstacle1: "#FFFFFF",
            obstacle2: "#FFFFFF",

            cannon: "#FFFFFF",
            bullet: "#FFFFFF"
        }
    }
}

/*
    New modes can be registered
    with plugin.registerMode()
*/
plugin.registerMode(new RetroxMode())
