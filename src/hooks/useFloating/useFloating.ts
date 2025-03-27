import React from "react";
import {
    ContextData,
    ExtendedElements,
    ExtendedRefs,
    NarrowedElement,
    OpenChangeReason,
    ReferenceType,
    RootContext
} from "@/components/types/menu/menu";
import {useTree} from "@/hooks/useTree/useTree";
import {isElement} from "@/utils/isElement/isElement";
import {VirtualElement} from "@/utils/types/element";
import {ComputePositionConfig, ComputePositionReturn} from "@/utils/types/computePosition";

type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type UseFloatingData = Prettify<
    ComputePositionReturn & {isPositioned: boolean}
>;
export type UsePositionFloatingReturn<RT extends ReferenceType = ReferenceType> =
    Prettify<
        UseFloatingData & {
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
            reference: React.RefObject<RT | null>;
            /**
             * A React ref to the floating element.
             */
            floating: React.RefObject<HTMLElement | null>;
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
    }
    >;
export interface FloatingEvents {
    emit<T extends string>(event: T, data?: any): void;
    on(event: string, handler: (data: any) => void): void;
    off(event: string, handler: (data: any) => void): void;
}
export type FloatingContext<RT extends ReferenceType = ReferenceType> = Omit<
    UsePositionFloatingReturn<RT>,
    'refs' | 'elements'
> & {
    open: boolean;
    onOpenChange(open: boolean, event?: Event, reason?: OpenChangeReason): void;
    events: FloatingEvents;
    dataRef: React.RefObject<ContextData>;
    nodeId: string | undefined;
    floatingId: string | undefined;
    refs: ExtendedRefs<RT>;
    elements: ExtendedElements<RT>;
};
export type UseFloatingReturn<RT extends ReferenceType = ReferenceType> =
    Prettify<
        UsePositionFloatingReturn & {
        /**
         * `FloatingContext`
         */
        context: Prettify<FloatingContext<RT>>;
        /**
         * Object containing the reference and floating refs and reactive setters.
         */
        refs: ExtendedRefs<RT>;
        elements: ExtendedElements<RT>;
    }
    >;

export type UsePositionOptions<RT extends ReferenceType = ReferenceType> =
    Prettify<
        Partial<ComputePositionConfig> & {
        /**
         * A callback invoked when both the reference and floating elements are
         * mounted, and cleaned up when either is unmounted. This is useful for
         * setting up event listeners (e.g. pass `autoUpdate`).
         */
        whileElementsMounted?: (
            reference: RT,
            floating: HTMLElement,
            update: () => void,
        ) => () => void;
        /**
         * Object containing the reference and floating elements.
         */
        elements?: {
            reference?: RT | null;
            floating?: HTMLElement | null;
        };
        /**
         * The `open` state of the floating element to synchronize with the
         * `isPositioned` value.
         * @default false
         */
        open?: boolean;
        /**
         * Whether to use `transform` for positioning instead of `top` and `left`
         * (layout) in the `floatingStyles` object.
         * @default false
         */
        transform?: boolean;
    }
    >;
export interface UseFloatingOptions<RT extends ReferenceType = ReferenceType>
    extends Omit<UsePositionOptions<RT>, 'elements'> {
    rootContext?: RootContext<RT>;
    /**
     * Object of external elements as an alternative to the `refs` object setters.
     */
    elements?: {
        /**
         * Externally passed reference element. Store in state.
         */
        reference?: Element | null;
        /**
         * Externally passed floating element. Store in state.
         */
        floating?: HTMLElement | null;
    };
    /**
     * An event callback that is invoked when the floating element is opened or
     * closed.
     */
    onOpenChange?(open: boolean, event?: Event, reason?: OpenChangeReason): void;
    /**
     * Unique node id when using `FloatingTree`.
     */
    nodeId?: string;
}
export function useFloating<RT extends ReferenceType = ReferenceType>(
    options: UseFloatingOptions = {},
): UseFloatingReturn<RT> {
    const {nodeId} = options;

    const internalRootContext = useRootContext({
        ...options,
        elements: {
            reference: null,
            floating: null,
            ...options.elements,
        },
    });

    const rootContext = options.rootContext || internalRootContext;
    const computedElements = rootContext.elements;

    const [_domReference, setDomReference] =
        React.useState<NarrowedElement<RT> | null>(null);
    const [positionReference, _setPositionReference] =
        React.useState<ReferenceType | null>(null);

    const optionDomReference = computedElements?.domReference;
    const domReference = (optionDomReference ||
        _domReference) as NarrowedElement<RT>;
    const domReferenceRef = React.useRef<NarrowedElement<RT> | null>(null);

    const tree = useTree();

    React.useLayoutEffect(() => {
        if (domReference) {
            domReferenceRef.current = domReference;
        }
    }, [domReference]);

    const position = usePosition({
        ...options,
        elements: {
            ...computedElements,
            ...(positionReference && {reference: positionReference}),
        },
    });

    const setPositionReference = React.useCallback(
        (node: ReferenceType | null) => {
            const computedPositionReference = isElement(node)
                ? ({
                    getBoundingClientRect: () => node.getBoundingClientRect(),
                    getClientRects: () => node.getClientRects(),
                    contextElement: node,
                } satisfies VirtualElement)
                : node;
            // Store the positionReference in state if the DOM reference is specified externally via the
            // `elements.reference` option. This ensures that it won't be overridden on future renders.
            _setPositionReference(computedPositionReference);
            position.refs.setReference(computedPositionReference);
        },
        [position.refs],
    );

    const setReference = React.useCallback(
        (node: RT | null) => {
            if (isElement(node) || node === null) {
                (domReferenceRef as React.MutableRefObject<Element | null>).current =
                    node;
                setDomReference(node as NarrowedElement<RT> | null);
            }

            // Backwards-compatibility for passing a virtual element to `reference`
            // after it has set the DOM reference.
            if (
                isElement(position.refs.reference.current) ||
                position.refs.reference.current === null ||
                // Don't allow setting virtual elements using the old technique back to
                // `null` to support `positionReference` + an unstable `reference`
                // callback ref.
                (node !== null && !isElement(node))
            ) {
                position.refs.setReference(node);
            }
        },
        [position.refs],
    );

    const refs = React.useMemo(
        () => ({
            ...position.refs,
            setReference,
            setPositionReference,
            domReference: domReferenceRef,
        }),
        [position.refs, setReference, setPositionReference],
    );

    const elements = React.useMemo(
        () => ({
            ...position.elements,
            domReference: domReference,
        }),
        [position.elements, domReference],
    );

    const context = React.useMemo<FloatingContext<RT>>(
        () => ({
            ...position,
            ...rootContext,
            refs,
            elements,
            nodeId,
        }),
        [position, refs, elements, nodeId, rootContext],
    );

    React.useLayoutEffect(() => {
        rootContext.dataRef.current.floatingContext = context;

        const node = tree?.nodesRef.current.find((node) => node.id === nodeId);
        if (node) {
            node.context = context;
        }
    });

    return React.useMemo(
        () => ({
            ...position,
            context,
            refs,
            elements,
        }),
        [position, refs, elements, context],
    ) as UseFloatingReturn<RT>;
}