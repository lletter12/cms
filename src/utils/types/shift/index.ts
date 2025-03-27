import {MiddlewareState} from "@/utils/types/extension";
import {Coords} from "@/utils/types/element";
import {DetectOverflowOptions} from "@/utils/types/detectOverflow";

export interface ShiftOptions extends DetectOverflowOptions {
    /**
     * The axis that runs along the alignment of the floating element. Determines
     * whether overflow along this axis is checked to perform shifting.
     * @default true
     */
    mainAxis?: boolean;
    /**
     * The axis that runs along the side of the floating element. Determines
     * whether overflow along this axis is checked to perform shifting.
     * @default false
     */
    crossAxis?: boolean;
    /**
     * Accepts a function that limits the shifting done in order to prevent
     * detachment.
     */
    limiter?: {
        fn: (state: MiddlewareState) => Coords;
        options?: any;
    };
}