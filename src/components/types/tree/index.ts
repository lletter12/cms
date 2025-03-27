import React from "react";
import {Context, Events, ReferenceType} from "@/components/types/menu/menu";
import {ExtendedUserProps} from "@/utils/mergeProps";

export interface TreeProps {
    children?: React.ReactNode;
}
export interface TreeNodeProps {
    children?: React.ReactNode;
    id: string | undefined;
}

export interface TreeNodeType<RT extends ReferenceType = ReferenceType> {
    id: string | undefined;
    parentId: string | null;
    context?: Context<RT>;
}

export interface ElementProps {
    reference?: React.HTMLProps<Element>;
    floating?: React.HTMLProps<HTMLElement>;
    item?:
        | React.HTMLProps<HTMLElement>
        | ((props: ExtendedUserProps) => React.HTMLProps<HTMLElement>);
}


export interface NodeProps {
    children?: React.ReactNode;
    id: string | undefined;
}

export interface TreeType<RT extends ReferenceType = ReferenceType> {
    nodesRef: React.RefObject<Array<TreeNodeType<RT>>>;
    events: Events;
    addNode(node: TreeNodeType): void;
    removeNode(node: TreeNodeType): void;
}