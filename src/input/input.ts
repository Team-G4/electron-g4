import { EventEmitter } from "../util/events"

/**
 * An action triggered by the input
 */
export enum InputAction {
    /**
     * The "shoot" action
     */
    cannonShoot,
    /**
     * The "enable slow mode" action
     */
    slowModeEnable,
    /**
     * The "disable slow mode" action
     */
    slowModeDisable
}

/**
 * Represents an input method
 */
export class InputMethod extends EventEmitter {
}