import {isElement} from "@/utils/isElement/isElement";
import {useLayoutEffect} from "react";
import {useId} from "@/hooks/useId/useId";
import {createAttribute} from "@/utils/createAttribute";
import {usePortalContext} from "@/hooks/usePortalContext/usePortalContext";

const attr = createAttribute('portal');

export interface UsePortalNodeProps {
    id?: string;
    root?: HTMLElement | null | React.RefObject<HTMLElement | null>;
}

export function usePortalNode(props: UsePortalNodeProps = {}) {
    const {id, root} = props;

    const uniqueId = useId();
    const portalContext = usePortalContext();

    const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);

    const portalNodeRef = React.useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        return () => {
            if(portalNode) {
                portalNode.remove();
                // Allow the subsequent layout effects to create a new node on updates.
                // The portal node will still be cleaned up on unmount.
                // https://github.com/floating-ui/floating-ui/issues/2454
                queueMicrotask(() => {
                    portalNodeRef.current = null;
                });
            }
        };
    }, [portalNode]);

    useLayoutEffect(() => {
        // Wait for the uniqueId to be generated before creating the portal node in
        // React <18 (using `useFloatingId` instead of the native `useId`).
        // https://github.com/floating-ui/floating-ui/issues/2778
        if (!uniqueId) return;
        if (portalNodeRef.current) return;
        const existingIdRoot = id ? document.getElementById(id) : null;
        if (!existingIdRoot) return;

        const subRoot = document.createElement('div');
        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');
        existingIdRoot.appendChild(subRoot);
        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [id, uniqueId]);

    useLayoutEffect(() => {
        // Wait for the root to exist before creating the portal node. The root must
        // be stored in state, not a ref, for this to work reactively.
        if (root === null) return;
        if (!uniqueId) return;
        if (portalNodeRef.current) return;

        let container = root || portalContext?.portalNode;
        if (container && !isElement(container)) container = container.current;
        container = container || document.body;

        let idWrapper: HTMLDivElement | null = null;
        if (id) {
            idWrapper = document.createElement('div');
            idWrapper.id = id;
            container.appendChild(idWrapper);
        }

        const subRoot = document.createElement('div');

        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');

        container = idWrapper || container;
        container.appendChild(subRoot);

        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [id, root, uniqueId, portalContext]);

    return portalNode;
}