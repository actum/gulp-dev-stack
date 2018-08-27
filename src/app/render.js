import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export function render(Component, container, props, store) {
  if (container) {
    if (store) {
      ReactDOM.render(
        <Provider store={store}>
          <Component {...props} />
        </Provider>,
        container,
      );
    } else {
      ReactDOM.render(<Component {...props} />, container);
    }
  }
}

export function renderFactory(Component, containers, ...args) {
  [...containers].forEach((container) => {
    render(Component, container, ...args);
  });
}
