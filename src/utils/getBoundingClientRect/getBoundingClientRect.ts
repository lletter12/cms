import {unwrapElement} from "@/utils/unwrapElement/unwrapElement";
import {ClientRectObject, createCoords, VirtualElement} from "../types/element";
import {getScale} from "@/utils/getScale/getScale";
import {getVisualOffsets, shouldAddVisualOffsets} from "@/utils/getVisualOffsets/getVisualOffsets";
import {getWindow} from "@/utils/getWindow/getWindow";
import {getFrameElement} from "@/utils/getFrameElement/getFrameElement";
import {rectToClientRect} from "@/utils/rectToClientRect/rectToClientRect";
import {isElement} from "@/utils/isElement/isElement";

export function getBoundingClientRect(
    element: Element | VirtualElement,
    includeScale = false,
    isFixedStrategy = false,
    offsetParent?: Element | Window,
): ClientRectObject {
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);

    let scale = createCoords(1);
    if (includeScale) {
        if (offsetParent) {
            if (isElement(offsetParent)) {
                scale = getScale(offsetParent);
            }
        } else {
            scale = getScale(element);
        }
    }

    const visualOffsets = shouldAddVisualOffsets(
        domElement,
        isFixedStrategy,
        offsetParent,
    )
        ? getVisualOffsets(domElement)
        : createCoords(0);

    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;

    if (domElement) {
        const win = getWindow(domElement);
        const offsetWin =
            offsetParent && isElement(offsetParent)
                ? getWindow(offsetParent)
                : offsetParent;

        let currentWin = win;
        let currentIFrame = getFrameElement(currentWin);
        while (currentIFrame && offsetParent && offsetWin !== currentWin) {
            const iframeScale = getScale(currentIFrame);
            const iframeRect = currentIFrame.getBoundingClientRect();
            const css = getComputedStyle(currentIFrame);
            const left =
                iframeRect.left +
                (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) *
                iframeScale.x;
            const top =
                iframeRect.top +
                (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;

            x *= iframeScale.x;
            y *= iframeScale.y;
            width *= iframeScale.x;
            height *= iframeScale.y;

            x += left;
            y += top;

            currentWin = getWindow(currentIFrame);
            currentIFrame = getFrameElement(currentWin);
        }
    }

    return rectToClientRect({width, height, x, y});
}