import {ElementRects, Placement, Side} from "@/utils/types/element";

export declare function getAlignmentSides(placement: Placement, rects: ElementRects, rtl?: Promise<boolean> | boolean): [Side, Side];