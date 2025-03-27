import {saveInitialPadding} from "../saveInitialPadding/saveInitialPadding";
import {getElementWidth} from "../getElementWidth/getElementWidth";
import {disableOverFlow} from "../disableOverFlow/disableOverFlow";

export const scrollbarHide = (element?: HTMLElement, scrollbarCheck?: boolean) => {
    if (!element || !scrollbarCheck) return
    const width = getElementWidth()
    disableOverFlow(element)
    saveInitialPadding(element)
    element.style.paddingRight = `${width}px`
}