import {LogIn} from "@/components/LogIn/LogIn";

export default function Home() {

    return (
        <div className="flex min-w-screen min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-800">
            <main className={"flex items-center justify-items-center w-full"}>
                <LogIn />
            </main>
        </div>
    );
}
