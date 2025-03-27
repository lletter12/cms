import {FocusableElement} from "@/utils/types/tabbable";

interface Options {
    preventScroll?: boolean;
    cancelPrevious?: boolean;
    sync?: boolean;
}

let rafId = 0;
export function enqueueFocus(
    el: FocusableElement | null,
    options: Options = {},
) {
    const {preventScroll = false, cancelPrevious = true, sync = false} = options;
    cancelPrevious && cancelAnimationFrame(rafId);
    const exec = () => el?.focus({preventScroll});
    if (sync) {
        exec();
    } else {
        rafId = requestAnimationFrame(exec);
    }
}