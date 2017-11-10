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

import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallowWithState, shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

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
 * example: unit testing action creator and reducer
 */
describe('unit test', () => {
    const mockStore = configureStore();
    let store;
    let action;
    let state = { counter: 1 };

    describe('increment action', () => {
        beforeEach(() => {
            store = mockStore();
        });

        it('should dispatch action increment', () => {
            store.dispatch(increment());
            action = store.getActions();
            expect(action[0].type).toBe('INCREMENT');
        });
    });

    describe('counter reducer', () => {
        beforeEach(() => {
            state = counter(state = 1, { type: 'INCREMENT' });
        });

        it('should return number increase by 1', () => {
            expect(state).toEqual(2);
        });
    });
});

/**
 * example: simple integration test
 */
describe('integration test', () => {
    let wrapper;
    let store;
    let action;
    let props;

    describe('initial render', () => {
        beforeEach(() => {
            store = createStore(rootReducer);
            wrapper = mount(<Provider store={store}><PlusOne /></Provider>);
        });

        it('should have default props', () => {
            expect(wrapper.find(PlusOne).prop('counter')).toEqual(1);
        });
    });

    describe('trigger increment action', () => {
        beforeEach(() => {
            store = createStore(rootReducer);
            store.dispatch(increment());
            props = createTestProps({ ...store.getState() });
            wrapper = mount(<Provider store={store}><PlusOne {...props} /></Provider>);
        });

        it('counter prop should be 2', () => {
            expect(wrapper.find(PlusOne).prop('counter')).toEqual(2);
        });

        it('should render + 2', () => {
            expect(wrapper.find('button').text()).toEqual('+ 2');
        });
    });
});

// ===============================================================================
/**
 * example: how to test with 'enzyme-redux'
 * source: https://github.com/knegusen/enzyme-redux
 */

describe('example shallowWithStore', () => {
    describe('state', () => {
        it('works', () => {
            const expectedState = '+ 2';

            const mapStateToProps = (state) => ({
                state
            });
            const store = createMockStore(expectedState);


            const ConnectedComponent = connect(mapStateToProps)(PlusOne);
            const component = shallowWithStore(<ConnectedComponent />, store);
            expect(component.props().state).toBe(expectedState);
        });
    });

    describe('dispatch', () => {
        it('works', () => {
            const action = {
                type: 'type'
            };
            const mapDispatchToProps = (dispatch) => ({
                dispatchProp() {
                    dispatch(action);
                }
            });
            const store = createMockStore();

            const ConnectedComponent = connect(undefined, mapDispatchToProps)(PlusOne);
            const component = shallowWithStore(<ConnectedComponent />, store);
            component.props().dispatchProp();
            expect(store.isActionDispatched(action)).toBe(true);
        });
    });
});
