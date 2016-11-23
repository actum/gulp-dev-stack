/**
 * Factory function pattern is preferred over classes
 * See https://youtu.be/ImwrezYhw4w
 *
 * Usage: const myAlertifier = Alertifier(document.querySelector('#myAlertifier'));
 */

const defaultOptions = {
    disclaimer: 'Disclaimer…',
    buttonLabel: 'OK…'
};

const CookiesBar = (parent, options = defaultOptions) => {
    const COOKIE_KEY = 'COOKIES_ACCEPTED';

    function getCookie() {
        const pattern = new RegExp(`(?:(?:^|.*;s*)${COOKIE_KEY}s*=s*([^;]*).*$)|^.*$`);
        return document.cookie.replace(pattern, '$1');
    }

    function setCookie() {
        // todo expires https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        document.cookie = `${COOKIE_KEY}=true;expires=TODO`;
    }

    function renderBar() {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary float-xs-right';
        button.setAttribute('type', 'button');
        button.textContent = options.buttonLabel;
        // TODO add event listener to dismiss and create cookie
        button.addEventListener('click', () => {
            console.log('dismiss clicked');
            setCookie();
        });

        const bar = document.createElement('div');
        bar.className = 'alert alert-info pos-f-t';
        bar.setAttribute('role', 'alert');
        bar.textContent = options.disclaimer;
        bar.appendChild(button);

        document.body.appendChild(bar);
    }

    if (getCookie()) {
        renderBar();
    }
};

export default CookiesBar;
