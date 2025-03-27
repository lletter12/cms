import React from "react"
import {ElementProps} from "@/components/types/tree";
import {FOCUSABLE_ATTRIBUTE} from "@/utils/getFocusElement";

const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';

export type ExtendedUserProps = {
    [ACTIVE_KEY]?: boolean;
    [SELECTED_KEY]?: boolean;
};

export function mergeProps<Key extends keyof ElementProps>(
    userProps: (React.HTMLProps<HTMLElement> & ExtendedUserProps) | undefined,
    propsList: Array<ElementProps | void>,
    elementKey: Key,
): Record<string, unknown> {
    const map = new Map<string, Array<(...args: unknown[]) => void>>();
    const isItem = elementKey === 'item';

    let domUserProps = userProps;
    if (isItem && userProps) {
        const {[ACTIVE_KEY]: _, [SELECTED_KEY]: __, ...validProps} = userProps;
        domUserProps = validProps;
    }

    return {
        ...(elementKey === 'floating' && {
            tabIndex: -1,
            [FOCUSABLE_ATTRIBUTE]: '',
        }),
        ...domUserProps,
        ...propsList
            .map((value) => {
                const propsOrGetProps = value ? value[elementKey] : null;
                if (typeof propsOrGetProps === 'function') {
                    return userProps ? propsOrGetProps(userProps) : null;
                }
                return propsOrGetProps;
            })
            .concat(userProps)
            .reduce((acc: Record<string, unknown>, props) => {
                if (!props) {
                    return acc;
                }

                Object.entries(props).forEach(([key, value]) => {
                    if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
                        return;
                    }

                    if (key.indexOf('on') === 0) {
                        if (!map.has(key)) {
                            map.set(key, []);
                        }

                        if (typeof value === 'function') {
                            map.get(key)?.push(value as (...args: unknown[]) => unknown);

                            acc[key] = (...args: unknown[]) => {
                                return map
                                    .get(key)
                                    ?.map((fn) => fn(...args))
                                    .find((val) => val !== undefined);
                            };
                        }
                    } else {
                        acc[key] = value;
                    }
                });

                return acc;
            }, {}),
    };
}