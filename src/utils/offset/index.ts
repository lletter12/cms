import {Middleware} from "@/utils/types/extension";
import {OffsetOptions} from "@/utils/types/offset";
import {convertValueToCoords} from "@/utils/convertValueToCoords";

export const offset = (options: OffsetOptions = 0): Middleware => ({
    name: 'offset',
    options,
    async fn(state) {
        const {x, y, placement, middlewareData} = state;
        const diffCoords = await convertValueToCoords(state, options);

        // If the placement is the same and the arrow caused an alignment offset
        // then we don't need to change the positioning coordinates.
        if (
            placement === middlewareData.offset?.placement &&
            middlewareData.arrow?.alignmentOffset
        ) {
            return {};
        }

        return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
                ...diffCoords,
                placement,
            },
        };
    },
});