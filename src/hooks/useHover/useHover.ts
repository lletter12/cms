import React from "react"
import {HandleCloseFn} from "@/utils/types/sagePolygon";
import {OpenChangeReason, RootContext} from "@/components/types/menu/menu";
import {useLatestRef} from "@/hooks/useLatestRef/useLatestRef";
import {ElementProps} from "@/utils/types/element";
import {useTree} from "@/hooks/useTree/useTree";
import {useParentNodeId} from "@/hooks/useParentNodeId/useParentNodeId";
import {clearTimeoutIfSet} from "@/utils/clearTimeoutIfSet";
import {contains, getDocument, isMouseLikePointerType} from "@/utils/dom";
import {getDelay} from "@/utils/getDelay";
import {useEffectEvent} from "@/hooks/useEffectEvent/useEffectEvent";
import {createAttribute} from "@/utils/createAttribute";
import {isElement} from "@/utils/isElement/isElement";

export interface UseHoverProps {
    /**
     * Whether the Hook is enabled, including all internal Effects and event
     * handlers.
     * @default true
     */
    enabled?: boolean;
    /**
     * Instead of closing the floating element when the cursor leaves its
     * reference, we can leave it open until a certain condition is satisfied,
     * e.g. to let them traverse into the floating element.
     * @default null
     */
    handleClose?: HandleCloseFn | null;
    /**
     * Waits until the user’s cursor is at “rest” over the reference element
     *  before changing the `open` state.
     * @default 0
     */
    restMs?: number;
    /**
     * Waits for the specified time when the event listener runs before changing
     * the `open` state.
     * @default 0
     */
    delay?: number | {open?: number; close?: number};
    /**
     * Whether the logic only runs for mouse input, ignoring touch input.
     * Note: due to a bug with Linux Chrome, "pen" inputs are considered "mouse".
     * @default false
     */
    mouseOnly?: boolean;
    /**
     * Whether moving the cursor over the floating element will open it, without a
     * regular hover event required.
     * @default true
     */
    move?: boolean;
}

const safePolygonIdentifier = createAttribute('safe-polygon');

export function useHover(
    context: RootContext,
    props: UseHoverProps = {},
): ElementProps {
    const {open, onOpenChange, dataRef, events, elements} = context;
    const {
        enabled = true,
        delay = 0,
        handleClose = null,
        mouseOnly = false,
        restMs = 0,
        move = true,
    } = props;

    const tree = useTree();
    const parentId = useParentNodeId();
    const handleCloseRef = useLatestRef(handleClose);
    const delayRef = useLatestRef(delay);
    const openRef = useLatestRef(open);

    const pointerTypeRef = React.useRef<string|undefined>(undefined);
    const timeoutRef = React.useRef(-1);
    const handlerRef = React.useRef<(event: MouseEvent) => void | null>(null);
    const restTimeoutRef = React.useRef(-1);
    const blockMouseMoveRef = React.useRef(true);
    const performedPointerEventsMutationRef = React.useRef(false);
    const unbindMouseMoveRef = React.useRef(() => {});
    const restTimeoutPendingRef = React.useRef(false);

    const isHoverOpen = React.useCallback(() => {
        const type = dataRef.current.openEvent?.type;
        return type?.includes('mouse') && type !== 'mousedown';
    }, [dataRef]);

    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    React.useEffect(() => {
        if (!enabled) return;

        function onOpenChange({open}: {open: boolean}) {
            if (!open) {
                clearTimeoutIfSet(timeoutRef);
                clearTimeoutIfSet(restTimeoutRef);
                blockMouseMoveRef.current = true;
                restTimeoutPendingRef.current = false;
            }
        }

        events.on('openchange', onOpenChange);
        return () => {
            events.off('openchange', onOpenChange);
        };
    }, [enabled, events]);

    React.useEffect(() => {
        if (!enabled) return;
        if (!handleCloseRef.current) return;
        if (!open) return;

        function onLeave(event: MouseEvent) {
            if (isHoverOpen()) {
                onOpenChange(false, event, 'hover');
            }
        }

        const html = getDocument(elements.floating).documentElement;
        html.addEventListener('mouseleave', onLeave);
        return () => {
            html.removeEventListener('mouseleave', onLeave);
        };
    }, [
        elements.floating,
        open,
        onOpenChange,
        enabled,
        handleCloseRef,
        isHoverOpen,
    ]);

    const closeWithDelay = React.useCallback(
        (
            event: Event,
            runElseBranch = true,
            reason: OpenChangeReason = 'hover',
        ) => {
            const closeDelay = getDelay(
                delayRef.current,
                'close',
                pointerTypeRef.current as PointerEvent['pointerType'],
            );
            if (closeDelay && !handlerRef.current) {
                clearTimeoutIfSet(timeoutRef);
                timeoutRef.current = window.setTimeout(
                    () => onOpenChange(false, event, reason),
                    closeDelay,
                );
            } else if (runElseBranch) {
                clearTimeoutIfSet(timeoutRef);
                onOpenChange(false, event, reason);
            }
        },
        [delayRef, onOpenChange],
    );

    const cleanupMouseMoveHandler = useEffectEvent(() => {
        unbindMouseMoveRef.current();
        handlerRef.current = null;
    });

    const clearPointerEvents = useEffectEvent(() => {
        if (performedPointerEventsMutationRef.current) {
            const body = getDocument(elements.floating).body;
            body.style.pointerEvents = '';
            body.removeAttribute(safePolygonIdentifier);
            performedPointerEventsMutationRef.current = false;
        }
    });

    const isClickLikeOpenEvent = useEffectEvent(() => {
        return dataRef.current.openEvent
            ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type)
            : false;
    });

    // Registering the mouse events on the reference directly to bypass React's
    // delegation system. If the cursor was on a disabled element and then entered
    // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
    React.useEffect(() => {
        if (!enabled) return;

        function onMouseEnter(event: MouseEvent) {
            clearTimeoutIfSet(timeoutRef);
            blockMouseMoveRef.current = false;

            if (
                (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) ||
                (restMs > 0 && !getDelay(delayRef.current, 'open'))
            ) {
                return;
            }

            const openDelay = getDelay(
                delayRef.current,
                'open',
                pointerTypeRef.current as PointerEvent['pointerType'],
            );

            if (openDelay) {
                timeoutRef.current = window.setTimeout(() => {
                    if (!openRef.current) {
                        onOpenChange(true, event, 'hover');
                    }
                }, openDelay);
            } else if (!open) {
                onOpenChange(true, event, 'hover');
            }
        }

        function onMouseLeave(event: MouseEvent) {
            if (isClickLikeOpenEvent()) return;

            unbindMouseMoveRef.current();

            const doc = getDocument(elements.floating);
            clearTimeoutIfSet(restTimeoutRef);
            restTimeoutPendingRef.current = false;

            if (handleCloseRef.current && dataRef.current.floatingContext) {
                // Prevent clearing `onScrollMouseLeave` timeout.
                if (!open) {
                    clearTimeoutIfSet(timeoutRef);
                }

                handlerRef.current = handleCloseRef.current({
                    ...dataRef.current.floatingContext,
                    tree,
                    x: event.clientX,
                    y: event.clientY,
                    onClose() {
                        clearPointerEvents();
                        cleanupMouseMoveHandler();
                        if (!isClickLikeOpenEvent()) {
                            closeWithDelay(event, true, 'safe-polygon');
                        }
                    },
                });

                const handler = handlerRef.current;

                doc.addEventListener('mousemove', handler);
                unbindMouseMoveRef.current = () => {
                    doc.removeEventListener('mousemove', handler);
                };

                return;
            }

            // Allow interactivity without `safePolygon` on touch devices. With a
            // pointer, a short close delay is an alternative, so it should work
            // consistently.
            const shouldClose =
                pointerTypeRef.current === 'touch'
                    ? !contains(elements.floating, event.relatedTarget as Element | null)
                    : true;
            if (shouldClose) {
                closeWithDelay(event);
            }
        }

        // Ensure the floating element closes after scrolling even if the pointer
        // did not move.
        // https://github.com/floating-ui/floating-ui/discussions/1692
        function onScrollMouseLeave(event: MouseEvent) {
            if (isClickLikeOpenEvent()) return;
            if (!dataRef.current.floatingContext) return;

            handleCloseRef.current?.({
                ...dataRef.current.floatingContext,
                tree,
                x: event.clientX,
                y: event.clientY,
                onClose() {
                    clearPointerEvents();
                    cleanupMouseMoveHandler();
                    if (!isClickLikeOpenEvent()) {
                        closeWithDelay(event);
                    }
                },
            })(event);
        }

        if (isElement(elements.domReference)) {
            const ref = elements.domReference as unknown as HTMLElement;
            open && ref.addEventListener('mouseleave', onScrollMouseLeave);
            if(elements.floating) {
                elements.floating.addEventListener('mouseleave', onScrollMouseLeave);
            }
            move && ref.addEventListener('mousemove', onMouseEnter, {once: true});
            ref.addEventListener('mouseenter', onMouseEnter);
            ref.addEventListener('mouseleave', onMouseLeave);
            return () => {
                open && ref.removeEventListener('mouseleave', onScrollMouseLeave);
                if(elements.floating) {
                    elements.floating.removeEventListener(
                        'mouseleave',
                        onScrollMouseLeave,
                    );
                }
                move && ref.removeEventListener('mousemove', onMouseEnter);
                ref.removeEventListener('mouseenter', onMouseEnter);
                ref.removeEventListener('mouseleave', onMouseLeave);
            };
        }
    }, [
        elements,
        enabled,
        context,
        mouseOnly,
        restMs,
        move,
        closeWithDelay,
        cleanupMouseMoveHandler,
        clearPointerEvents,
        onOpenChange,
        open,
        openRef,
        tree,
        delayRef,
        handleCloseRef,
        dataRef,
        isClickLikeOpenEvent,
    ]);

    // Block pointer-events of every element other than the reference and floating
    // while the floating element is open and has a `handleClose` handler. Also
    // handles nested floating elements.
    // https://github.com/floating-ui/floating-ui/issues/1722
    React.useLayoutEffect(() => {
        if (!enabled) return;

        if (
            open &&
            handleCloseRef.current?.__options.blockPointerEvents &&
            isHoverOpen()
        ) {
            performedPointerEventsMutationRef.current = true;
            const floatingEl = elements.floating;

            if (isElement(elements.domReference) && floatingEl) {
                const body = getDocument(elements.floating).body;
                body.setAttribute(safePolygonIdentifier, '');

                const ref = elements.domReference as unknown as
                    | HTMLElement
                    | SVGSVGElement;
                if(tree && tree.nodesRef) {
                    const parentFloating = tree?.nodesRef.current.find(
                        (node) => node.id === parentId,
                    )?.context?.elements.floating;

                    if (parentFloating) {
                        parentFloating.style.pointerEvents = '';
                    }

                    body.style.pointerEvents = 'none';
                    ref.style.pointerEvents = 'auto';
                    floatingEl.style.pointerEvents = 'auto';

                    return () => {
                        body.style.pointerEvents = '';
                        ref.style.pointerEvents = '';
                        floatingEl.style.pointerEvents = '';
                    };
                }
            }
        }
    }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);

    React.useLayoutEffect(() => {
        if (!open) {
            pointerTypeRef.current = undefined;
            restTimeoutPendingRef.current = false;
            cleanupMouseMoveHandler();
            clearPointerEvents();
        }
    }, [open, cleanupMouseMoveHandler, clearPointerEvents]);

    React.useEffect(() => {
        return () => {
            cleanupMouseMoveHandler();
            clearTimeoutIfSet(timeoutRef);
            clearTimeoutIfSet(restTimeoutRef);
            clearPointerEvents();
        };
    }, [
        enabled,
        elements.domReference,
        cleanupMouseMoveHandler,
        clearPointerEvents,
    ]);

    const reference: ElementProps['reference'] = React.useMemo(() => {
        function setPointerRef(event: React.PointerEvent) {
            pointerTypeRef.current = event.pointerType;
        }

        return {
            onPointerDown: setPointerRef,
            onPointerEnter: setPointerRef,
            onMouseMove(event) {
                const {nativeEvent} = event;

                function handleMouseMove() {
                    if (!blockMouseMoveRef.current && !openRef.current) {
                        onOpenChange(true, nativeEvent, 'hover');
                    }
                }

                if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
                    return;
                }

                if (open || restMs === 0) {
                    return;
                }

                // Ignore insignificant movements to account for tremors.
                if (
                    restTimeoutPendingRef.current &&
                    event.movementX ** 2 + event.movementY ** 2 < 2
                ) {
                    return;
                }

                clearTimeoutIfSet(restTimeoutRef);

                if (pointerTypeRef.current === 'touch') {
                    handleMouseMove();
                } else {
                    restTimeoutPendingRef.current = true;
                    restTimeoutRef.current = window.setTimeout(handleMouseMove, restMs);
                }
            },
        };
    }, [mouseOnly, onOpenChange, open, openRef, restMs]);

    const floating: ElementProps['floating'] = React.useMemo(
        () => ({
            onMouseEnter() {
                clearTimeoutIfSet(timeoutRef);
            },
            onMouseLeave(event) {
                if (!isClickLikeOpenEvent()) {
                    closeWithDelay(event.nativeEvent, false);
                }
            },
        }),
        [closeWithDelay, isClickLikeOpenEvent],
    );

    return <ElementProps>React.useMemo(
        () => (enabled ? {reference, floating} : {}),
        [enabled, reference, floating],
    );
}