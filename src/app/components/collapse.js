export default function collapse(container) {
    const COLLAPSE_CLASS = 'collapse';
    const COLLAPSING_CLASS = 'collapsing';
    const HIDDEN_CLASS = 'u-hidden';
    const ID = container.id;
    const triggers = document.querySelectorAll(`[data-target='${ID}']`);
    let isHidden = container.classList.contains(HIDDEN_CLASS);
    let height = isHidden ? getHeight() : container.offsetHeight;

    if (!triggers.length) {
        return;
    }

    for (let i = 0; i < triggers.length; i += 1) {
        triggers[i].addEventListener('click', (event) => {
            if (!container.classList.contains(COLLAPSING_CLASS)) {
                isHidden ? show() : hide();
            } else {
                event.preventDefault();
            }
        });
    }

    // TODO: Add polyfill for IE9 support
    container.addEventListener('transitionend', (event) => {
        container.className = COLLAPSE_CLASS;
        container.style.height = '';

        isHidden ? container.classList.add(HIDDEN_CLASS) : container.classList.remove(HIDDEN_CLASS);
    });

    function show() {
        container.className = COLLAPSING_CLASS;
        container.offsetHeight;
        container.style.height = `${height}px`;

        isHidden = !isHidden;
    }

    function hide() {
        container.style.height = `${height}px`;
        container.className = COLLAPSING_CLASS;
        container.offsetHeight;
        container.style.height = '';

        isHidden = !isHidden;
    }

    function getHeight() {
        container.style.display = 'block';
        height = container.offsetHeight;
        container.style.display = '';

        return height;
    }
}
