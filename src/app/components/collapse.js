export default function collapse(container) {
    const COLLAPSE_CLASS = 'collapse';
    const COLLAPSING_CLASS = 'collapsing';
    const SHOW_CLASS = 'show';
    const ID = container.id;
    const triggers = document.querySelectorAll(`[data-target='${ID}']`);
    const isOpen = () => container.classList.contains(SHOW_CLASS);
    let height = isOpen() ? container.offsetHeight : getHeight();

    if (!triggers.length) {
        return;
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            if (!container.classList.contains(COLLAPSING_CLASS)) {
                isOpen() ? hide() : show();
            }
        });
    });

    // TODO: Add polyfill for IE9 support
    container.addEventListener('transitionend', () => {
        container.classList.add(COLLAPSE_CLASS);
        container.classList.remove(COLLAPSING_CLASS);
        container.style.height = '';

        isOpen() ? container.classList.remove(SHOW_CLASS) : container.classList.add(SHOW_CLASS);
    });

    function show() {
        container.classList.add(COLLAPSING_CLASS);
        container.classList.remove(COLLAPSE_CLASS);
        setTimeout(() => {
            container.style.height = `${height}px`;
        }, 1);
    }

    function hide() {
        container.style.height = `${height}px`;
        container.classList.add(COLLAPSING_CLASS);
        container.classList.remove(COLLAPSE_CLASS);
        setTimeout(() => {
            container.style.height = '';
        }, 1);
    }

    function getHeight() {
        container.style.display = 'block';
        height = container.offsetHeight;
        container.style.display = '';

        return height;
    }
}
