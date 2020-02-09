import { IPrimitive } from "../game/level/primitives/primitives"
import { Ring } from "../game/level/ring"
import { Level } from "../game/level/level"
import { IMode } from "../game/mode/mode"

export type Rasterizable = IPrimitive | Ring | Level

/**
 * Represents a rasterized primitive (ball, bar, cannon, hopes and dreams, ...)
 */
export interface IRasterizedPrimitive {
    /**
     * Updates the rasterized primitive every frame.
     */
    update: (deepUpdate: boolean) => void;
}

/**
 * Represents a rasterizer
 */
export interface IRasterizer {
    /**
     * Rasterizes an object
     */
    rasterize: (mode: IMode, prim: Rasterizable) => IRasterizedPrimitive;
}
