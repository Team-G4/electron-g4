import { IPrimitive } from "./primitives"
import { Ring } from "../ring"

export class BallPrimitive implements IPrimitive {
    constructor(
        public ring: Ring,
        public angle = 0,
        public distance = 0,
        public ballRadius = 0
    ) {}

    serialize() {
        return {
            type: "BallPrimitive",

            angle: this.angle,
            distance: this.distance,
            ballRadius: this.ballRadius
        }
    }

    advance(dTime: number, levelTime: number) {
        this.angle += dTime
    }

    get ballPosition() {
        return {
            x: this.ring.centerX + Math.cos(this.angle * Math.PI * 2) * this.distance,
            y: this.ring.centerY + Math.sin(this.angle * Math.PI * 2) * this.distance
        }
    }

    hitTest(x: number, y: number, bulletRadius = 0): IPrimitive {
        const ballPos = this.ballPosition

        if (
            Math.hypot(ballPos.x - x, ballPos.y - y) < (bulletRadius + this.ballRadius)
        ) {
            return this
        }
        return null
    }

    getSpan() {
        const {x, y} = this.ballPosition
        return Math.hypot(
            x + this.ballRadius, y + this.ballRadius
        )
    }
}