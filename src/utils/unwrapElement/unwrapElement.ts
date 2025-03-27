import {VirtualElement} from "../types/element";
import {isElement} from "@/utils/isElement/isElement";

export function unwrapElement(element: Element | VirtualElement) {
    return !isElement(element) ? element.contextElement : element;
}