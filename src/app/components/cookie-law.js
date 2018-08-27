import { states } from '../constants';

export default class Cookie {
  constructor(container) {
    this.container = container;
    this.cookieBtn = this.container.querySelector('.js-cookie-btn');
    this.cookieName = this.container.getAttribute('data-cookie-name');
    this.cookieValue = this.container.getAttribute('data-cookie-value');
    this.cookie = `${this.cookieName}=${this.cookieValue}`;
    this.isAccepted = () => document.cookie.includes(this.cookie);

    this.cookieBtn.addEventListener('click', this.createCookie);

    if (this.isAccepted()) return;

    this.container.classList.remove(states.hidden);
  }

  /**
   * Create cookie for 60 days
   */
  createCookie = () => {
    const expDate = new Date();

    expDate.setTime(expDate.getTime() + 3600000 * 24 * 60); // Set cookie for 60 days
    document.cookie = `${
      this.cookie
    }; expires=${expDate.toUTCString()}; path=/`;
    this.container.classList.add(states.hidden);
  };
}
