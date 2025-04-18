import {DependencyList, EffectCallback, useEffect, useRef} from "react";
import {getElementTarget, TargetType} from "../../utils/getElementTarget";
import {isSameDepth} from "../../utils/isSameDepth";
import {useUnmount} from "../useUnmount/useUnmount";

export const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: TargetType<any> | TargetType<any>[],
) => {
    const hasInitRef = useRef(false);

    const lastElementRef = useRef<(undefined | HTMLElement | Element | Window | Document | null)[]>([]);
    const lastDepsRef = useRef<DependencyList>([]);

    const unLoadRef = useRef<any>(null);

    useEffect(() => {
        const targets = Array.isArray(target) ? target : [target];
        const els = targets.map((item) => getElementTarget(item));

        if (!hasInitRef.current) {
            hasInitRef.current = true;
            lastElementRef.current = els;
            lastDepsRef.current = deps;

            unLoadRef.current = effect();
            return;
        }

        if (
            els.length !== lastElementRef.current.length ||
            !isSameDepth(lastElementRef.current, els) ||
            !isSameDepth(lastDepsRef.current, deps)
        ) {
            unLoadRef.current?.();

            lastElementRef.current = els;
            lastDepsRef.current = deps;
            unLoadRef.current = effect();
        }
    });

    useUnmount(() => {
        unLoadRef.current?.();
        hasInitRef.current = false;
    });
};