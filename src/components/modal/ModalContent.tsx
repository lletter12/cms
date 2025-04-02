import React, {useRef} from "react"

import {ModalContentTheme as modalContentTheme} from "./ModalContentTheme"

import {ModalContentProps} from "@/components/types/modal/modal";
import {classNames} from "@/utils/classNames";

export const ModalContent: React.FC<ModalContentProps> = React.forwardRef<
    HTMLAllCollection,
    ModalContentProps
>(
    (
        {
            className,
            children,
            theme: customTheme,
            element: Element = "div",
            style,
            ...props
        },
        ref
    ) => {
        const theme = {...modalContentTheme, ...customTheme}
        const contentRef = useRef<HTMLDivElement | null>(null)
        const contentReference = ref ? ref : contentRef

        const classes = classNames(className, theme.wrapper)

        return (
            <Element
                className={classes}
                style={style}
                {...props}
                ref={contentReference}
            >
                {children}
            </Element>
        )
    }
)