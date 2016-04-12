export default function factory(fn, containers, ...args) {
    return [...containers].map(container => fn(container, ...args));
}
