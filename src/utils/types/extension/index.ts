import {
    Axis,
    Boundary, ClientRectObject,
    Coords, Dimensions, ElementRects,
    Placement,
    Rect,
    ReferenceElement,
    RootBoundary,
    SideObject, Strategy
} from "@/utils/types/element";

export declare type Middleware = {
    name: string;
    options?: any;
    fn: (state: MiddlewareState) => Promisable<MiddlewareReturn>;
};
export declare interface MiddlewareData {
    [key: string]: any;
    arrow?: Partial<Coords> & {
        centerOffset: number;
        alignmentOffset?: number;
    };
    autoPlacement?: {
        index?: number;
        overflows: Array<{
            placement: Placement;
            overflows: Array<number>;
        }>;
    };
    flip?: {
        index?: number;
        overflows: Array<{
            placement: Placement;
            overflows: Array<number>;
        }>;
    };
    hide?: {
        referenceHidden?: boolean;
        escaped?: boolean;
        referenceHiddenOffsets?: SideObject;
        escapedOffsets?: SideObject;
    };
    offset?: Coords & {
        placement: Placement;
    };
    shift?: Coords & {
        enabled: {
            [key in Axis]: boolean;
        };
    };
}

export declare interface MiddlewareReturn extends Partial<Coords> {
    data?: {
        [key: string]: any;
    };
    reset?: boolean | {
        placement?: Placement;
        rects?: boolean | ElementRects;
    };
}
export declare interface MiddlewareState extends Coords {
    initialPlacement: Placement;
    placement: Placement;
    strategy: Strategy;
    middlewareData: MiddlewareData;
    elements: Elements;
    rects: ElementRects;
    platform: Platform;
}

export declare interface Elements {
    reference: ReferenceElement;
    floating: FloatingElement;
}

export declare interface Platform {
    getElementRects: (args: {
        reference: ReferenceElement;
        element: Element;
        strategy: Strategy;
    }) => Promisable<ElementRects>;
    getClippingRect: (args: {
        element: any;
        boundary: Boundary;
        rootBoundary: RootBoundary;
        strategy: Strategy;
    }) => Promisable<Rect>;
    getDimensions: (element: any) => Promisable<Dimensions>;
    convertOffsetParentRelativeRectToViewportRelativeRect?: (args: {
        elements?: Elements;
        rect: Rect;
        offsetParent: any;
        strategy: Strategy;
    }) => Promisable<Rect>;
    getOffsetParent?: (element: any) => Promisable<any>;
    isElement?: (value: any) => Promisable<boolean>;
    getDocumentElement?: (element: any) => Promisable<any>;
    getClientRects?: (element: any) => Promisable<Array<ClientRectObject>>;
    isRTL?: (element: any) => Promisable<boolean>;
    getScale?: (element: any) => Promisable<{
        x: number;
        y: number;
    }>;
}
declare type Promisable<T> = T | Promise<T>;
export declare type FloatingElement = any;
export declare type Derivable<T> = (state: MiddlewareState) => T;
export declare type MiddlewareArguments = MiddlewareState;