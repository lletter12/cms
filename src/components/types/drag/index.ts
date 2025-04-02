import {ReactNode} from "react";

export interface ComponentItem {
    id: string;
    type: "Button" | "Badge" | "Table";
    data: {
        text?: string;
        placeholder?: string;
        children?: ReactNode
    };
}
