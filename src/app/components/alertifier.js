export default function Alertifier(container) {
    function init() {
        container.addEventListener('click', handleClick);
    }

    function destroy() {
        container.removeEventListener('click', handleClick);
    }

    function handleClick(e) {
        alert(`Gotcha! ${e.target.href}`);

        e.preventDefault();
    }

    init();

    return {
        destroy
    };
}
