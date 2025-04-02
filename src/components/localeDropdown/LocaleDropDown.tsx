"use client";

import {routing, usePathname, useRouter} from "@/i18n/routing";
import {useLocale} from "next-intl";
import React from "react";
import {Select} from "@/components/form/Select";
import {ChevronDownIcon} from "@/icons";

export const LocaleDropdown = () => {

    const locale = useLocale();
    const pathname = usePathname()
    const router = useRouter()

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
            return {value, label};
        });
    }
    const handleSelectChange = (value: string) => {
        if (value) {
            router.push({pathname}, {locale: value});
        }
    };

    return (
        <>
            <Select
                options={localeList()}
                placeholder="Select Option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900 !border-none !pr-0"
                defaultValue={locale}
            />
            <span
                className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
        </>
    )
}