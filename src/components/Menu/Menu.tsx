import React from "react";
import {Tree} from "@/components/Tree/Tree";
import {useParentNodeId} from "@/hooks/useParentNodeId/useParentNodeId";
import {MenuProps} from "@/components/types/menu/menu";

export const Menu = React.forwardRef<
    HTMLButtonElement,
    MenuProps & React.HTMLProps<HTMLButtonElement>
>(function MenuWrapper(props, ref) {
    const parentId = useParentNodeId();

    if (parentId === null) {
        return (
            <Tree>
                <MenuComponent {...props} ref={ref} />
            </Tree>
        );
    }

    return <MenuComponent {...props} ref={ref} />;
});