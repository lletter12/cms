import * as React from 'react';

export function useLiteMergeRefs<T>(
    refs: Array<React.RefObject<T> | undefined>,
): React.RefCallback<T> {
    return React.useMemo(() => {
        return (value) => {
            refs.forEach((ref) => {
                if (ref) {
                    (ref as React.RefObject<T | null>).current = value;
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}