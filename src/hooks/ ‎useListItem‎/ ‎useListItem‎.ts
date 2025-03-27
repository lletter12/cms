import {ListContext} from "@/components/List/ListContext";
import {useLayoutEffect} from "react";

export interface UseListItemProps {
    label?: string | null;
}

export function useListItem(props: UseListItemProps = {}): {
    ref: (node: HTMLElement | null) => void;
    index: number;
} {
    const {label} = props;

    const {register, unregister, map, elementsRef, labelsRef} =
        React.useContext(ListContext);

    const [index, setIndex] = React.useState<number | null>(null);

    const componentRef = React.useRef<Node | null>(null);

    const ref = React.useCallback(
        (node: HTMLElement | null) => {
            componentRef.current = node;

            if (index !== null) {
                elementsRef.current[index] = node;
                if (label && labelsRef) {
                    const isLabelDefined = label !== undefined;
                    labelsRef.current[index] = isLabelDefined
                        ? label
                        : node?.textContent ?? null;
                }
            }
        },
        [index, elementsRef, labelsRef, label],
    );

    useLayoutEffect(() => {
        const node = componentRef.current;
        if (node) {
            register(node);
            return () => {
                unregister(node);
            };
        }
    }, [register, unregister]);

    useLayoutEffect(() => {
        const index = componentRef.current ? map.get(componentRef.current!) : null;
        if (index != null) {
            setIndex(index);
        }
    }, [map]);

    return React.useMemo(
        () => ({
            ref,
            index: index == null ? -1 : index,
        }),
        [index, ref],
    );
}