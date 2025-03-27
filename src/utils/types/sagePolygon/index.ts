import {Context} from "@/components/types/menu/menu";
import {TreeType} from "@/components/types/tree";

export type Point = [number, number];
export type Polygon = Point[];

export interface HandleCloseFn {
    (
        context: Context & {
            onClose: () => void;
            tree?: TreeType | null;
            leave?: boolean;
        },
    ): (event: MouseEvent) => void;
    __options: {
        blockPointerEvents: boolean;
    };
}

export interface SafePolygonOptions {
    buffer?: number;
    blockPointerEvents?: boolean;
    requireIntent?: boolean;
}