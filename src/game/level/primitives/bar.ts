import { IPrimitive } from "./primitives"
import { Ring } from "../ring"

export class BarPrimitive implements IPrimitive {
    constructor(
        public ring: Ring,
        public angle = 0,
        public length = 0,
        public distance = 0,
        public barRadius = 0
    ) {}

    serialize() {
        return {
            type: "BarPrimitive",

            angle: this.angle,
            length: this.length,

            distance: this.distance,
            barRadius: this.barRadius
        }
    }

    advance(dTime: number, levelTime: number) {
        this.angle += dTime
    }

    hitTest(x: number, y: number, bulletRadius = 0): IPrimitive {
        x -= this.ring.centerX
        y -= this.ring.centerY

        let angle = Math.atan2(y, x) / (2 * Math.PI)
        if (angle < 0) angle += 1

        let startAngle = this.angle % 1
        if (startAngle < 0) startAngle++
        let endAngle = (startAngle + this.length) % 1
        if (endAngle < 0) endAngle++

        let mightCollide = false

        if (endAngle >= startAngle) {
            mightCollide = angle >= startAngle && angle <= endAngle
        } else {
            mightCollide = angle >= startAngle || angle <= endAngle
        }

        if (!mightCollide) return null

        if (
            Math.abs(Math.hypot(x, y) - this.distance) < (this.barRadius + bulletRadius)
        ) {
            return this
        }

        return null
    }

    getSpan() {
        return Math.hypot(
            this.ring.centerX + this.distance + this.barRadius,
            this.ring.centerX + this.distance + this.barRadius
        )
    }
}