import React from "react";
import {getTabbableOptions, tabbable} from "@/utils/tabbable";
import {isTabbable} from "@/utils/types/tabbable";
import {Alignment, Axis, Length, Placement} from "@/utils/types/element";
import {getDocumentElement} from "@/utils/getDocumentElement/getDocumentElement";
import {isHTMLElement} from "@/utils/isHTMLElement/isHTMLElement";
import {getSideAxis} from "@/utils/getSideAxis/getSideAxis";

let previouslyFocusedElements: Element[] = [];
export declare function getNodeName(node: Node | Window): string;

/*
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
*/
export function getOppositeAxis(axis: Axis): Axis {
    return axis === 'x' ? 'y' : 'x';
}
export function getAxisLength(axis: Axis): Length {
    return axis === 'y' ? 'height' : 'width';
}
export function getAlignmentAxis(placement: Placement): Axis {
    return getOppositeAxis(getSideAxis(placement));
}
export const TYPE_ABLE_SELECTOR =
    "input:not([type='hidden']):not([disabled])," +
    "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
export function isTypeAbleElement(element: unknown): boolean {
    return isHTMLElement(element) && element.matches(TYPE_ABLE_SELECTOR);
}
export function isRootElement(element: Element): boolean {
    return element.matches('html,body');
}
export function isEventTargetWithin(
    event: Event,
    node: Node | null | undefined,
) {
    if (node == null) {
        return false;
    }

    if ('composedPath' in event) {
        return event.composedPath().includes(node);
    }

    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const e = event as Event;
    return e.target != null && node.contains(e.target as Node);
}
export function getParentNode(node: Node): Node {
    if (getNodeName(node) === 'html') {
        return node;
    }

    const result =
        // Step into the shadow DOM of the parent of a slotted node.
        (node as any).assignedSlot ||
        // DOM Element detected.
        node.parentNode ||
        // ShadowRoot detected.
        (isShadowRoot(node) && node.host) ||
        // Fallback.
        getDocumentElement(node);

    return isShadowRoot(result) ? result.host : result;
}
export function isLastTraversableNode(node: Node): boolean {
    return ['html', 'body', '#document'].includes(getNodeName(node));
}
export function isReactEvent(event: any): event is React.SyntheticEvent {
    return 'nativeEvent' in event;
}
export function getTarget(event: Event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return (event as Event).target;
}

export function getPreviouslyFocusedElement() {
    return previouslyFocusedElements
        .slice()
        .reverse()
        .find((el) => el.isConnected);
}
export function contains(parent?: Element | null, child?: Element | null) {
    if (!parent || !child) {
        return false;
    }

    const rootNode = child.getRootNode?.();

    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && isShadowRoot(rootNode)) {
        let next = child;
        while (next) {
            if (parent === next) {
                return true;
            }
            // @ts-ignore
            next = next.parentNode || next.host;
        }
    }

    // Give up, the result is false
    return false;
}
export function activeElement(doc: Document) {
    let activeElement = doc.activeElement;

    while (activeElement?.shadowRoot?.activeElement != null) {
        activeElement = activeElement.shadowRoot.activeElement;
    }

    return activeElement;
}
export function getDocument(node: Element | null) {
    return node?.ownerDocument || document;
}
export function getFirstTabbableElement(container: Element) {
    const tabbableOptions = getTabbableOptions();
    if (isTabbable(container, tabbableOptions)) {
        return container;
    }

    return tabbable(container, tabbableOptions)[0] || container;
}

export function getAlignment(placement: Placement): Alignment | undefined {
    return placement.split('-')[1] as Alignment | undefined;
}


export function getTarget(event: Event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return (event as Event).target;
}
export function isSafari() {
    // Chrome DevTools does not complain about navigator.vendor
    return /apple/i.test(navigator.vendor);
}

export function isMouseLikePointerType(
    pointerType: string | undefined,
    strict?: boolean,
) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values: Array<string | undefined> = ['mouse', 'pen'];
    if (!strict) {
        values.push('', undefined);
    }
    return values.includes(pointerType);
}

export declare function getNodeName(node: Node | Window): string;
export declare function isTypeAbleCombobox(element: Element | null): boolean;
export declare function isShadowRoot(value: unknown): value is ShadowRoot;
export declare function getTarget(event: Event): EventTarget | null;
export declare function isVirtualClick(event: MouseEvent | PointerEvent): boolean;
export declare function isVirtualPointerEvent(event: PointerEvent): boolean;
export declare function stopEvent(event: Event | React.SyntheticEvent): void;