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
export default Alertifier = (container) => {
    // Public constant (exposed in returned object)
    const EVENT = 'click';

    // Private constants
    const MESSAGE_BEFORE = 'You clicked';
    const MESSAGE_AFTER = 'To make buttons work again, run app.alertifiers[<index of the button>].destroy() in the console.';

    container.addEventListener(EVENT, handleClick);

    // Public method (exposed in returned object)
    // Usage: myAlertifier.destroy();
    const destroy = ()  => {
        container.removeEventListener(EVENT, handleClick);
    };

    // Private method
    const handleClick = (e) => {
        alert(`${SALUTATION}\n${MESSAGE_BEFORE} ${e.target.href}\n\n${MESSAGE_AFTER}`);

        e.preventDefault();
    };

    return {
        EVENT,
        destroy
    };
};
