/**
 * The type of symmetry present in the generated polygon
 */
export enum PolygonSymmetryType {
    /**
     * Symmetry around the center point
     */
    centerPointSymmetry = "point",
    /**
     * Symmetry along an axis (mirror)
     */
    mirrorSymmetry = "mirror"
}

/**
 * Represents a polygon inscribed in an unit circle
 */
export class Polygon {
    /**
     * The polygon's vertices represented by the angles (0-1) between the X axis and the radius line intersecting the vertex
     */
    public angles: number[]
    
    /**
     * Generates a regular polygon
     * @param vertexCount - the number of verices
     */
    constructor(
        vertexCount: number
    ) {
        this.angles = Array<number>(vertexCount).fill(0).map(
            (x, i) => i / vertexCount
        )
    }

    /**
     * Generates a polygon from angles
     * @param angles - an array of angles
     */
    static fromAngles(angles: number[]) {
        const p = new Polygon(angles.length)
        p.angles = angles.sort((a1, a2) => a1 - a2)

        return p
    }

    /**
     * Shifts vertices of the polygon by a given angle
     * @param angle - the shift angle
     * @returns the shifted polygon
     */
    shift(angle: number): Polygon {
        return Polygon.fromAngles(
            this.angles.map(ang => {
                let a = (ang + angle) % 1
                if (a < 0) a += 1

                return a
            })
        )
    }

    /**
     * Makes the polygon symmetric
     * @param type - the type of symmetry
     * @param start - the origin angle
     * @returns a new polygon with the applied symmetry
     */
    symmetry(type: PolygonSymmetryType, start = 0) {
        const startAngles = this.shift(-start).angles
        let angles: number[] = []

        for (const angle of startAngles) {
            if (type == PolygonSymmetryType.centerPointSymmetry) {
                if (angle >= 0.5) break
                angles = [...angles, angle, angle + 0.5]
            } else if (type == PolygonSymmetryType.mirrorSymmetry) {
                if (angle > 0.5) break
                if (angle == 0 || angle == 0.5) {
                    angles = [...angles, angle]
                } else {
                    angles = [...angles, angle, 1 - angle]
                }
            }
        }

        return Polygon.fromAngles(angles).shift(start)
    }
}