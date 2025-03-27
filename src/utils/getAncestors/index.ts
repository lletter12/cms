import {ReferenceType} from "@/components/types/menu/menu";
import {TreeNodeType} from "@/components/types/tree";

export function getAncestors<RT extends ReferenceType = ReferenceType>(
    nodes: Array<TreeNodeType<RT>>,
    id: string | undefined,
) {
    let allAncestors: Array<TreeNodeType<RT>> = [];
    let currentParentId = nodes.find((node) => node.id === id)?.parentId;

    while (currentParentId) {
        const currentNode = nodes.find((node) => node.id === currentParentId);
        currentParentId = currentNode?.parentId;

        if (currentNode) {
            allAncestors = allAncestors.concat(currentNode);
        }
    }

    return allAncestors;
}