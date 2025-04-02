import {getElementTarget, TargetType} from "@/utils/getElementTarget";
import {useEffectWithTarget} from "../useEffectWithTarget/useEffectWithTarget";
import {useAnimationFrameState} from "../useAnimationFrameState/useAnimationFrameState";
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
            const el = getElementTarget<Document>(target as TargetType<Document> | undefined, document) as Document | Element |null;
            if (!el) {
                return;
            }
            const updatePosition = () => {
                let newPosition: Position = { left: 0, top: 0 };
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
                    if (el instanceof Element) {
                        newPosition = {
                            left: el.scrollLeft,
                            top: el.scrollTop,
                        };
                    }
                }
                if (shouldUpdateRef && shouldUpdateRef(newPosition)) {
                    setPosition(newPosition);
                }
            };

            updatePosition();

            if (el instanceof Element) {
                // `el`이 `Element`일 경우
                el.addEventListener("scroll", updatePosition);

                return () => {
                    el.removeEventListener("scroll", updatePosition);
                };
            } else if (el === document) {
                // `el`이 `document`일 경우
                document.addEventListener("scroll", updatePosition);

                return () => {
                    document.removeEventListener("scroll", updatePosition);
                };
            }

        }, [], target);

    return position;
}