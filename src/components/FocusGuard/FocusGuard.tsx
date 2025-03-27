import React, {useLayoutEffect} from "react";
import {createAttribute} from "@/utils/createAttribute";
import {isSafari} from "@/utils/dom";

export const HIDDEN_STYLES: React.CSSProperties = {
    border: 0,
    clipPath: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: '1px',
    top: 0,
    left: 0,
};

export const FocusGuard = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
    (props, ref) => {
        const [role, setRole] = React.useState<'button' | undefined>();

        useLayoutEffect(() => {
            if (typeof window !== 'undefined' && isSafari()) {
                setRole('button');
            }
        }, []);

        return (
            <span
                {...props}
                ref={ref}
                tabIndex={0}
                role={role}
                aria-hidden={role ? undefined : true}
                {...{ [createAttribute('focus-guard')]: '' }}
                style={HIDDEN_STYLES}
            />
        );
    }
);
