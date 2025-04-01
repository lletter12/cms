import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import React from "react";
import {componentsMap} from "@/components/drag/DragAndDrop";

export const SortableComponentItem = ({ item, updateSelectedItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={() => updateSelectedItem(item)}
            style={{
                padding: "10px",
                margin: "5px",
                transform: CSS.Transform.toString(transform),
                transition,
                cursor: "grab",
            }}
        >
            {componentsMap[item.type](item.data)}
        </div>
    );
}