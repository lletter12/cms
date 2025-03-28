import {BackdropTheme as backdropTheme} from "@/components/backDrop/BackDropTheme"
import React from "react"
import ReactDOM from "react-dom"
import {classnames} from "@/utils/classnames/classnames";
import {useWindowElement} from "@/hooks/useWindowElement/useWindowElement";
import {BackdropProps} from "@/components/types/backdrop/backdrop";

export const Backdrop: React.FC<BackdropProps> = ({
                                                      appendToBody = false,
                                                      show,
                                                      animate = true,
                                                      theme: customTheme,
                                                      className,
                                                      duplicateBackdrop,
                                                      maintainPrevCount,
                                                      ...props
                                                  }) => {
    const theme = { ...backdropTheme, ...customTheme }

    const element = useWindowElement()
    const [displayBackdrop, setDisplayBackdrop] = React.useState<boolean>(show)
    const [, setShowBackdrop] = React.useState<boolean>(false)

    const backdropTransitionTimeRef = React.useRef<number>(0)
    const backdropRef = React.useRef<HTMLDivElement | null>(null)
    const interval = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const backdropClasses = classnames(
        theme.wrapper,
        displayBackdrop ? "block" : "hidden",
        duplicateBackdrop ? "" : "bg-dim",
        className
    )

    React.useEffect(() => {
        if (backdropRef.current) {
            const { transitionDuration } = window.getComputedStyle(
                backdropRef.current!
            )
            backdropTransitionTimeRef.current = Number(transitionDuration.replace("s", "")) * 1000

            if(maintainPrevCount) {
                backdropRef.current!.style.zIndex = `${1000 + maintainPrevCount * 100}`
            }
        }
    }, [maintainPrevCount])

    React.useEffect(() => {
        if (show) {
            setDisplayBackdrop(show)
            interval.current = setTimeout(
                () => {
                    setShowBackdrop(show)
                },
                animate ? 100 : 0
            )
        } else {
            setShowBackdrop(show)
            interval.current = setTimeout(
                () => {
                    setDisplayBackdrop(show)
                },
                animate ? backdropTransitionTimeRef.current : 0
            )
        }
        return () => {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    const backdropTemplate = (
        <div className={backdropClasses} {...props} ref={backdropRef}></div>
    )

    const appendToBodyTemplate = (
        <>{element && ReactDOM.createPortal(backdropTemplate, element)}</>
    )

    return <>{appendToBody ? appendToBodyTemplate : backdropTemplate}</>
}