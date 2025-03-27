export const ListContext = React.createContext<{
    register: (node: Node) => void;
    unregister: (node: Node) => void;
    map: Map<Node, number | null>;
    elementsRef: React.MutableRefObject<Array<HTMLElement | null>>;
    labelsRef?: React.MutableRefObject<Array<string | null>>;
}>({
    register: () => {},
    unregister: () => {},
    map: new Map(),
    elementsRef: {current: []},
});