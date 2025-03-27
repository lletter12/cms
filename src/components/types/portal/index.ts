export interface PortalProps {
    children?: React.ReactNode;
    /**
     * Optionally selects the node with the id if it exists, or create it and
     * append it to the specified `root` (by default `document.body`).
     */
    id?: string;
    /**
     * Specifies the root node the portal container will be appended to.
     */
    root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
    /**
     * When using non-modal focus management using `FloatingFocusManager`, this
     * will preserve the tab order context based on the React tree instead of the
     * DOM tree.
     */
    preserveTabOrder?: boolean;
}