import React, {useRef} from "react"

import {ModalContentTheme as modalContentTheme} from "./ModalContentTheme"
import {classnames} from "@/utils/classnames/classnames";
import {ModalContentProps} from "@/components/types/modal/modal";

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

        const classes = classnames(className, theme.wrapper)

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