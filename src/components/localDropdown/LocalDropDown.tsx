"use client";


import {routing, usePathname, useRouter} from "@/i18n/routing";
import {useLocale} from "next-intl";
import React, {useState} from "react";
import {DropdownItem} from "@/components/ui/dropdown/DropdownItem";
import {Dropdown} from "@/components/ui/dropdown/Dropdown";

export const LocaleDropdown = () => {

    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    const localeText = () => {
        if (locale === "ko") {
            return "한국어"
        } else if (locale === "en") {
            return "English"
        } else if (locale === "jp") {
            return "日本語"
        }
    }

    const localeList = () => {
        const copy = [...routing.locales];

        return copy.map((value) => {
            let label = "";
            if (value === "ko") {
                label = "한국어";
            } else if (value === "en") {
                label = "English";
            } else if (value === "jp") {
                label = "日本語";
            }
            return { value, label };
        });
    }

    const handleChange = (value?: string) => {
        if (value) {
            closeDropdown()
            router.push({pathname}, {locale: value});
        }
    };

    return (
        <>
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
            >
                <span className="block mr-1 font-medium text-theme-sm">{localeText()}</span>
                <svg
                    className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <Dropdown
                className="flex flex-col gap-3 rounded-lg border-b border-gray-300 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                href="#"
                isOpen={isOpen}
                onClose={closeDropdown}
            >
                {localeList().map(locale =>
                    <DropdownItem className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        key={locale.value} onClick={() => handleChange(locale.value)}>{locale.label}</DropdownItem>
                )}
            </Dropdown>
        </>
    )
}