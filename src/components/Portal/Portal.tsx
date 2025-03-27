import {PortalProps} from "@/components/types/portal";
import {usePortalNode} from "@/hooks/usePortalNode/usePortalNode";
import {FocusManagerState} from "@/components/types/focus";
import {
    disableFocusInside,
    enableFocusInside,
    getNextTabbable,
    getPreviousTabbable,
    isOutsideEvent
} from "@/utils/tabbable";
import {FocusGuard, HIDDEN_STYLES} from "@/components/FocusGuard/FocusGuard";

export const Portal = (props: PortalProps) => {
    const {children, id, root, preserveTabOrder = true} = props;

    const portalNode = usePortalNode({id, root});
    const [focusManagerState, setFocusManagerState] =
        React.useState<FocusManagerState>(null);

    const beforeOutsideRef = React.useRef<HTMLSpanElement|null>(null);
    const afterOutsideRef = React.useRef<HTMLSpanElement|null>(null);
    const beforeInsideRef = React.useRef<HTMLSpanElement|null>(null);
    const afterInsideRef = React.useRef<HTMLSpanElement|null>(null);

    const modal = focusManagerState?.modal;
    const open = focusManagerState?.open;

    const shouldRenderGuards =
        // The FocusManager and therefore floating element are currently open/
        // rendered.
        !!focusManagerState &&
        // Guards are only for non-modal focus management.
        !focusManagerState.modal &&
        // Don't render if unmount is transitioning.
        focusManagerState.open &&
        preserveTabOrder &&
        !!(root || portalNode);

    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    React.useEffect(() => {
        if (!portalNode || !preserveTabOrder || modal) {
            return;
        }

        // Make sure elements inside the portal element are tabbable only when the
        // portal has already been focused, either by tabbing into a focus trap
        // element outside or using the mouse.
        function onFocus(event: FocusEvent) {
            if (portalNode && isOutsideEvent(event)) {
                const focusing = event.type === 'focusin';
                const manageFocus = focusing ? enableFocusInside : disableFocusInside;
                manageFocus(portalNode);
            }
        }
        // Listen to the event on the capture phase so they run before the focus
        // trap elements onFocus prop is called.
        portalNode.addEventListener('focusin', onFocus, true);
        portalNode.addEventListener('focusout', onFocus, true);
        return () => {
            portalNode.removeEventListener('focusin', onFocus, true);
            portalNode.removeEventListener('focusout', onFocus, true);
        };
    }, [portalNode, preserveTabOrder, modal]);

    React.useEffect(() => {
        if (!portalNode) return;
        if (open) return;

        enableFocusInside(portalNode);
    }, [open, portalNode]);

    return (
        <PortalContext.Provider
            value={React.useMemo(
                () => ({
                    preserveTabOrder,
                    beforeOutsideRef,
                    afterOutsideRef,
                    beforeInsideRef,
                    afterInsideRef,
                    portalNode,
                    setFocusManagerState,
                }),
                [preserveTabOrder, portalNode],
            )}
        >
            {shouldRenderGuards && portalNode && (
                <FocusGuard
                    data-type="outside"
                    ref={beforeOutsideRef}
                    onFocus={(event) => {
                        if (isOutsideEvent(event, portalNode as HTMLDivElement)) {
                            if(beforeInsideRef.current) {
                                beforeInsideRef.current!.focus();
                            }
                        } else {
                            const domReference = focusManagerState
                                ? focusManagerState.domReference
                                : null;
                            const prevTabbable = getPreviousTabbable(domReference);
                            prevTabbable?.focus();
                        }
                    }}
                />
            )}
            {shouldRenderGuards && portalNode && (
                <span aria-owns={portalNode.id} style={HIDDEN_STYLES} />
            )}
            {portalNode && ReactDOM.createPortal(children, portalNode)}
            {shouldRenderGuards && portalNode && (
                <FocusGuard
                    data-type="outside"
                    ref={afterOutsideRef}
                    onFocus={(event) => {
                        if (isOutsideEvent(event, portalNode as HTMLDivElement)) {
                            if(afterInsideRef.current) {
                                afterInsideRef.current!.focus();
                            }
                        } else {
                            const domReference = focusManagerState
                                ? focusManagerState.domReference
                                : null;
                            const nextTabbable = getNextTabbable(domReference);
                            nextTabbable?.focus();

                            focusManagerState?.closeOnFocusOut &&
                            focusManagerState?.onOpenChange(
                                false,
                                event.nativeEvent,
                                'focus-out',
                            );
                        }
                    }}
                />
            )}
        </PortalContext.Provider>
    );
}