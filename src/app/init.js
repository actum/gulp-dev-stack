export default function init(fn, container, ...args) {
    if (container) {
        return fn(container, ...args);
    }

    return undefined;
}
