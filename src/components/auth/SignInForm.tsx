"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import {EyeCloseIcon, EyeIcon} from "@/icons";
import Link from "next/link";
import React, {useActionState, useState} from "react";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const router = useRouter();

    async function signup(prevState, htmlFormData) {
        // "use server";
        const id = htmlFormData.get("id");
        console.log("id:", id)
        router.push("/main");
    }

    const [error, logInAction] = useActionState(signup, null);
    const t = useTranslations("SignIn");

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className={"flex w-full items-center justify-center"}>
                    <a href="#"
                       className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <div className={"relative w-36 h-16"}>
                            <Image src={"/logo.png"} alt={""} fill/>
                        </div>
                    </a>
                </div>
                <div>
                    <div>
                        <form action={logInAction}>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        {t("text.email.label")} <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input placeholder={t("text.email.placeHolder")} type="email"/>
                                </div>
                                <div>
                                    <Label>
                                        {t("text.password.label")} <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("text.password.placeHolder")}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400"/>
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400"/>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox checked={isChecked} onChange={setIsChecked}/>
                                        <span
                                            className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                            {t("text.keep.label")}
                                        </span>
                                    </div>
                                    <Link
                                        href="/reset-password"
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    >
                                        {t("text.forgot.label")}
                                    </Link>
                                </div>
                                <div>
                                    <Button className="w-full" size="sm">
                                        {t("text.signIn.label")}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                {t("text.account.label")} &nbsp;
                                <Link
                                    href="/signup"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    {t("text.signUp.label")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
