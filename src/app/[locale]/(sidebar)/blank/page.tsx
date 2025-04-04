"use client"

//“Before starting, please remove ‘use client’ at the top.”

import {PageBreadcrumb} from "@/components/common/PageBreadCrumb";
import React from "react";
import {useTranslations} from "next-intl";

export default function BlankPage() {

    const t = useTranslations("BlankPage");

    return (
        <div>
            <PageBreadcrumb pageTitle="Blank Page"/>
            <div
                className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="mx-auto w-full max-w-[630px] text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        {t("description")}
                    </p>
                </div>
            </div>
        </div>
    );
}
