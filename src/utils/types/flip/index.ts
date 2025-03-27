import {DetectOverflowOptions} from "@/utils/types/detectOverflow";
import {Placement} from "@/utils/types/element";

export interface FlipOptions extends DetectOverflowOptions {
    /**
     * The axis that runs along the side of the floating element. Determines
     * whether overflow along this axis is checked to perform a flip.
     * @default true
     */
    mainAxis?: boolean;
    /**
     * The axis that runs along the alignment of the floating element. Determines
     * whether overflow along this axis is checked to perform a flip.
     * @default true
     */
    crossAxis?: boolean;
    /**
     * Placements to try sequentially if the preferred `placement` does not fit.
     * @default [oppositePlacement] (computed)
     */
    fallbackPlacements?: Array<Placement>;
    /**
     * What strategy to use when no placements fit.
     * @default 'bestFit'
     */
    fallbackStrategy?: 'bestFit' | 'initialPlacement';
    /**
     * Whether to allow fallback to the perpendicular axis of the preferred
     * placement, and if so, which side direction along the axis to prefer.
     * @default 'none' (disallow fallback)
     */
    fallbackAxisSideDirection?: 'none' | 'start' | 'end';
    /**
     * Whether to flip to placements with the opposite alignment if they fit
     * better.
     * @default true
     */
    flipAlignment?: boolean;
}