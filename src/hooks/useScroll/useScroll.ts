import {getElementTarget, TargetType} from "@/utils/getElementTarget/getElementTarget";
import {useEffectWithTarget} from "../useEffectWithTarget/useEffectWithTarget.ts";
import {useAnimationFrameState} from "../useAnimationFrameState/useAnimationFrameState.ts";
import {usePrevious} from "@/hooks/usePrevious/usePrevious";


type Position = { left: number; top: number };
export type Target = TargetType<Element | Window | Document>;
export type ScrollListenController = (val: Position) => boolean;

export const useScroll = (
    target?: Target,
    shouldUpdate: ScrollListenController = () => true,
): Position | undefined => {
    const [position, setPosition] = useAnimationFrameState<Position>();

    const shouldUpdateRef = usePrevious(shouldUpdate);

    useEffectWithTarget(
        () => {
            const el = getElementTarget<Document>(target as TargetType<Document> | undefined, document) as Document | null;
            if (!el) {
                return;
            }
            const updatePosition = () => {
                let newPosition: Position;
                if (el === document) {
                    if (document.scrollingElement) {
                        newPosition = {
                            left: document.scrollingElement.scrollLeft,
                            top: document.scrollingElement.scrollTop,
                        };
                    } else {

                        newPosition = {
                            left: Math.max(
                                window.scrollX,
                                document.documentElement.scrollLeft,
                                document.body.scrollLeft,
                            ),
                            top: Math.max(
                                window.scrollY,
                                document.documentElement.scrollTop,
                                document.body.scrollTop,
                            ),
                        };
                    }
                } else {
                    newPosition = {
                        left: (el as Element).scrollLeft,
                        top: (el as Element).scrollTop,
                    };
                }
                if (shouldUpdateRef && shouldUpdateRef(newPosition)) {
                    setPosition(newPosition);
                }
            };

            updatePosition();

            el.addEventListener('scroll', updatePosition);
            return () => {
                el.removeEventListener('scroll', updatePosition);
            };
        }, [], target);

    return position;
}