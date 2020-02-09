import { Level } from "../../game/level/level"
import { IVisualRenderer } from "../renderer"
import { Canvas2DRasterizer, ICanvas2DRasterizedPrimitive, Canvas2DRasterizedLevel } from "./rasterizer"
import { IMode } from "../../game/mode/mode"
import { BeatingHeart } from "../../util/heart"

/**
 * Represents a Canvas 2D renderer
 */
export class Canvas2DRenderer implements IVisualRenderer {
    /**
     * The <canvas> used by the renderer
     */
    public canvas = document.createElement("canvas")
    /**
     * The 2D context of the canvas
     */
    public ctx = this.canvas.getContext("2d")

    /**
     * The rasterizer
     */
    public rasterizer = new Canvas2DRasterizer()

    /**
     * The current level
     */
    public level: Level
    /**
     * The rasterized level
     */
    public rasterizedLevel: Canvas2DRasterizedLevel

    // Spare the poor constructor
    // has it done anything to you
    // eslint, shut up
    constructor() {
    }

    get domElement(): HTMLCanvasElement {
        return this.canvas
    }

    updateSize(w: number, h: number) {
        const scaleFactor = this.level ? this.level.getScaleFactor(
            Math.min(w, h)
        ) : 1

        this.canvas.width = w
        this.canvas.height = h

        this.ctx.resetTransform()
        this.ctx.translate(w / 2, h / 2)
        this.ctx.scale(scaleFactor, scaleFactor)
    }

    initLevel(level: Level) {
        this.level = level
        this.rasterizedLevel = this.rasterizer.rasterize(level.mode, level) as Canvas2DRasterizedLevel
    }

    render(dTime: number) {

        this.level.mode.advance(this.level, dTime)
        this.rasterizedLevel.update(this.level.mode.isMaterialDynamic)

        this.ctx.clearRect(
            -this.canvas.width / 2,
            -this.canvas.height / 2,
            this.canvas.width,
            this.canvas.height
        )
        
        this.rasterizedLevel.path.render(this.ctx)
    }
}