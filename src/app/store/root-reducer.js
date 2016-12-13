import { combineReducers } from 'redux';
import counter from '../components/plus-one/reducer';

const rootReducer = combineReducers({
    counter
});

export default rootReducer;
