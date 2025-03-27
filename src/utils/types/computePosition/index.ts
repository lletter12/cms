import {Coords, Placement, Strategy} from "@/utils/types/element";
import {Middleware, MiddlewareData, Platform} from "@/utils/types/extension";

export interface ComputePositionConfig {
    /**
     * Object to interface with the current platform.
     */
    platform: Platform;
    /**
     * Where to place the floating element relative to the reference element.
     */
    placement?: Placement;
    /**
     * The strategy to use when positioning the floating element.
     */
    strategy?: Strategy;
    /**
     * Array of middleware objects to modify the positioning or provide data for
     * rendering.
     */
    middleware?: Array<Middleware | null | undefined | false>;
}

export interface ComputePositionReturn extends Coords {
    /**
     * The final chosen placement of the floating element.
     */
    placement: Placement;
    /**
     * The strategy used to position the floating element.
     */
    strategy: Strategy;
    /**
     * Object containing data returned from all middleware, keyed by their name.
     */
    middlewareData: MiddlewareData;
}

export type ComputePosition = (
    reference: unknown,
    floating: unknown,
    config: ComputePositionConfig,
) => Promise<ComputePositionReturn>;