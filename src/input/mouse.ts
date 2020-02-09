import { InputMethod, InputAction } from "./input"

/**
 * Mouse input
 */
export class MouseInputMethod extends InputMethod {
    /**
     * Creates a mouse input handler
     * @param domElement - the DOM element containing the game
     */
    constructor(
        domElement: HTMLElement
    ) {
        super()

        domElement.addEventListener("click", () => {
            this.emit("input", InputAction.cannonShoot)
        })
    }
}