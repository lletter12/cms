import {FocusManagerState} from "@/components/types/focus";

export const PortalContext = React.createContext<null | {
    preserveTabOrder: boolean;
    portalNode: HTMLElement | null;
    setFocusManagerState: React.Dispatch<React.SetStateAction<FocusManagerState>>;
    beforeInsideRef: React.RefObject<HTMLSpanElement>;
    afterInsideRef: React.RefObject<HTMLSpanElement>;
    beforeOutsideRef: React.RefObject<HTMLSpanElement>;
    afterOutsideRef: React.RefObject<HTMLSpanElement>;
}>(null);