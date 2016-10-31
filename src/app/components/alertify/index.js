export const name = 'alertify';

export default {
    init(container) {
        container.addEventListener('click', () => {
            alert('You clicked alertify element!');
        });
    }
};
