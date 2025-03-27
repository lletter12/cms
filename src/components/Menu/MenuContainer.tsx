import React from "react";
import {MenuContextType, MenuProps} from "@/components/types/menu/menu";
import {useNodeId} from "@/hooks/useNodeId/useNodeId";
import {useTree} from "@/hooks/useTree/useTree";
import {useParentNodeId} from "@/hooks/useParentNodeId/useParentNodeId";
import {MenuContext} from "@/components/Menu/MenuContext";
import {useListItem} from "@/hooks/useListItem/useListItem";
import {offset} from "@/utils/offset";
import {flip} from "@/utils/flip/flip";
import {autoUpdate} from "@/utils/autoUpdate/autoUpdate";
import {useHover} from "@/hooks/useHover/useHover";
import {safePolygon} from "@/utils/sagePolygon";
import {useRole} from "@/hooks/useRole/useRole";
import {useListNavigation} from "@/hooks/useListNavigation/useListNavigation";
import {useTypeahead} from "@/hooks/useTypeahead/useTypeahead";
import {useInteractions} from "@/hooks/useInteractions/useInteractions";
import {Node} from "@/components/Tree/Node"
import {useMergeRefs} from "@/hooks/useMergeRefs/useMergeRefs";
import {clsx} from "clsx";
import {List} from "@/components/List/List";
import {Portal} from "@/components/Portal/Portal";
import {FocusManager} from "@/components/FocusManager/FocusManager";
import {useDismiss} from "@/hooks/useDismiss/useDismiss";
import {useClick} from "@/hooks/useClick/useClick";
import {shift} from "@/utils/shift";

export const MenuComponent = React.forwardRef<
    HTMLButtonElement,
    MenuProps & React.HTMLProps<HTMLButtonElement>
>(function Menu(
    {
        children,
        label,
        keepMounted = false,
        cols,
        orientation: orientationOption,
        ...props
    },
    forwardedRef,
) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [allowHover, setAllowHover] = React.useState(false);
    const [hasFocusInside, setHasFocusInside] = React.useState(false);

    const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = React.useRef<Array<string | null>>([]);

    const tree = useTree();
    const nodeId = useNodeId();
    const parentId = useParentNodeId();
    const isNested = parentId != null;
    const orientation = orientationOption ?? (cols ? 'both' : 'vertical');

    const parent = React.useContext(MenuContext);
    const item = useListItem();

    const {floatingStyles, refs, context} = useFloating<HTMLButtonElement>({
        nodeId,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: isNested ? 'right-start' : 'bottom-start',
        middleware: [
            offset({mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0}),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
        enabled: isNested && allowHover,
        delay: {open: 75},
        handleClose: safePolygon({blockPointerEvents: true}),
    });
    const click = useClick(context, {
        event: 'mousedown',
        toggle: !isNested || !allowHover,
        ignoreMouse: isNested,
    });
    const role = useRole(context, {role: 'menu'});
    const dismiss = useDismiss(context, {bubbles: true});
    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
        orientation,
        cols,
    });
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex,
    });

    const {getReferenceProps, getFloatingProps, getItemProps} = useInteractions([
        hover,
        click,
        role,
        dismiss,
        listNavigation,
        typeahead,
    ]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            setIsOpen(false);
        }

        function onSubMenuOpen(event: {nodeId: string; parentId: string}) {
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                setIsOpen(false);
            }
        }

        tree.events.on('click', handleTreeClick);
        tree.events.on('menuopen', onSubMenuOpen);

        return () => {
            tree.events.off('click', handleTreeClick);
            tree.events.off('menuopen', onSubMenuOpen);
        };
    }, [tree, nodeId, parentId]);

    React.useEffect(() => {
        if (isOpen && tree) {
            tree.events.emit('menuopen', {parentId, nodeId});
        }
    }, [tree, isOpen, nodeId, parentId]);

    // Determine if "hover" logic can run based on the modality of input. This
    // prevents unwanted focus synchronization as menus open and close with
    // keyboard navigation and the cursor is resting on the menu.
    React.useEffect(() => {
        function onPointerMove({pointerType}: PointerEvent) {
            if (pointerType !== 'touch') {
                setAllowHover(true);
            }
        }

        function onKeyDown() {
            setAllowHover(false);
        }

        window.addEventListener('pointermove', onPointerMove, {
            once: true,
            capture: true,
        });
        window.addEventListener('keydown', onKeyDown, true);
        return () => {
            window.removeEventListener('pointermove', onPointerMove, {
                capture: true,
            });
            window.removeEventListener('keydown', onKeyDown, true);
        };
    }, [allowHover]);

    return (
        <Node id={nodeId}>
            <button
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                data-open={isOpen ? '' : undefined}
                tabIndex={
                    !isNested
                        ? props.tabIndex
                        : parent.activeIndex === item.index
                            ? 0
                            : -1
                }
                className={clsx(
                    props.className ||
                    'text-left flex gap-4 justify-between items-center rounded py-1 px-2',
                    {
                        'focus:bg-blue-500 focus:text-white outline-none': isNested,
                        'bg-blue-500 text-white': isOpen && isNested && !hasFocusInside,
                        'bg-slate-200 rounded py-1 px-2':
                            isNested && isOpen && hasFocusInside,
                        'bg-slate-200': !isNested && isOpen,
                    },
                )}
                {...getReferenceProps(
                    parent.getItemProps({
                        ...props,
                        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                            props.onFocus?.(event);
                            setHasFocusInside(false);
                            parent.setHasFocusInside(true);
                        },
                        onMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
                            props.onMouseEnter?.(event);
                            if (parent.allowHover && parent.isOpen) {
                                parent.setActiveIndex(item.index);
                            }
                        },
                    }),
                )}
            >
                {label}
                {isNested && (
                    <span aria-hidden className="ml-4">
            <ChevronRightIcon />
          </span>
                )}
            </button>
            <MenuContext.Provider
                value={{
                    activeIndex,
                    setActiveIndex,
                    getItemProps,
                    setHasFocusInside,
                    allowHover,
                    isOpen,
                    setIsOpen,
                    parent,
                }}
            >
                <List elementsRef={elementsRef} labelsRef={labelsRef}>
                    {(keepMounted || isOpen) && (
                        <Portal>
                            <FocusManager
                                context={context}
                                modal={false}
                                initialFocus={isNested ? -1 : 0}
                                returnFocus={!isNested}
                            >
                                <div
                                    ref={refs.setFloating}
                                    className={clsx(
                                        'rounded bg-white shadow-lg outline-none p-1 border border-slate-900/10 bg-clip-padding',
                                        {
                                            'flex flex-col': !cols,
                                        },
                                        {
                                            [`grid grid-cols-[repeat(var(--cols),_minmax(0,_1fr))] gap-3`]:
                                            cols,
                                        },
                                    )}
                                    style={{
                                        ...floatingStyles,
                                        '--cols': cols,
                                        visibility: !keepMounted
                                            ? undefined
                                            : isOpen
                                                ? 'visible'
                                                : 'hidden',
                                    }}
                                    aria-hidden={!isOpen}
                                    {...getFloatingProps()}
                                >
                                    {children}
                                </div>
                            </FocusManager>
                        </Portal>
                    )}
                </List>
            </MenuContext.Provider>
        </Node>
    );
});

interface MenuItemProps {
    label: string;
    disabled?: boolean;
}

export const MenuItem = React.forwardRef<
    HTMLButtonElement,
    MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function MenuItem({label, disabled, ...props}, forwardedRef) {
    const menu = React.useContext(MenuContext);
    const item = useListItem({label: disabled ? null : label});
    const tree = useTree();
    const isActive = item.index === menu.activeIndex;

    return (
        <button
            {...props}
            ref={useMergeRefs([item.ref, forwardedRef])}
            type="button"
            role="menuitem"
            disabled={disabled}
            tabIndex={isActive ? 0 : -1}
            className={clsx(
                'text-left flex py-1 px-2 focus:bg-blue-500 focus:text-white outline-none rounded',
                {'opacity-40': disabled},
            )}
            {...menu.getItemProps({
                active: isActive,
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    props.onClick?.(event);
                    tree?.events.emit('click');
                },
                onFocus(event: React.FocusEvent<HTMLButtonElement>) {
                    props.onFocus?.(event);
                    menu.setHasFocusInside(true);
                },
                onMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
                    props.onMouseEnter?.(event);
                    if (menu.allowHover && menu.isOpen) {
                        menu.setActiveIndex(item.index);
                    }
                },
                onKeyDown(event) {
                    function closeParents(parent: MenuContextType | null) {
                        parent?.setIsOpen(false);
                        if (parent?.parent) {
                            closeParents(parent.parent);
                        }
                    }

                    if (
                        event.key === 'ArrowRight' &&
                        // If the root reference is in a menubar, close parents
                        tree?.nodesRef.current[0].context?.elements.domReference?.closest(
                            '[role="menubar"]',
                        )
                    ) {
                        closeParents(menu.parent);
                    }
                },
            })}
        >
            {label}
        </button>
    );
});
