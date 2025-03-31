import {SignInForm} from "@/components/auth/SignInForm";
import {LocaleDropdown} from "@/components/localDropdown/LocalDropDown";

export default function Home() {
    return (
        <>
            <div className={"relative"}>
                <div className={"absolute top-3 right-3.5"}>
                    <LocaleDropdown/>
                </div>
            </div>
            <div className="flex min-w-screen min-h-screen font-[family-name:var(--font-geist-sans)]">
                <SignInForm/>
            </div>
        </>
    );
}
