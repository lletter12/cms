import {Boundary, ElementContext, RootBoundary} from "@/utils/types/element";
import {Property} from "csstype";
import Padding = Property.Padding;

export interface DetectOverflowOptions {
    /**
     * The clipping element(s) or area in which overflow will be checked.
     * @default 'clippingAncestors'
     */
    boundary?: Boundary;
    /**
     * The root clipping area in which overflow will be checked.
     * @default 'viewport'
     */
    rootBoundary?: RootBoundary;
    /**
     * The element in which overflow is being checked relative to a boundary.
     * @default 'floating'
     */
    elementContext?: ElementContext;
    /**
     * Whether to check for overflow using the alternate element's boundary
     * (`clippingAncestors` boundary only).
     * @default false
     */
    altBoundary?: boolean;
    /**
     * Virtual padding for the resolved overflow detection offsets.
     * @default 0
     */
    padding?: Padding;
}