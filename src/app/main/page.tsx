"use client"

import {Menu} from "@/components/Menu/Menu";
import Image from "next/image"
import {useEffect, useRef, useState} from "react";

export default function Page () {

    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)

    const handlerOnClick = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if(btnRef.current && "style" in btnRef.current) {
            if(open) {
                btnRef.current.style = "opacity: 0;"
            }else {
                btnRef.current.style = "opacity: 100;"
            }
        }
    }, [open]);

    return (
        <div className={"pt-8 px-8"}>
            <button type="button" className="size-10 relative duration-300" onClick={handlerOnClick} ref={btnRef}>
                <Image src={"/menu.svg"} className={"text-white"} fill={true} alt={"menu"}/>
            </button>
            <Menu show={open} setShow={setOpen}/>
        </div>
    )
}