import {MiddlewareState} from "@/utils/types/extension";
import {OffsetOptions} from "@/utils/types/offset";
import {Coords} from "@/utils/types/element";
import {getSide} from "@/utils/getSide/getSide";
import {getSideAxis} from "@/utils/getSideAxis/getSideAxis";
import {evaluate} from "@/utils/evaluate/evaluate";
import {getAlignment} from "@/utils/dom";

export async function convertValueToCoords(
    state: MiddlewareState,
    options: OffsetOptions,
): Promise<Coords> {
    const {placement, platform, elements} = state;
    const rtl = await platform.isRTL?.(elements.floating);

    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === 'y';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {mainAxis, crossAxis, alignmentAxis} =
        typeof rawValue === 'number'
            ? {mainAxis: rawValue, crossAxis: 0, alignmentAxis: null}
            : {
                mainAxis: rawValue.mainAxis || 0,
                crossAxis: rawValue.crossAxis || 0,
                alignmentAxis: rawValue.alignmentAxis,
            };

    if (alignment && typeof alignmentAxis === 'number') {
        crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis as number;
    }

    return isVertical
        ? {x: crossAxis * crossAxisMulti, y: mainAxis * mainAxisMulti}
        : {x: mainAxis * mainAxisMulti, y: crossAxis * crossAxisMulti};
}