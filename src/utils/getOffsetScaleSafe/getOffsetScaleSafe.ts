import {Platform} from "@/utils/types/extension";

export async function getOffsetScaleSafe(platform: Platform, offsetParent: unknown): Promise<{x: number, y: number}> {
    return (await platform.isElement?.(offsetParent))
        ? (await platform.getScale?.(offsetParent)) || {x: 1, y: 1}
        : {x: 1, y: 1};
}
