import {Alignment, Placement} from "@/utils/types/element";

export declare function getOppositeAxisPlacements(placement: Placement, flipAlignment: boolean, direction: "none" | Alignment, rtl?: Promise<boolean> | boolean): Placement[];