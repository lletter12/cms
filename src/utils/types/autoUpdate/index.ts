export declare interface AutoUpdateOptions {
    /**
     * Whether to update the position when an overflow ancestor is scrolled.
     * @default true
     */
    ancestorScroll?: boolean;
    /**
     * Whether to update the position when an overflow ancestor is resized. This
     * uses the native `resize` event.
     * @default true
     */
    ancestorResize?: boolean;
    /**
     * Whether to update the position when either the reference or floating
     * elements resized. This uses a `ResizeObserver`.
     * @default true
     */
    elementResize?: boolean;
    /**
     * Whether to update the position when the reference relocated on the screen
     * due to layout shift.
     * @default true
     */
    layoutShift?: boolean;
    /**
     * Whether to update on every animation frame if necessary. Only use if you
     * need to update the position in response to an animation using transforms.
     * @default false
     */
    animationFrame?: boolean;
}