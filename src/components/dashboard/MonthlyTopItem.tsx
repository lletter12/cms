"use client"

import {MoreDotIcon} from "@/icons";
import {Dropdown} from "@/components/ui/dropdown/Dropdown";
import {DropdownItem} from "@/components/ui/dropdown/DropdownItem";
import {useState} from "react";
import {MonthlyTopDetail, MonthlyTopDetailProps} from "@/components/dashboard/MonthlyTopDetail";

export interface MonthlyTopItemProps {
    header: string
    items: MonthlyTopDetailProps[]
}

export const MonthlyTopItem = ({header, items}:MonthlyTopItemProps) => {


    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    const handlerClick = () => {
        setIsOpen(false);
    }

    return (
        <div
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    {header}
                </h3>

                <div className="relative inline-block">
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"/>
                    </button>
                    <Dropdown
                        isOpen={isOpen}
                        onClose={closeDropdown}
                        className="w-40 p-2"
                    >
                        <DropdownItem
                            onItemClick={handlerClick}
                            className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            View More
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>
            <div className="my-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                    <span className="text-theme-xs text-gray-400"> Source </span>
                    <span className="text-right text-theme-xs text-gray-400"> Visitors </span>
                </div>

                {items.map((value)=>
                    <MonthlyTopDetail key={value.source} source={value.source} visitors={value.visitors} />
                )}

            </div>
        </div>
    )
}