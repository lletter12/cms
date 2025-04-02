import {createContext} from "react"
import {ModalContextProps} from "@/components/types/modal/modal";

export const ModalContext = createContext<ModalContextProps>({
    animation: true,
    isOpenModal: false,
    setTransitionDuration: undefined,
    gradiant: false,
    size: undefined,
    scrollActive: false,
    handleScrollActive: undefined,
    footerHeight: undefined,
    containerMarginBottom: undefined,
})