import React from "react";
import {MenuContextType} from "@/components/types/menu/menu";

export const MenuContext = React.createContext<MenuContextType>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    allowHover: true,
    isOpen: false,
    setIsOpen: () => {},
    parent: null,
});
