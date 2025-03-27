import {TreeNodeType, TreeProps} from "@/components/types/tree";
import {createPubSub} from "@/utils/createPubSub";
import {TreeContext} from "./TreeContext"
import React from "react";

export const Tree = (props: TreeProps) => {
    const {children} = props;

    const nodesRef = React.useRef<Array<TreeNodeType>>([]);

    const addNode = React.useCallback((node: TreeNodeType) => {
        nodesRef.current = [...nodesRef.current, node];
    }, []);

    const removeNode = React.useCallback((node: TreeNodeType) => {
        nodesRef.current = nodesRef.current.filter((n) => n !== node);
    }, []);

    const events = React.useState(() => createPubSub())[0];

    return (
        <TreeContext.Provider
            value={React.useMemo(
                () => ({
                    nodesRef,
                    addNode,
                    removeNode,
                    events,
                }),
                [addNode, removeNode, events],
            )}
        >
            {children}
        </TreeContext.Provider>
    );
}