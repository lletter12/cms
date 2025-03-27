import type { RefObject } from 'react';

type TargetValue<T> = T | undefined | null;

type Target = HTMLElement | Element | Window | Document;

export type TargetType<T extends Target = Target> =
    | (() => TargetValue<T>)
    | TargetValue<T>
    | RefObject<TargetValue<T>>;

export const getElementTarget = <T extends Target>(target: TargetType<T> | undefined, defaultElement?: T) => {
    if (!(typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement)) {
        return undefined;
    }

    if (!target) {
        return defaultElement;
    }

    let targetElement: TargetValue<T>;

    if (typeof target === 'function') {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}