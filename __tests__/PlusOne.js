// import React from 'react';
// import { PlusOne } from '../src/app/components/plus-one/PlusOne';
// import { render, shallow } from 'enzyme';
// import sinon from 'sinon';

// describe('<PlusOne /> component', () => {
//     const incrementSpy = sinon.spy();

//     let wrapper = shallow(
//         <PlusOne increment={incrementSpy.bind(this)} />
//     );

//     it('Should PlusOne button have right text', () => {
//         expect(wrapper.find('p').children().text()).toBe('+ 1');
//     });

//     it('Should PlusOne button change text after click', () => {
//         expect(incrementSpy.calledOnce).toBe(false);

//         wrapper.find('button').last().simulate('click');
//         expect(incrementSpy.calledOnce).toBe(true);

//         wrapper.update();

//         // ToDo: fix :-)
//         expect(wrapper.find('p').children().text()).toEqual('+ 2');
//     });
// });

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallowWithState } from 'enzyme-redux';

import { PlusOne } from '../src/app/components/plus-one/PlusOne';
import { increment } from './../src/app/components/plus-one/actions';
import counter from './../src/app/components/plus-one/reducer';
import rootReducer from './../src/app/store/root-reducer';

/**
 * @param {object} props
 * @return {object}
 */
const createTestProps = props => ({
    counter: 1,
    ...props
});

/**
 * @param {object} props
 * @return {wrapper} contains shallow component
 */
const createWrapper = props => shallow(<PlusOne {...props} />);

/**
 * example: shallow unit testing example
 */
describe('redering', () => {
    let wrapper;

    beforeEach(() => {
        const props = createTestProps();
        wrapper = createWrapper(props);
    });

    it('should render a <PlusOne />', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should have label + 1', () => {
        expect(wrapper.find('button').text()).toEqual('+ 1');
    });
});

/**
 * example: unit testing with connected component in <Provider /> and full render:
 */
describe('interaction', () => {
    const mockStore = configureStore();
    let store;
    let action;
    let state = { counter: 1 };

    describe('trigger increment action', () => {
        beforeEach(() => {
            store = mockStore();
        });

        it('should dispatch action increment', () => {
            store.dispatch(increment());
            action = store.getActions();
            expect(action[0].type).toBe('INCREMENT');
        });
    });

    describe('counter reducer => increase by 1', () => {
        beforeEach(() => {
            state = counter(state = 1, { type: 'INCREMENT' });
        });

        it('should return 2', () => {
            expect(state).toEqual(2);
        });
    });
});

// ============================================================================
// describe('interaction', () => {
//     const initialState = {};
//     let wrapper;
//     let store;
//     let action;

//     describe('click the button', () => {
//         beforeEach(() => {
//             store = createStore(rootReducer, initialState);
//             wrapper = mount(<Provider store={store}><PlusOne /></Provider>);
//         });

//         it('should dispatch action increment', (done) => {
//             store.dispatch(increment());
//             // expect(connectedWrapper.find('button').text()).toEqual('+ 2');
//             // expect(connectedWrapper.find(PlusOne).prop('counter')).toEqual(2);
//             expect(wrapper.find(PlusOne).prop('counter')).toEqual(2);
//             // expect(wrapper.find('button').text()).toEqual('+ 2');
//         });
//     });
// });

// ============================================================================

// /**
//  * source:
//  * https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
//  */

//  /* Sets up basic variables to be used by integration tests
//  * Params:
//  *   reducers: should be an object with all the reducers your page uses
//  *   initialRouterState: an optional object to set as the initial state for the router
//  * Returns:
//  *   an object with the following attributes:
//  *     store: the reducer store which contains the main dispatcher and the state
//  *     dispatchSpy: a jest spy function to be used on assertions of dispatch action calls
//  */

// function setupIntegrationTest(reducers, initialRouterState = {}) {
//     // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
//     const dispatchSpy = jest.fn(() => ({}));
//     const reducerSpy = (state, action) => dispatchSpy(action);

//     // applying thunk middleware to the the store
//     const emptyStore = applyMiddleware(thunk)(createStore);

//     const combinedReducers = combineReducers({
//         reducerSpy,
//         ...reducers
//     });

//     // creating the store
//     const store = emptyStore(combinedReducers);

//     return { store, dispatchSpy };
// }

// describe('integration tests', () => {
//     let store;
//     let dispatchSpy;
//     let wrapper;

//     beforeEach(() => {
//         ({ store, dispatchSpy } = setupIntegrationTest({ counter }));
//         // wrapper = mount(
//         //     <Provider store={store}>
//         //         <PlusOne increment={increment} />
//         //     </Provider>
//         // );
//     });

//     it('should change the text on click', () => {
//         const wrapper = mount(
//             <Provider store={store}>
//                 <PlusOne increment={increment.bind(this)} />
//             </Provider>
//         );

//         wrapper.find('button').simulate('click');
//         store.dispatch({ type: 'INCREMENT' });
//         wrapper.update();

//         expect(wrapper.find('button').text()).toEqual('+ 2');
//         // expect(wrapper.find('button').prop('children')).toEqual('+ 2');
//         // console.log(store.getState().counter);
//         // expect(store.getState().counter).toEqual('+ 2');
//     });
// });

// ============================================================================
/**
 * example: simple integration test
 */
describe('integration', () => {
    let wrapper;
    let store;
    let action;
    let props;

    describe('click the button', () => {
        beforeEach(() => {
            store = createStore(rootReducer);
            store.dispatch(increment());
            props = createTestProps({ ...store.getState() });
            wrapper = createWrapper(props);
        });

        it('should render with counter prop increase by 1', () => {
            expect(wrapper.find('button').text()).toEqual('+ 2');
        });
    });
});
