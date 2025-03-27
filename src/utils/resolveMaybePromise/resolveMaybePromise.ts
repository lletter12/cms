export async function resolveMaybePromise<T>(value: T | Promise<T>): Promise<T> {
    return value instanceof Promise ? await value : value;
}
