import {TreeNodeProps} from "@/components/types/tree";

const NodeContext = React.createContext<TreeNodeProps | null>(null);
export const useParentNodeId = (): string | null =>
    React.useContext(NodeContext)?.id || null;