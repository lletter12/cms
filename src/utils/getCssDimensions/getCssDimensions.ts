import {Dimensions} from "@/utils/types/element";
import {round} from "@/utils/round/round";
import {isHTMLElement} from "@/utils/isHTMLElement/isHTMLElement";

export function getCssDimensions(element: Element): Dimensions & { $: boolean } {
    const css = getComputedStyle(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;

    // offsetWidth, offsetHeight는 HTMLElement만 가지고 있음
    if (isHTMLElement(element)) {
        const offsetWidth = element.offsetWidth;
        const offsetHeight = element.offsetHeight;

        // 테스트 환경 또는 SVG, 또는 CSS와 offset이 다른 경우 fallback
        const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;

        if (shouldFallback) {
            width = offsetWidth;
            height = offsetHeight;
        }

        return { width, height, $: shouldFallback };
    }

    // HTMLElement가 아닐 경우 (ex. SVG 등)
    return { width, height, $: false };
}