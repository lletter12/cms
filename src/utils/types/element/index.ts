import type * as React from 'react';
import {ExtendedUserProps} from "@/utils/mergeProps";

export const min = Math.min;
export const max = Math.max;
export const floor = Math.floor;
export declare type Axis = 'x' | 'y';
export declare type Side = 'top' | 'right' | 'bottom' | 'left';
export declare type Length = 'width' | 'height';
export declare type AlignedPlacement = `${Side}-${Alignment}`;
export declare type Alignment = 'start' | 'end';
export declare type Strategy = 'absolute' | 'fixed';
export declare type Padding = number | Prettify<Partial<SideObject>>;
export declare const alignments: Alignment[];
declare type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export declare type Coords = {
    [key in Axis]: number;
};
export declare type Dimensions = {
    [key in Length]: number;
};
export declare const createCoords: (v: number) => {
    x: number;
    y: number;
};
export declare type Rect = Prettify<Coords & Dimensions>;
export declare type SideObject = {
    [key in Side]: number;
};
export declare type ReferenceElement = Element | VirtualElement;
export declare interface VirtualElement {
    getBoundingClientRect(): ClientRectObject;
    getClientRects?(): Array<ClientRectObject> | DOMRectList;
    contextElement?: Element;
}
export declare interface ElementRects {
    reference: Rect;
    floating: Rect;
}

export interface ElementProps {
    reference?: React.HTMLProps<Element>;
    element?: React.HTMLProps<HTMLElement>;
    item?:
        | React.HTMLProps<HTMLElement>
        | ((props: ExtendedUserProps) => React.HTMLProps<HTMLElement>);
}

export declare type Placement = Prettify<Side | AlignedPlacement>;
export declare type ClientRectObject = Prettify<Rect & SideObject>;
export declare type Boundary = 'clippingAncestors' | Element | Array<Element> | Rect;
export declare type RootBoundary = 'viewport' | 'document' | Rect;
export declare type ElementContext = 'reference' | 'floating';