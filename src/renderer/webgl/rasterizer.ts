import { IRasterizer, IRasterizedPrimitive, Rasterizable } from "../rasterizer"

import { Material, Object3D, Mesh, SphereGeometry, Group, TorusGeometry, MeshBasicMaterial, Path } from "three"
import { Ring } from "../../game/level/ring"
import { Level } from "../../game/level/level"
import { IMode, PrimitiveMaterial } from "../../game/mode/mode"
import { Cannon, Bullet } from "../../game/level/cannon"
import { WGLRasterizedCannon } from "./cannon"
import { BallPrimitive } from "../../game/level/primitives/ball"
import { BarPrimitive } from "../../game/level/primitives/bar"

export interface IWGLRasterizedPrimitive extends IRasterizedPrimitive {
    threeObject: Object3D;

    dispose: () => void;
}

export class WGLRasterizedBallPrimitive implements IWGLRasterizedPrimitive {
    public threeObject: Mesh = null
    
    constructor(
        public rasterizer: WGLRasterizer,
        public ball: BallPrimitive,
        public mode: IMode
    ) {
        this.createThreeObject(
            rasterizer.getMaterialFromPrimMat(
                mode.getMaterial(ball)
            )
        )
    }

    get threeGeometry() {
        return new SphereGeometry(
            this.ball.ballRadius, 24, 24
        )
    }

    createThreeObject(mat: Material) {
        this.threeObject = new Mesh(
            this.threeGeometry, mat
        )
    }

    update(deepUpdate: boolean) {
        const {x, y} = this.ball.ballPosition

        this.threeObject.position.x = x
        this.threeObject.position.y = y

        if (deepUpdate) {
            (this.threeObject.material as Material).dispose()
            this.threeObject.material = this.rasterizer.getMaterialFromPrimMat(
                this.mode.getMaterial(this.ball)
            )
        }
    }

    dispose() {
        (this.threeObject.material as Material).dispose()
        this.threeObject.geometry.dispose()
    }
}

export class WGLRasterizedBarPrimitive implements IWGLRasterizedPrimitive {
    public threeObject: Mesh = null
    
    constructor(
        public rasterizer: WGLRasterizer,
        public bar: BarPrimitive,
        public mode: IMode
    ) {
        this.createThreeObject(
            rasterizer.getMaterialFromPrimMat(
                mode.getMaterial(bar)
            )
        )
    }

    get threeGeometry() {
        return new TorusGeometry(
            this.bar.distance, this.bar.barRadius, 16, 256, Math.PI * 2 * this.bar.length
        )
    }

    createThreeObject(mat: Material) {
        this.threeObject = new Mesh(
            this.threeGeometry, mat
        )
    }

    update(deepUpdate: boolean) {
        this.threeObject.position.x = this.bar.ring.centerX
        this.threeObject.position.y = this.bar.ring.centerY

        this.threeObject.rotation.z = 2 * Math.PI * this.bar.angle

        if (deepUpdate) {
            (this.threeObject.material as Material).dispose()
            this.threeObject.material = this.rasterizer.getMaterialFromPrimMat(
                this.mode.getMaterial(this.bar)
            )
        }
    }

    dispose() {
        (this.threeObject.material as Material).dispose()
        this.threeObject.geometry.dispose()
    }
}

export class WGLRasterizedRing implements IWGLRasterizedPrimitive {
    public threeObject = new Group()

    public items: IWGLRasterizedPrimitive[]

    constructor(
        rasterizer: WGLRasterizer,
        public ring: Ring,
        mode: IMode
    ) {
        this.items = this.ring.items.map(item => rasterizer.rasterize(mode, item))

        this.threeObject.add(
            ...this.items.map(item => item.threeObject)
        )
    }

    update(deepUpdate: boolean) {
        this.items.forEach(item => item.update(deepUpdate))
    }

    dispose() {
        this.items.forEach(item => item.dispose())
    }
}

export class WGLRasterizedBullet implements IWGLRasterizedPrimitive {
    public threeObject: Mesh = null

    constructor(
        public rasterizer: WGLRasterizer,
        public bullet: Bullet,
        public mode: IMode
    ) {
        this.createThreeObject(
            rasterizer.getMaterialFromPrimMat(
                mode.getBulletMaterial(bullet)
            )
        )
    }

    get threeGeometry() {
        return new SphereGeometry(
            this.bullet.radius, 24, 24
        )
    }

    createThreeObject(mat: Material) {
        this.threeObject = new Mesh(
            this.threeGeometry, mat
        )
    }
    
    update(deepUpdate: boolean) {
        const {x, y} = this.bullet

        this.threeObject.position.x = x
        this.threeObject.position.y = y

        if (deepUpdate) {
            (this.threeObject.material as Material).dispose()
            this.threeObject.material = this.rasterizer.getMaterialFromPrimMat(
                this.mode.getBulletMaterial(this.bullet)
            )
        }
    }

    dispose() {
        (this.threeObject.material as Material).dispose()
        this.threeObject.geometry.dispose()
    }
}

export class WGLRasterizedLevel implements IWGLRasterizedPrimitive {
    public threeObject = new Group()

    public rings: WGLRasterizedRing[]
    public bullets: WGLRasterizedBullet[] = []

    constructor(
        public rasterizer: WGLRasterizer,
        public level: Level,
        public mode: IMode
    ) {
        this.rings = this.level.rings.map(ring => new WGLRasterizedRing(rasterizer, ring, mode))

        this.threeObject.add(
            ...this.rings.map(ring => ring.threeObject)
        )
    }

    rebuildBulletList() {
        this.bullets.forEach((bullet, i) => {
            if (!this.level.bullets.includes(bullet.bullet)) {
                this.threeObject.remove(bullet.threeObject)
                bullet.dispose()

                this.bullets.splice(i, 1)
            }
        })

        this.level.bullets.forEach((bullet) => {
            if (!this.bullets.find(b => b.bullet == bullet)) {
                const rasterizedBullet = new WGLRasterizedBullet(
                    this.rasterizer, bullet, this.mode
                )
                console.log(rasterizedBullet)
                this.threeObject.add(rasterizedBullet.threeObject)
                this.bullets.push(rasterizedBullet)
            }
        })
    }

    update(deepUpdate: boolean) {
        this.rebuildBulletList()

        this.rings.forEach(ring => ring.update(deepUpdate))
        this.bullets.forEach(bullet => bullet.update(deepUpdate))
    }

    dispose() {
        this.rings.forEach(ring => ring.dispose())
    }
}

export class WGLRasterizer implements IRasterizer {
    getMaterialFromPrimMat(pm: PrimitiveMaterial) {
        return new MeshBasicMaterial({
            color: pm.color
        })
    }

    rasterize(mode: IMode, prim: Rasterizable): IWGLRasterizedPrimitive {
        if (prim instanceof BallPrimitive) {
            return new WGLRasterizedBallPrimitive(this, prim, mode)
        } else if (prim instanceof BarPrimitive) {
            return new WGLRasterizedBarPrimitive(this, prim, mode)
        } else if (prim instanceof Ring) {
            return new WGLRasterizedRing(this, prim, mode)
        } else if (prim instanceof Level) {
            return new WGLRasterizedLevel(this, prim, mode)
        } else if (prim instanceof Cannon) {
            return new WGLRasterizedCannon(this, prim, mode)
        }

        return null
    }
}