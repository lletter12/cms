import type * as React from 'react';

export function clearTimeoutIfSet(timeoutRef: React.RefObject<number>) {
    if (timeoutRef.current !== -1) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = -1;
    }
}