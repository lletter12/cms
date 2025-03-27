
import {ReactNode} from "react";
import {ModalComponentProps, ModalContainerProps} from "@/components/types/modal/modal";

export interface MenuProps extends ModalComponentProps, Pick<ModalContainerProps, "position" | "centered"> {
    containerClassName?: string
    contentClassName?: string
    bodyClassName?: string
    children?: ReactNode
}

type MenuContextType = {
    getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
    activeIndex: number | null;
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
    allowHover: boolean;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    parent: MenuContextType | null;
}

interface MenuProps {
    label: string;
    nested?: boolean;
    children?: React.ReactNode;
    keepMounted?: boolean;
    orientation?: 'vertical' | 'horizontal' | 'both';
    cols?: number;
}

interface MenuItemProps {
    label: string;
    disabled?: boolean;
}

export type ReferenceType = Element | VirtualElement;
export type OpenChangeReason =
    | 'outside-press'
    | 'escape-key'
    | 'ancestor-scroll'
    | 'reference-press'
    | 'click'
    | 'hover'
    | 'focus'
    | 'focus-out'
    | 'list-navigation'
    | 'safe-polygon';
export interface Events {
    emit<T extends string>(event: T, data?: any): void;
    on(event: string, handler: (data: any) => void): void;
    off(event: string, handler: (data: any) => void): void;
}
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type UseData = Prettify<UseReturn>;
export declare type UseReturn<RT extends ReferenceType = ReferenceType> = Prettify<UseData & {
    /**
     * Update the position of the floating element, re-rendering the component
     * if required.
     */
    update: () => void;
    /**
     * Pre-configured positioning styles to apply to the floating element.
     */
    floatingStyles: React.CSSProperties;
    /**
     * Object containing the reference and floating refs and reactive setters.
     */
    refs: {
        /**
         * A React ref to the reference element.
         */
        reference: React.MutableRefObject<RT | null>;
        /**
         * A React ref to the floating element.
         */
        floating: React.MutableRefObject<HTMLElement | null>;
        /**
         * A callback to set the reference element (reactive).
         */
        setReference: (node: RT | null) => void;
        /**
         * A callback to set the floating element (reactive).
         */
        setFloating: (node: HTMLElement | null) => void;
    };
    /**
     * Object containing the reference and floating elements.
     */
    elements: {
        reference: RT | null;
        floating: HTMLElement | null;
    };
}>;
export type NarrowedElement<T> = T extends Element ? T : Element;
export interface ExtendedRefs<RT> {
    reference: React.RefObject<ReferenceType | null>;
    floating: React.RefObject<HTMLElement | null>;
    domReference: React.RefObject<NarrowedElement<RT> | null>;
    setReference(node: RT | null): void;
    setFloating(node: HTMLElement | null): void;
    setPositionReference(node: ReferenceType | null): void;
}
export interface ExtendedElements<RT> {
    reference: ReferenceType | null;
    floating: HTMLElement | null;
    domReference: NarrowedElement<RT> | null;
}
export type Context<RT extends ReferenceType = ReferenceType> = Omit<UseReturn<RT>,
    'refs' | 'elements'
> & {
    open: boolean;
    onOpenChange(open: boolean, event?: Event, reason?: OpenChangeReason): void;
    events: Events;
    dataRef: React.RefObject<ContextData>;
    nodeId: string | undefined;
    floatingId: string | undefined;
    refs: ExtendedRefs<RT>;
    elements: ExtendedElements<RT>;
};
export interface ContextData {
    openEvent?: Event;
    floatingContext?: Context;
    /** @deprecated use `onTypingChange` prop in `useTypeahead` */
    typing?: boolean;
    [key: string]: any;
}
export interface RootContext<RT extends ReferenceType = ReferenceType> {
    dataRef: React.RefObject<ContextData>;
    open: boolean;
    onOpenChange: (
        open: boolean,
        event?: Event,
        reason?: OpenChangeReason,
    ) => void;
    elements: {
        domReference: Element | null;
        reference: RT | null;
        floating: HTMLElement | null;
    };
    events: Events;
    floatingId: string | undefined;
    refs: {
        setPositionReference(node: ReferenceType | null): void;
    };
}


import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead,
} from '@floating-ui/react';
import {VirtualElement} from "@/utils/types/element";