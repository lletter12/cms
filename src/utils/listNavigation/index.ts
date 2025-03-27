import {UseListNavigationProps} from "@/hooks/useListNavigation/useListNavigation";
import {ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP} from "@/utils/composite";

export const ESCAPE = 'Escape';

export function doSwitch(
    orientation: UseListNavigationProps['orientation'],
    vertical: boolean,
    horizontal: boolean,
) {
    switch (orientation) {
        case 'vertical':
            return vertical;
        case 'horizontal':
            return horizontal;
        default:
            return vertical || horizontal;
    }
}
export function isMainOrientationKey(
    key: string,
    orientation: UseListNavigationProps['orientation'],
) {
    const vertical = key === ARROW_UP || key === ARROW_DOWN;
    const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
    return doSwitch(orientation, vertical, horizontal);
}

export function isMainOrientationToEndKey(
    key: string,
    orientation: UseListNavigationProps['orientation'],
    rtl: boolean,
) {
    const vertical = key === ARROW_DOWN;
    const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    return (
        doSwitch(orientation, vertical, horizontal) ||
        key === 'Enter' ||
        key === ' ' ||
        key === ''
    );
}

export function isCrossOrientationOpenKey(
    key: string,
    orientation: UseListNavigationProps['orientation'],
    rtl: boolean,
) {
    const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
    const horizontal = key === ARROW_DOWN;
    return doSwitch(orientation, vertical, horizontal);
}

export function isCrossOrientationCloseKey(
    key: string,
    orientation: UseListNavigationProps['orientation'],
    rtl: boolean,
    cols?: number,
) {
    const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
    const horizontal = key === ARROW_UP;
    if (
        orientation === 'both' ||
        (orientation === 'horizontal' && cols && cols > 1)
    ) {
        return key === ESCAPE;
    }
    return doSwitch(orientation, vertical, horizontal);
}