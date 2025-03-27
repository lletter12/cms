import {NodeProps} from "@/components/types/tree";
import {useParentNodeId} from "@/hooks/useParentNodeId/useParentNodeId";

export const Node = (props: NodeProps) => {
    const {children, id} = props;

    const parentId = useParentNodeId();

    return (
        <FloatingNodeContext.Provider
            value={React.useMemo(() => ({id, parentId}), [id, parentId])}
        >
            {children}
        </FloatingNodeContext.Provider>
    );
}