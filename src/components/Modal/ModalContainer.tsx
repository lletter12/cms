import React, {useContext, useEffect, useRef, useState} from "react"

import {ModalContainerTheme as modalContainerTheme} from "./ModalContainerTheme"
import {ModalContext} from "./ModalContext"
import {useModalTransition} from "@/hooks/useModalTransition/useModalTransition";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect";
import {classnames} from "@/utils/classnames/classnames";
import {ModalContainerProps} from "@/components/types/modal/modal";

export const ModalContainer: React.FC<ModalContainerProps> = ({
                                                                  className,
                                                                  centered,
                                                                  position,
                                                                  children,
                                                                  theme: customTheme,
                                                                  element: Element = "div",
                                                                  ...props
                                                              }) => {
    const [isOpen, setIsOpen] = useState(false)
    const {size} = useContext(ModalContext)
    const dialogRef = useRef<HTMLDivElement | null>(null)
    const {transitionDuration} = useModalTransition(dialogRef.current)
    const {
        isOpenModal,
        setTransitionDuration,
        animation,
        containerRefMarginBottom,
    } = useContext(ModalContext)

    if (position === "bottom") {
        customTheme = {
            show: "opacity-100",
            hidden: "translate-y-full opacity-0",
        }
    }

    if (position === "top-right") {
        customTheme = {
            show: "translate-x-0 opacity-100",
            hidden: "translate-x-full opacity-0",
        }
    }

    if (position === "top-left") {
        customTheme = {
            show: "translate-x-1/5 opacity-100",
            hidden: "translate-x-0 opacity-0",
        }
    }
    const theme = {...modalContainerTheme, ...customTheme}

    useEffect(() => {
        setTransitionDuration(transitionDuration)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transitionDuration])

    useIsomorphicLayoutEffect(() => {
        if (containerRefMarginBottom && dialogRef.current) {
            const marginBottom = window.getComputedStyle(
                dialogRef.current!
            ).marginBottom
            containerRefMarginBottom(parseFloat(marginBottom))
        }
    }, [containerRefMarginBottom, dialogRef])

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>

        if (isOpenModal) {
            timer = setTimeout(() => {
                setIsOpen(true)
            }, 50)
        } else {
            setIsOpen(false)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [isOpenModal])

    const classes = classnames(
        theme.wrapper,
        isOpen ? theme.show : theme.hidden,
        position ? theme[position] : theme.wrapperPositionDefault,
        size && theme[size] ? theme[size] : theme.sizeDefault,
        animation ? theme.animation : undefined,
        centered === "centered" && theme.centered,
        className
    )

    return (
        <Element className={classes} {...props} ref={dialogRef}>
            {children}
        </Element>
    )
}