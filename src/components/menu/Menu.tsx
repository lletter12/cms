"use client"

import {Button, Menu as MtMenu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import Image from "next/image";
import {useRouter} from "next/navigation";

export const Menu = () => {

    const router = useRouter();

    const handlerOnClick = () => {
        router.push("/make")
    }

    return (
        <MtMenu
            animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}
        >
            <MenuHandler>
                <Button className={"size-10 relative rounded-xl"} >
                    <Image src={"/menu.svg"} className={"text-white"} fill={true} alt={"menu"}/>
                </Button>
            </MenuHandler>
            <MenuList className={"ml-2.5 py-2.5 w-58 rounded-xl text-black text-lg"}>
                <MenuItem className={"mt-0.5"} onClick={handlerOnClick}>컨텐츠 생성하기</MenuItem>
                <MenuItem className={"mt-1.5"}>Menu Item 2</MenuItem>
                <MenuItem className={"mt-1.5"}>Menu Item 3</MenuItem>
            </MenuList>
        </MtMenu>
    )
}