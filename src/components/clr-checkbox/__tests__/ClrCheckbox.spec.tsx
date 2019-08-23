import React from "react";
import {mount} from 'enzyme';
import ClrCheckbox from "../ClrCheckbox";

describe('checkbox test', () => {
  it('render without crashing', () => {
    const wrapper = mount(<ClrCheckbox/>);
    expect(wrapper.find('input')).not.toBeUndefined();
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).checked).toBeFalsy();
  });
  it('render with value checked', () => {
    const wrapper = mount(<ClrCheckbox value={1} checked={true}/>);
    expect(wrapper.find('input')).not.toBeUndefined();
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).checked).toBeTruthy();
  });
  it('render with onChange disabled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrCheckbox disabled={true} onChange={handleChange}/>);
    expect(wrapper.prop('onChange')).toEqual(handleChange);
    expect(wrapper.prop('disabled')).toBeTruthy();
  });
  it('check handleLabelClick toBeCalled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrCheckbox disabled={false} onChange={handleChange}/>);
    wrapper.find('input').simulate('change', false);
    expect(handleChange).toBeCalledTimes(1);
    wrapper.find('input').simulate('change', true);
    expect(handleChange).toBeCalledTimes(2);
  });

  it('check handleLabelClick not toBeCalled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrCheckbox disabled={false}/>);
    wrapper.find('input').simulate('change', false);
    expect(handleChange).toBeCalledTimes(0);
  });

});
