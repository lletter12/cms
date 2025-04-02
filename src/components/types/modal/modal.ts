import React, {ReactNode} from "react";

type ModalBaseComponent = Pick<
    React.HTMLAttributes<HTMLElement>,
    | "className"
    | "id"
    | "style"
    | "onClick"
    | "onMouseUp"
    | "onMouseMove"
    | "onMouseDown"
    | "onMouseEnter"
    | "onMouseLeave"
    | "onMouseOver"
    | "onMouseOut"
    | "onKeyDown"
    | "onKeyUp"
    | "onTouchStart"
    | "onTouchMove"
    | "onTouchEnd"
    | "onScroll"
    | "onDrop"
    | "children"
> & {
    [rest: string]: any
}

type ModalComponentThemeType = {
    show?: string
    static?: string
    staticProperties?: string
    wrapper?: string
}

export interface ModalComponentProps extends ModalBaseComponent {
    rootId?: string
    appendToBody?: boolean
    backdrop?: boolean
    closeOnEsc?: boolean
    leaveHiddenModal?: boolean
    modalRef?: React.RefObject<any>
    show: boolean
    setShow: React.SetStateAction<any>
    staticBackdrop?: boolean
    staticModalAnimation?: boolean
    animate?: boolean
    duplicateBackdrop?: boolean
    isSSR?: boolean
    element?: React.ComponentProps<any>
    theme?: ModalComponentThemeType
    gradiant?: boolean
    animation?: boolean
    scrollbarCheck?: boolean
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "static-dialog" | "fullscreen"
    defaultClose?: () => void
    maintainPrevCount?: number
}


type ModalBodyThemeType = {
    wrapper?: string
    scrollable?: string
    fullSizeWrapper?: string
}

export interface ModalBodyProps {
    className?: string
    children: ReactNode
    ref?: React.ForwardedRef<HTMLElement>
    element?: React.ComponentProps<any>
    theme?: ModalBodyThemeType
}


type ModalContainerThemeType = {
    centered?: string
    fullscreen?: string
    hidden?: string
    show?: string
    sizeDefault?: string
    wrapper?: string
    wrapperPositionDefault?: string
    bottom?: string
    animation?: string
    "top-left"?: string
    "top-right"?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    "2xl"?: string
    "static-dialog"?: string
}

export interface ModalContainerProps extends ModalBaseComponent {
    centered?: "centered" | "un-centered"
    position?: "top-left" | "top-right" | "bottom"
    ref?: React.ForwardedRef<HTMLAllCollection>
    element?: React.ComponentProps<any>
    theme?: ModalContainerThemeType
}


type ModalContentThemeType = {
    scrollable?: string
    wrapper?: string
}

export interface ModalContentProps extends ModalBaseComponent {
    ref?: React.ForwardedRef<HTMLAllCollection>
    element?: React.ComponentProps<any>
    theme?: ModalContentThemeType
    position?: "bottom"
}


export interface ModalContextProps {
    animation?: boolean
    isOpenModal?: boolean
    setTransitionDuration?: React.SetStateAction<any>
    gradiant?: boolean
    scrollActive?: boolean
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "static-dialog" | "fullscreen"
    handleScrollActive?: (value: boolean) => void
    handleCloseButton?: () => void
    setShow?: React.SetStateAction<any>
    headerRefHeight?: (value: number) => void
    footerRefHeight?: (value: number) => void
    containerRefMarginBottom?: (value: number) => void
    headerHeight?: number
    footerHeight?: number
    containerMarginBottom?: number
}