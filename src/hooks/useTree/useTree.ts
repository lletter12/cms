import React from "react";
import {ReferenceType} from "@/components/types/menu/menu";
import {TreeProps, TreeType} from "@/components/types/tree";

const TreeContext = React.createContext<TreeProps | null>(null);

export const useTree = <
    RT extends ReferenceType = ReferenceType,
>(): TreeType<RT> | null =>
    React.useContext(TreeContext) as TreeType<RT> | null;
