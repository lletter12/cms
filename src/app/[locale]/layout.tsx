import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/context/ThemeContext";
import {SidebarProvider} from "@/context/SidebarContext";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "prowise cms",
    description: "prowise cms",
};

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {

    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
        >
        <NextIntlClientProvider>
            <ThemeProvider>
                <SidebarProvider>
                {children}
                </SidebarProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
