import { Shape, ShapeGeometry, Material, Mesh } from "three"
import { IWGLRasterizedPrimitive, WGLRasterizer } from "./rasterizer"
import { IMode } from "../../game/mode/mode"
import { Cannon } from "../../game/level/cannon"

const cannonShape = new Shape()

cannonShape.moveTo(
    20, 0
)
cannonShape.lineTo(
    Math.cos(Math.PI - 0.8) * 20,
    Math.sin(Math.PI - 0.8) * 20
)
cannonShape.lineTo(
    Math.cos(Math.PI) * 8,
    Math.sin(Math.PI) * 8
)
cannonShape.lineTo(
    Math.cos(Math.PI + 0.8) * 20,
    Math.sin(Math.PI + 0.8) * 20
)

const cannonGeometry = new ShapeGeometry(cannonShape)


export class WGLRasterizedCannon implements IWGLRasterizedPrimitive {
    public threeObject: Mesh = null
    
    constructor(
        public rasterizer: WGLRasterizer,
        public cannon: Cannon,
        public mode: IMode
    ) {
        this.createThreeObject(
            rasterizer.getMaterialFromPrimMat(
                mode.getMaterial(cannon)
            )
        )
    }

    createThreeObject(mat: Material) {
        this.threeObject = new Mesh(
            cannonGeometry, mat
        )
    }

    update(deepUpdate: boolean) {
        const {x, y} = this.cannon.position

        this.threeObject.position.x = x
        this.threeObject.position.y = y

        this.threeObject.rotation.z = 2 * Math.PI * this.cannon.rotation

        if (deepUpdate) {
            this.threeObject.material = this.rasterizer.getMaterialFromPrimMat(
                this.mode.getMaterial(this.cannon)
            )
        }
    }

    dispose() {
        (this.threeObject.material as Material).dispose()
    }
}