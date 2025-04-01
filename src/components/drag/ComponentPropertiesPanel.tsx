import React from "react";

interface ComponentPropertiesPanelProps {
    selectedItem : any
    updateItem: (any, p: { text: string }) => void
}

export const ComponentsPropertiesPanel = ({ selectedItem, updateItem }: ComponentPropertiesPanelProps) => {
    if (!selectedItem) return <div>속성을 수정할 컴포넌트를 선택하세요.</div>;

    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            <h4>컴포넌트 속성 수정</h4>
            {selectedItem.type === "Button" && (
                <div>
                    <label>버튼 텍스트:</label>
                    <input
                        type="text"
                        value={selectedItem.data.text}
                        onChange={(e) => updateItem(selectedItem.id, { text: e.target.value })}
                    />
                </div>
            )}

            {selectedItem.type === "Input" && (
                <div>
                    <label>Placeholder:</label>
                    <input
                        type="text"
                        value={selectedItem.data.placeholder}
                        onChange={(e) => updateItem(selectedItem.id, {text: e.target.value})}
                    />
                </div>
            )}
        </div>
    );
}
