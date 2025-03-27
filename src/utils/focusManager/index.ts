import {getNodeName} from "@/utils/dom";
import {getTabbableOptions, tabbable} from "@/utils/tabbable";
import {isTabbable} from "@/utils/types/tabbable";

const LIST_LIMIT = 20;
let previouslyFocusedElements: Element[] = [];

export function addPreviouslyFocusedElement(element: Element | null) {
    previouslyFocusedElements = previouslyFocusedElements.filter(
        (el) => el.isConnected,
    );

    if (element && getNodeName(element) !== 'body') {
        previouslyFocusedElements.push(element);
        if (previouslyFocusedElements.length > LIST_LIMIT) {
            previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
        }
    }
}

export function getPreviouslyFocusedElement() {
    return previouslyFocusedElements
        .slice()
        .reverse()
        .find((el) => el.isConnected);
}

export function getFirstTabbableElement(container: Element | boolean) {
    const tabbableOptions = getTabbableOptions();
    if (isTabbable(container, tabbableOptions)) {
        return container;
    }

    return tabbable(container, tabbableOptions)[0] || container;
}