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
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import jsdom from 'jsdom';
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

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
    // let wrapper;
    let store;
    let action;
    let state = { counter: 1 };

    describe('test increment action', () => {
        beforeEach(() => {
            store = mockStore();
            // wrapper = mount(<Provider store={store}><PlusOne /></Provider>);
        });

        it('should dispatch action increment', () => {
            store.dispatch(increment());
            action = store.getActions();
            expect(action[0].type).toBe('INCREMENT');
        });
    });

    describe('test counter reducer', () => {
        beforeEach(() => {
            state = counter(state = 1, { type: 'INCREMENT' });
        });

        it('should increase by 1', () => {
            expect(state).toEqual(2);
        });
    });
});

// describe('interaction', () => {
//     const initialState = {};
//     const mockStore = configureStore();
//     let wrapper;
//     let connectedWrapper;
//     let store;
//     let action;

//     describe('click the button', () => {
//         beforeEach(() => {
//             store = mockStore(initialState);
//             connectedWrapper = mount(<Provider store={store}><PlusOne /></Provider>);

//             // wrapper = mount(<Provider store={store}><PlusOne /></Provider>);
//             // store.dispatch(increment());
//         });

//         it('should dispatch action increment', () => {
//             store.dispatch(increment());
//             action = store.getActions();
//             expect(action[0].type).toBe('INCREMENT');
//             console.log(connectedWrapper.find('button').text());
//             // expect(connectedWrapper.find('button').text()).toEqual('+ 2');
//             // expect(connectedWrapper.find(PlusOne).prop('counter')).toEqual(2);

//             // expect(wrapper.find('button').text()).toEqual('+ 2');
//             // expect(wrapper.find(PlusOne).prop('counter')).toEqual(2);
//         });
//     });
// });
