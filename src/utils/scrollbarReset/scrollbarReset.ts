import {restoreInitialPadding} from "../restoreInitialPadding/restoreInitialPadding.ts";
import {restoreInitialOverflow} from "@/utils/restoreInitialOverflow/restoreInitialOverflow";

export const scrollbarReset = (element?: HTMLElement, scrollbarCheck?: boolean) => {
    if (!scrollbarCheck || !element) return
    restoreInitialOverflow(element)
    restoreInitialPadding(element)
}