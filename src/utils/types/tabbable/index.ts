export type FocusableElement = HTMLElement | SVGElement;

export type TabbableOptions = {
    includeContainer?: boolean;
};
export type CheckOptions = {
    displayCheck?: 'full' | 'legacy-full' | 'non-zero-area' | 'none';
    getShadowRoot?: boolean | ((node: FocusableElement) => ShadowRoot | boolean | undefined);
};
export declare function focusable(
    container: Element,
    options?: TabbableOptions & CheckOptions
): FocusableElement[];

export declare function isTabbable(
    node: Element,
    options?: CheckOptions
): boolean;

export declare function isFocusable(
    node: Element,
    options?: CheckOptions
): boolean;

export declare function getTabIndex(
    node: Element,
): number;