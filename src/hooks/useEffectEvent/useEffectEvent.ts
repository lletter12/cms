import * as React from 'react';

type AnyFunction = (...args: any[]) => any;

const useInsertionEffect = React.useInsertionEffect as
    | AnyFunction
    | undefined;

const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());

export function useEffectEvent<T extends AnyFunction>(callback?: T) {
    const ref = React.useRef<AnyFunction | undefined>(() => {
        /*if (DEV) {
            throw new Error('Cannot call an event handler while rendering.');
        }*/
    });

    useSafeInsertionEffect(() => {
        ref.current = callback;
    });

    return React.useCallback<AnyFunction>(
        (...args) => ref.current?.(...args),
        [],
    ) as T;
}