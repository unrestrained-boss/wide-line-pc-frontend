import React from 'react';
import {mount} from "enzyme";
import ClrSwitch from "../ClrSwitch";

describe('switch test', () => {

  it('render without crashing', () => {
    const handleChange = jest.fn();
    const wrapper =  mount(<ClrSwitch/>);
    expect(wrapper.childAt(0).hasClass('clr-switch')).toBeTruthy();
    wrapper.find('input').simulate('change');
    expect(handleChange).not.toBeCalled();
  });
  it('render with value disabled', () => {
    const wrapper =  mount(<ClrSwitch disabled={true} value={true}/>);
    expect(wrapper.childAt(0).hasClass('clr-switch')).toBeTruthy();
    expect(wrapper.childAt(0).hasClass('clr-switch-on')).toBeTruthy();
  });
  it('render with onChange', () => {
    const handleChange = jest.fn();
    const wrapper =  mount(<ClrSwitch onChange={handleChange} value={true}/>);
    wrapper.find('input').simulate('change');
    expect(handleChange).toBeCalledTimes(1);
    wrapper.find('input').simulate('change');
    expect(handleChange).toBeCalledTimes(2);
  });
});
