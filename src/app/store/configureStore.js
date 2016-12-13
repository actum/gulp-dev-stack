import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';

export default function configureStore(initialState) {
    /* eslint-disable no-underscore-dangle */
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    /* eslint-enable */
}
