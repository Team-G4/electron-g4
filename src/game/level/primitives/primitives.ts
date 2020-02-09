import { Ring } from "../ring"

type SerializedPrimitiveValue = number | boolean | string | SerializedPrimitiveObject | SerializedPrimitiveValue[]

type SerializedPrimitiveObject = {
    [prop: string]: SerializedPrimitiveValue;
}

export type SerializedPrimitive = {
    type: string;
    [prop: string]: SerializedPrimitiveValue;
}

export interface IPrimitive {
    ring: Ring;

    serialize: () => SerializedPrimitive;

    advance: (dTime: number, levelTime: number) => void;
    hitTest: (x: number, y: number, bulletRadius: number) => IPrimitive;

    getSpan: () => number;
}

export function isIPrimitive(o: any): o is IPrimitive {
    return "ring" in o
}
