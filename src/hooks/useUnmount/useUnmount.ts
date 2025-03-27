
import {useEffect} from "react"
import {usePrevious} from "@/hooks/usePrevious/usePrevious";

export const useUnmount = (fn: () => void) => {
    const fnRef = usePrevious(fn)

    useEffect(() => () => {
        fnRef?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}