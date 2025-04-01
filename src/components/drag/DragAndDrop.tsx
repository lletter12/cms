"use client"

import React, {useState} from "react";
import {closestCenter, DndContext} from "@dnd-kit/core";

import {
    Alert,
    Avatar,
    AvatarText,
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    Modal,
    ResponsiveImage,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    ThreeColumnImageGrid,
    TwoColumnImageGrid,
    ButtonProps,
    BadgeProps
} from "@/components/ui";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {ComponentsPropertiesPanel} from "@/components/drag/ComponentPropertiesPanel";
import {SortableComponentItem} from "@/components/drag/SortableComponentItem";
import {ExportComponentButton} from "@/components/drag/ExportComponentButton";

export const componentsMap = {
    Badge,
    Button,
}

export const DragAndDrop = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const updateItem = (id, newData) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? {...item, data: {...item.data, ...newData}} : item))
        );
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;
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
                <div className={"flex justify-between gap-3.5"}>
                    {/* 드래그 가능한 컴포넌트 목록 */}
                    <div className={"flex flex-col items-center justify-center outline outline-solid outline-gray-500 rounded-sm w-68 p-7.5 gap-3.5"}>
                        <Button
                            onClick={() =>
                                setItems((prev) => [...prev, {
                                    id: `item-${Date.now()}`,
                                    type: "Button",
                                    data: {text: "Click Me"}
                                }])
                            }
                        >
                            + 버튼 추가
                        </Button>
                        <Badge
                            onClick={() =>
                                setItems((prev) => [...prev, {
                                    id: `item-${Date.now()}`,
                                    type: "Badge",
                                    data: {text: "Click Me"}
                                }])
                            }
                        >
                            + 뱃지 추가
                        </Badge>
                    </div>

                    {/* 드롭 영역 */}
                    <div className={"outline outline-dashed  outline-gray-300 p-5 rounded-sm w-full pl-12.5"}>
                        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                            {items.map((item) => (
                                <SortableComponentItem key={item.id} item={item} updateSelectedItem={setSelectedItem}/>
                            ))}
                        </SortableContext>
                    </div>

                </div>
                <div className={"flex mt-5 outline outline-solid outline-gray-500 rounded-sm p-5 font-bold text-gray-800 text-sm dark:text-white/90"}>
                    {/* 속성 편집 패널 */}
                    <ComponentsPropertiesPanel selectedItem={selectedItem} updateItem={updateItem}/>
                </div>
            </DndContext>
            <ExportComponentButton items={items}/>
        </>
    );
};