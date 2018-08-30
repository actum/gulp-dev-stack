import * as actions from './actions';

export default function counter(state = 1, action) {
  switch (action.type) {
    case actions.INCREMENT:
      return state + 1;

    default:
      return state;
  }
}
