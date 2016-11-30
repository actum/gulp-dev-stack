export default function cookieLaw(container) {
    const ID = 'cookielaw=1';
    const HIDDEN_CLASS = 'u-hidden';
    const isAccepted = () => document.cookie.indexOf(ID) !== -1;

    if (isAccepted()) {
        return;
    }

    container.classList.remove(HIDDEN_CLASS);
    container.querySelector('.js-button').addEventListener('click', () => {
        document.cookie = `${ID}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        container.classList.add(HIDDEN_CLASS);
    });
}
