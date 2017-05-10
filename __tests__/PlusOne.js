import React from 'react';
import { PlusOne } from '../src/app/components/plus-one/PlusOne';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';

describe('<PlusOne /> component', () => {
    const incrementSpy = sinon.spy();

    let wrapper = shallow(
        <PlusOne increment={incrementSpy.bind(this)} />
    );

    it('Should PlusOne button have right text', () => {
        expect(wrapper.find('p').children().text()).toBe('+ 1');
    });

    it('Should PlusOne button change text after click', () => {
        expect(incrementSpy.calledOnce).toBe(false);

        wrapper.find('button').last().simulate('click');
        expect(incrementSpy.calledOnce).toBe(true);

        wrapper.update();

        expect(wrapper.find('p').children().text()).toBe('+ 2');
    });
});
