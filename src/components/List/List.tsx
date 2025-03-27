import {ListProps} from "@/components/types/list";
import {ListContext} from "./ListContext"

export const List = (props: ListProps) => {
    const {children, elementsRef, labelsRef} = props;

    const [nodes, setNodes] = React.useState(() => new Set<Node>());

    const register = React.useCallback((node: Node) => {
        setNodes((prevSet) => new Set(prevSet).add(node));
    }, []);

    const unregister = React.useCallback((node: Node) => {
        setNodes((prevSet) => {
            const set = new Set(prevSet);
            set.delete(node);
            return set;
        });
    }, []);

    const map = React.useMemo(() => {
        const newMap = new Map<Node, number>();
        const sortedNodes = Array.from(nodes.keys()).sort(sortByDocumentPosition);

        sortedNodes.forEach((node, index) => {
            newMap.set(node, index);
        });

        return newMap;
    }, [nodes]);

    return (
        <ListContext.Provider
            value={React.useMemo(
                () => ({register, unregister, map, elementsRef, labelsRef}),
                [register, unregister, map, elementsRef, labelsRef],
            )}
        >
            {children}
        </ListContext.Provider>
    );
}