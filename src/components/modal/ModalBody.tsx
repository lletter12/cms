import {ModalBodyTheme as modalBodyTheme} from "./ModalBodyTheme"
import {ModalContext} from "./ModalContext"
import React, {CSSProperties, useContext, useEffect, useRef, useState} from "react";
import {useWindowHeight} from "@/hooks/useWindowHeight/useWindowHeight";

import {useScroll} from "@/hooks/useScroll/useScroll";
import {ModalBodyProps} from "@/components/types/modal/modal";
import {classNames} from "@/utils/classNames";

export const ModalBody: React.FC<ModalBodyProps> = React.forwardRef<
    HTMLElement,
    ModalBodyProps
>(
    (
        {
            className,
            children,
            theme: customTheme,
            element: Element = "div",
            ...props
        },
        ref
    ) => {
        const {
            size,
            handleScrollActive,
            headerHeight,
            footerHeight,
            containerMarginBottom,
        } = useContext(ModalContext)

        const modalInnerRef = useRef<HTMLElement | null>(null)
        const modalReference = ref ? ref : modalInnerRef
        const windowY = useWindowHeight()
        const [styles, setStyles] = useState<CSSProperties | undefined>()
        const theme = { ...modalBodyTheme, ...customTheme }
        const classes = classNames(
            size === "fullscreen" ? theme.fullSizeWrapper : theme.wrapper,
            modalBodyTheme.scrollable,
            className
        )
        const scroll = useScroll(modalInnerRef)

        useEffect(() => {
            if (
                modalInnerRef.current &&
                modalInnerRef.current!.scrollHeight &&
                modalInnerRef.current!.scrollHeight >
                modalInnerRef.current!.getBoundingClientRect().height &&
                scroll
            ) {
                handleScrollActive?.(
                    modalInnerRef.current!.scrollHeight -
                    Math.round(scroll.top) -
                    modalInnerRef.current!.clientHeight ===
                    0
                )
            }

            if (windowY && headerHeight && footerHeight) {
                setStyles({
                    maxHeight: `${windowY - (headerHeight + footerHeight + (containerMarginBottom || 0) + 56)}px`,
                })
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            modalInnerRef.current,
            scroll,
            windowY,
            headerHeight,
            footerHeight,
            containerMarginBottom,
        ])

        return (
            <Element
                className={classes}
                style={styles}
                {...props}
                ref={modalReference}
            >
                {children}
            </Element>
        )
    }
)