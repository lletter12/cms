import {useId, useLayoutEffect} from "react";
import {useParentNodeId} from "@/hooks/useParentNodeId/useParentNodeId";
import {useTree} from "@/hooks/useTree/useTree";

export function useNodeId(customParentId?: string): string | undefined {
    const id = useId();
    const tree = useTree();
    const reactParentId = useParentNodeId();
    const parentId = customParentId || reactParentId;

    useLayoutEffect(() => {
        if (!id) return;
        const node = {id, parentId};
        tree?.addNode(node);
        return () => {
            tree?.removeNode(node);
        };
    }, [tree, id, parentId]);

    return id;
}