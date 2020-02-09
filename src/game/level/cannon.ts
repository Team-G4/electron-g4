import { IPrimitive, SerializedPrimitive } from "./primitives/primitives"
import { Ring } from "./ring"
import { Level } from "./level"

/**
 * A bullet
 */
export class Bullet {
    public radius = 8

    /**
     * Creates a bullet
     * @param x - the X coordinate of the bullet
     * @param y - the Y coordinate of the bullet
     * @param velocityX - the X component of bullet velocity
     * @param velocityY - the Y component of bullet velocity
     */
    constructor(
        public x: number,
        public y: number,
        public velocityX = 0,
        public velocityY = 0,
        public source: Cannon
    ) {}

    advance(dTime: number) {
        this.x += this.velocityX * dTime
        this.y += this.velocityY * dTime
    }
}

/**
 * A cannon
 */
export class Cannon implements IPrimitive {
    /**
     * Creates a cannon
     * @param ring - the parent ring
     * @param angle - the initial position on the ring <0-1>
     * @param distance - the distance to the center of the ring
     * @param rotation - the rotation of the cannon
     * @param rotationFrequency - the frequency of the cannon rotation
     */
    constructor(
        public ring: Ring,
        public angle: number,
        public distance: number,
        public rotation = 0,
        public rotationFrequency = 1
    ) {}

    get position() {
        return {
            x: this.ring.centerX + Math.cos(this.angle * Math.PI * 2) * this.distance,
            y: this.ring.centerY + Math.sin(this.angle * Math.PI * 2) * this.distance
        }
    }

    serialize(): SerializedPrimitive {
        return {
            type: "Cannon",

            angle: this.angle,
            distance: this.distance,

            rotation: this.rotation,
            rotationFrequency: this.rotationFrequency
        }
    }

    advance(dTime: number) {
        this.angle += dTime
        this.rotation += dTime * this.rotationFrequency
    }

    hitTest(x: number, y: number, bulletRadius: number): IPrimitive {
        return null
    }

    shoot(): Bullet {
        const {x, y} = this.position
        const angle = this.rotation * 2 * Math.PI
        
        return new Bullet(
            x + 20 * Math.cos(angle),
            y + 20 * Math.sin(angle),
            2000 * Math.cos(angle),
            2000 * Math.sin(angle),
            this
        )
    }

    getSpan() {
        return Math.hypot(
            this.ring.centerX + this.distance + 20,
            this.ring.centerY + this.distance + 20
        )
    }
}