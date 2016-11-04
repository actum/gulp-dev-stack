/**
 * Shared constant – can be used in other modules
 *
 * Usage: import { SALUTATION } from './alertifier';
 */
export const SALUTATION = 'Hey!';

/**
 * Factory function pattern is preferred over classes
 * See https://youtu.be/ImwrezYhw4w
 *
 * Usage: const myAlertifier = Alertifier(document.querySelector('#myAlertifier'));
 */
const Alertifier = (container) => {
    // Public constant (exposed in returned object)
    const EVENT = 'click';

    // Private constants
    const MESSAGE_BEFORE = 'You clicked';
    const MESSAGE_AFTER = 'To make buttons work again, run app.alertifiers[<index of the button>].destroy() in the console.';

    container.addEventListener(EVENT, handleClick);

    // Public method (exposed in returned object)
    // Usage: myAlertifier.destroy();
    function destroy() {
        container.removeEventListener(EVENT, handleClick);
    }

    // Private method
    function handleClick(e) {
        /* eslint no-alert: 0 */
        alert(`${SALUTATION}\n${MESSAGE_BEFORE} ${e.target.href}\n\n${MESSAGE_AFTER}`);

        e.preventDefault();
    }

    return {
        EVENT,
        destroy
    };
};

export default Alertifier;
