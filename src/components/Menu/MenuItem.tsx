import React from "react";
import objectsToString from "../../utils/objectsToString/objectsToString";

import {useTheme} from "../../context/theme";

import type {children, className, disabled} from "@/components/types/components/menu";
import {propTypesChildren, propTypesClassName, propTypesDisabled,} from "@/components/types/components/menu";
import {classnames} from "@/utils/classnames/classnames";

export interface MenuItemProps extends React.ComponentProps<"li"> {
    className?: className;
    disabled?: disabled;
    children: children;
}

export const MenuItem = React.forwardRef<
    HTMLButtonElement,
    MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", disabled = false, children, ...rest }, ref) => {
    // 1. init
    const { menu } = useTheme();
    const {
        styles: { base },
    } = menu;

    // 2. set styles
    const menuItemClasses =
        classnames(objectsToString(base.item.initial), {
            [objectsToString(base.item.disabled)]: disabled,
        }, className)

    // 4. return
    return (
        <button {...rest} ref={ref} role="menuitem" className={menuItemClasses}>
            {children}
        </button>
    );
});

MenuItem.propTypes = {
    className: propTypesClassName,
    disabled: propTypesDisabled,
    children: propTypesChildren,
};

MenuItem.displayName = "MaterialTailwind.MenuItem";

export default MenuItem;