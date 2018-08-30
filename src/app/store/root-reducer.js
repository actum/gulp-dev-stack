// External modules
import { combineReducers } from 'redux';

// Parent directory modules
import counter from '../components/plus-one/reducer';

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
