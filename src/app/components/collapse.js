export default function collapse(container) {
    const ID = container.id;
    const triggers = document.querySelectorAll(`[data-target='${ID}']`);

    if (!triggers.length) {
        return;
    }

    /* classes */
    const COLLAPSE_CLASS = 'collapse';
    const COLLAPSING_CLASS = 'collapsing';
    const HIDDEN_CLASS = 'u-hidden';

    /* state */
    let isHidden = container.classList.contains(HIDDEN_CLASS);
    let height = isHidden ? getHeight() : container.offsetHeight;

    const handleClick = (event) => {
        container.classList.contains(COLLAPSING_CLASS) ? event.preventDefault() : (
            isHidden ? show() : hide()
        );
    };

    for (let i = 0; i < triggers.length; i += 1) {
        triggers[i].addEventListener('click', handleClick);
    }

    // TODO: Add polyfill for IE9 support
    // TODO: Handle active class for multiple triggers
    container.addEventListener('transitionend', (event) => {
        container.className = COLLAPSE_CLASS;
        isHidden ? (
            container.classList.add(HIDDEN_CLASS),
            triggers[0].classList.remove('active')
        ) : (
            container.classList.remove(HIDDEN_CLASS),
            triggers[0].classList.add('active')
        );
        container.style.height = null;
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
        container.style.height = null;

        isHidden = !isHidden;
    }

    function getHeight() {
        container.style.visibility = 'hidden';
        container.style.position = 'absolute';
        container.style.display = 'block';
        height = container.offsetHeight;
        container.style.display = null;
        container.style.position = null;
        container.style.visibility = null;

        return height;
    }
}
