import React from "react";
import {useIsomorphicLayoutEffect} from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect";

export const useWindowElement = () => {
    const [element, setElement] = React.useState<HTMLElement>()

    useIsomorphicLayoutEffect(() => {
        setElement(document.body)
    }, [])

    return element
}