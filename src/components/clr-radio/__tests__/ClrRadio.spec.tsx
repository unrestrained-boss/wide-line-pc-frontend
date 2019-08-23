import React from 'react';
import {mount} from "enzyme";
import ClrRadio from "../ClrRadio";

describe('radio test', () => {

  it('render without crashing', () => {
    const wrapper = mount(<ClrRadio/>);
    wrapper.find('input').simulate('change');
  });

  it('render with disabled checked', () => {
    const wrapper = mount(<ClrRadio disabled={true} checked={true}/>);
    wrapper.find('input').simulate('change');
  });
  it('render with onChange', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrRadio onChange={handleChange} checked={true}/>);
    wrapper.find('input').simulate('change');
    expect(handleChange).toBeCalledTimes(1);
  });
});
