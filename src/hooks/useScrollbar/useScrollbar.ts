import {usePrevious} from "../usePrevious/usePrevious";
import {useWindowElement} from "../useWindowElement/useWindowElement";
import {useEffect} from "react";
import {scrollbarHide, scrollbarReset} from "@/utils/scrollbar";

export const useScrollbar = (isOpenModal: boolean, scrollbarCheck?: boolean) => {
    const prevOpen = usePrevious(isOpenModal)
    const element = useWindowElement()

    useEffect(() => {
        if(isOpenModal) {
            scrollbarHide(element, scrollbarCheck)
        }else {
            scrollbarReset(element, scrollbarCheck)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenModal, prevOpen, element])
}