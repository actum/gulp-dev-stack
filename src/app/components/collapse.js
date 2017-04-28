export default function collapse(container) {
    const COLLAPSE_CLASS = 'collapse';
    const COLLAPSING_CLASS = 'collapsing';
    const HIDDEN_CLASS = 'hidden';
    const ID = container.id;
    const triggers = document.querySelectorAll(`[data-target='${ID}']`);
    let isHidden = container.classList.contains(HIDDEN_CLASS);
    let height = isHidden ? container.offsetHeight : getHeight();

    if (!triggers.length) {
        return;
    }
    for (const trigger in triggers) {
        trigger && (
            trigger.addEventListener('click', (event) => {
                if (!container.classList.contains(COLLAPSING_CLASS)) {
                    isHidden ? show() : hide();
                } else {
                    event.preventDefault();
                }
            })
        );
    }

    // TODO: Add polyfill for IE9 support
    container.addEventListener('transitionend', (event) => {
        container.className = COLLAPSE_CLASS;
        container.style.height = '';

        isHidden ? container.classList.add(HIDDEN_CLASS) : container.classList.remove(HIDDEN_CLASS);
    });

    function show() {
        container.className = COLLAPSING_CLASS;
        recalculateBoxMetrics();
        container.style.height = `${height}px`;

        isHidden = !isHidden;
    }

    function hide() {
        container.style.height = `${height}px`;
        container.className = COLLAPSING_CLASS;
        recalculateBoxMetrics();
        container.style.height = '';

        isHidden = !isHidden;
    }

    function recalculateBoxMetrics() {
        container.offsetHeight;
    }

    function getHeight() {
        container.style.display = 'block';
        height = container.offsetHeight;
        container.style.display = '';

        return height;
    }
}
