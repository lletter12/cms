import {Derivable} from "@/utils/types/extension";

type OffsetValue =
    | number
    | {
    /**
     * The axis that runs along the side of the floating element. Represents
     * the distance (gutter or margin) between the reference and floating
     * element.
     * @default 0
     */
    mainAxis?: number;
    /**
     * The axis that runs along the alignment of the floating element.
     * Represents the skidding between the reference and floating element.
     * @default 0
     */
    crossAxis?: number;
    /**
     * The same axis as `crossAxis` but applies only to aligned placements
     * and inverts the `end` alignment. When set to a number, it overrides the
     * `crossAxis` value.
     *
     * A positive number will move the floating element in the direction of
     * the opposite edge to the one that is aligned, while a negative number
     * the reverse.
     * @default null
     */
    alignmentAxis?: number | null;
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
export type OffsetOptions = OffsetValue | Derivable<OffsetValue>;