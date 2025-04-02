import React from "react";
import {CSS} from "@dnd-kit/utilities";
import {ComponentItem} from "@/components/types/drag";
import {componentsMap} from "@/components/drag/componentsMap";
import {useSortable} from "@dnd-kit/sortable";
interface SortableComponentItemProps {
    item: ComponentItem;
    updateSelectedItem: (item: ComponentItem) => void;
}

export const SortableComponentItem = ({
                                          item,
                                          updateSelectedItem,
                                      }: SortableComponentItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const handlerUpdate = () => {
        console.log("item:", item);
        updateSelectedItem(item);
    };

    const Component = componentsMap[item.type as ComponentItem["type"]];

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handlerUpdate}
            style={{
                padding: "10px",
                margin: "5px",
                transform: CSS.Transform.toString(transform),
                transition,
                cursor: "grab",
            }}
        >
            <Component {...item.data} >
                {item.data.children}
            </Component>
        </div>
    );
};