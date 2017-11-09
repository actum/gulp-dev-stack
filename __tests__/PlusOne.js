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

describe('interaction', () => {
    const mockStore = configureStore();
    let wrapper;
    let connectedWrapper;
    let props;
    let store;
    let action;

    describe('click the button', () => {
        beforeEach(() => {
            store = mockStore();
            wrapper = createWrapper();
            connectedWrapper = mount(<Provider store={store}><PlusOne /></Provider>);
        });

        it('should dispatch action', () => {
            store.dispatch(increment());
            action = store.getActions();
            expect(action[0].type).toBe('INCREMENT');
        });
    });
});
