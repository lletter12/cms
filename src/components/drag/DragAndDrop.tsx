"use client"

import React, { useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Badge } from "@/components/ui";
import { ComponentsPropertiesPanel } from "@/components/drag/ComponentPropertiesPanel";
import { SortableComponentItem } from "@/components/drag/DraggableComponentItem";
import { ExportComponentButton } from "@/components/drag/ExportComponentButton";
import { ComponentItem } from "@/components/types/drag";

export const DragAndDrop = () => {
    const [items, setItems] = useState<ComponentItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ComponentItem | null>(null);

    const updateItem = (id: string, newData: Partial<ComponentItem["data"]>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, data: { ...item.data, ...newData } } : item))
        );
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== newIndex) {
            setItems((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

    return (
        <>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="flex justify-between gap-3.5">
                    {/* 드래그 가능한 컴포넌트 목록 */}
                    <div className="flex flex-col items-center justify-center outline outline-solid outline-gray-500 rounded-sm w-68 p-7.5 gap-3.5">
                        <Button
                            onClick={() =>
                                setItems((prev) => [
                                    ...prev,
                                    { id: `item-${Date.now()}`, type: "Button", data: { children: "Click Me" }},
                                ])
                            }
                        >
                            + 버튼 추가
                        </Button>
                        <Button
                            onClick={() =>
                                setItems((prev) => [
                                    ...prev,
                                    { id: `item-${Date.now()}`, type: "Badge", data: { children: "New Badge" } },
                                ])
                            }
                        >
                            + 뱃지 추가
                        </Button>
                    </div>

                    <div className="outline outline-dashed outline-gray-300 p-5 rounded-sm w-full pl-12.5 h-85">
                        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            {items.map((item) => (
                                <SortableComponentItem key={item.id} item={item} updateSelectedItem={setSelectedItem} />
                            ))}
                        </SortableContext>
                    </div>
                </div>

                <div className="flex mt-5 outline outline-solid outline-gray-500 rounded-sm p-5 font-bold text-gray-800 text-sm dark:text-white/90">
                    <ComponentsPropertiesPanel
                        selectedItem={selectedItem}
                        updateItem={updateItem}
                    />
                </div>
            </DndContext>

            <ExportComponentButton items={items} />
        </>
    );
};
