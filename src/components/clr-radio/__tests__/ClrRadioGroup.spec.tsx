import React from "react";
import {mount} from 'enzyme';
import ClrRadioGroup from "../ClrRadioGroup";
import ClrRadio from "../ClrRadio";

describe('radioGroup test', () => {
  it('render without crashing', () => {
   mount(<ClrRadioGroup/>);
  });
  it('render with value', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrRadioGroup onChange={handleChange} value={"1"}>
      <ClrRadio value={"1"}/>
      <ClrRadio value={"2"}/>
      <p>---</p>
      <ClrRadio value={"3"}/>
    </ClrRadioGroup>);
    expect(wrapper.find(ClrRadio).at(0).prop('checked')).toBeTruthy();
    expect(wrapper.find(ClrRadio).at(1).prop('checked')).toBeFalsy();
    wrapper.find(ClrRadio).at(1).find('input').simulate('change', {target: {checked:true}});
    expect(handleChange).toBeCalledTimes(1);
    expect((wrapper.find(ClrRadio).at(1).find('input').getDOMNode() as HTMLInputElement).checked).toBeTruthy();

  });

});
