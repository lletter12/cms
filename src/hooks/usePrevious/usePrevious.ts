import React from "react";

export const usePrevious = <T>(state: T): T | undefined => {
    const ref = React.useRef<T|undefined>(undefined)

    React.useEffect(() => {
        ref.current = state
    })

    return ref.current
}