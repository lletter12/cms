import {activeElement, contains, getDocument} from "@/utils/dom";
import {CheckOptions, FocusableElement, TabbableOptions} from "@/utils/types/tabbable";

export const getTabbableOptions = (): {getShadowRoot: boolean, displayCheck: "full" | "none"} =>
    ({
        getShadowRoot: true,
        displayCheck:
        // JSDOM does not support the `tabbable` library. To solve this we can
        // check if `ResizeObserver` is a real function (not polyfilled), which
        // determines if the current environment is JSDOM-like.
            typeof ResizeObserver === 'function' &&
            ResizeObserver.toString().includes('[native code]')
                ? 'full'
                : 'none',
    });

export function getTabbableIn(
    container: HTMLElement,
    direction: 'next' | 'prev',
) {
    const allTabbable = tabbable(container, getTabbableOptions());

    if (direction === 'prev') {
        allTabbable.reverse();
    }

    const activeIndex = allTabbable.indexOf(
        activeElement(getDocument(container)) as HTMLElement,
    );
    const nextTabbableElements = allTabbable.slice(activeIndex + 1);
    return nextTabbableElements[0];
}

export function getNextTabbable(
    referenceElement: Element | null,
): FocusableElement | null {
    return (
        getTabbableIn(getDocument(referenceElement).body, 'next') ||
        referenceElement
    ) as FocusableElement;
}

export function getPreviousTabbable(
    referenceElement: Element | null,
): FocusableElement | null {
    return (
        getTabbableIn(getDocument(referenceElement).body, 'prev') ||
        referenceElement
    ) as FocusableElement;
}

export function isOutsideEvent(
    event: FocusEvent | React.FocusEvent,
    container?: Element,
) {
    const containerElement = container || (event.currentTarget as Element);
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    return !relatedTarget || !contains(containerElement, relatedTarget);
}

export function disableFocusInside(container: HTMLElement) {
    const tabbableElements = tabbable(container, getTabbableOptions());
    tabbableElements.forEach((element) => {
        element.dataset.tabindex = element.getAttribute('tabindex') || '';
        element.setAttribute('tabindex', '-1');
    });
}

export function enableFocusInside(container: HTMLElement) {
    const elements = container.querySelectorAll<HTMLElement>('[data-tabindex]');
    elements.forEach((element) => {
        const tabindex = element.dataset.tabindex;
        delete element.dataset.tabindex;
        if (tabindex) {
            element.setAttribute('tabindex', tabindex);
        } else {
            element.removeAttribute('tabindex');
        }
    });
}

export declare function tabbable(
    container: Element,
    options?: TabbableOptions & CheckOptions
): FocusableElement[];
