"use client";

import type React from "react";
import {useEffect, useRef} from "react";
import {classNames} from "@/utils/classNames";

export interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Dropdown = ({
                             isOpen,
                             onClose,
                             children,
                             className = "",
                         }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                dropdownRef.current!.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('.dropdown-toggle')
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={classNames("absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark", className)}
        >
            {children}
        </div>
    );
};
