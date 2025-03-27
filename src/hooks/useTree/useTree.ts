import React from "react";
import {ReferenceType} from "@/components/types/menu/menu";
import {TreeType} from "@/components/types/tree";
import {TreeContext} from "@/components/Tree/TreeContext";

export const useTree = <
    RT extends ReferenceType = ReferenceType,
>(): TreeType<RT> | null =>
    React.useContext(TreeContext) as TreeType<RT> | null;
