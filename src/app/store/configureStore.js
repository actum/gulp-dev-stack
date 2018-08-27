// External modules
import { createStore } from 'redux';

// Sibling modules from the same directory
import rootReducer from './root-reducer';

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */
}
