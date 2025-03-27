import objectsToArray from "../objectsToArray/objectsToArray";

export default function objectsToString(object) {
    return objectsToArray(object).join(" ");
}