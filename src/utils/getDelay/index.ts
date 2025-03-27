import {UseHoverProps} from "@/hooks/useHover/useHover";
import {isMouseLikePointerType} from "@/utils/dom";

export function getDelay(
    value: UseHoverProps['delay'],
    prop: 'open' | 'close',
    pointerType?: PointerEvent['pointerType'],
) {
    if (pointerType && !isMouseLikePointerType(pointerType)) {
        return 0;
    }

    if (typeof value === 'number') {
        return value;
    }

    return value?.[prop];
}