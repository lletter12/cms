import {useLayoutEffect} from "react";

let serverHandoffComplete = false;
let count = 0;
const genId = () =>
    // on <React 18
    `floating-ui-${Math.random().toString(36).slice(2, 6)}${count++}`;

function useIdWithLayoutEffect(): string | undefined {
    const [id, setId] = React.useState(() =>
        serverHandoffComplete ? genId() : undefined,
    );

    useLayoutEffect(() => {
        if (id == null) {
            setId(genId());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        serverHandoffComplete = true;
    }, []);

    return id;
}

const useReactId = React.useId as () => string | undefined;

/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 * @see https://floating-ui.com/docs/react-utils#useid
 */
export const useId = useReactId || useIdWithLayoutEffect;