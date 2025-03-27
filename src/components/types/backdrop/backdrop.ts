export type BackdropThemeType = {
    wrapper: string
}

export interface BackdropProps {
    appendToBody?: boolean
    show: boolean
    animate?: boolean
    theme?: BackdropThemeType
    className?: string
    duplicateBackdrop?: boolean
    maintainPrevCount?: number
    [rest: string]: any
}