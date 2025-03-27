import React from "react";
import {MenuContextType, MenuItemProps} from "@/components/types/menu/menu";
import {useListItem} from "@/hooks/useListItem/useListItem";
import {useTree} from "@/hooks/useTree/useTree";
import {useMergeRefs} from "@/hooks/useMergeRefs/useMergeRefs";
import {clsx} from "clsx";
import {MenuContext} from "@/components/Menu/MenuContext";

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