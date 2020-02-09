import { Level } from "../game/level/level"

/**
 * Represents a renderer
 */
export interface IRenderer {
    updateSize: (w: number, h: number) => void;

    initLevel: (level: Level) => void;

    render: (dTime: number) => void;
}

/**
 * Represents a textual renderer
 */
export interface ITextualRenderer extends IRenderer {
    render: (dTime: number) => string;
}

/**
 * Represents an on-screen visual renderer
 */
export interface IVisualRenderer extends IRenderer {
    /**
     * The Canvas element containing the rendered game
     */
    domElement: HTMLCanvasElement;
}
