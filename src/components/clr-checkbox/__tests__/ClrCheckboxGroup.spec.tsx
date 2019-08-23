import React from "react";
import {mount, shallow} from 'enzyme';
import ClrCheckboxGroup from "../ClrCheckboxGroup";
import ClrCheckbox from "../ClrCheckbox";

describe('checkboxGroup test', () => {
  it('render without crashing', () => {
   mount(<ClrCheckboxGroup/>);
  });
  it('render with value', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrCheckboxGroup onChange={handleChange} value={[1, 2]}>
      <ClrCheckbox value={1}/>
      <ClrCheckbox value={2}/>
      <p>---</p>
      <ClrCheckbox value={3}/>
    </ClrCheckboxGroup>);
    expect(wrapper.find(ClrCheckbox).at(0).prop('checked')).toBeTruthy();
    expect(wrapper.find(ClrCheckbox).at(1).prop('checked')).toBeTruthy();
    expect(wrapper.find(ClrCheckbox).at(2).prop('checked')).toBeFalsy();
    wrapper.find(ClrCheckbox).at(1).find('input').simulate('change', {target: {checked:false}});
    expect(handleChange).toBeCalledTimes(1);
    wrapper.find(ClrCheckbox).at(2).find('input').simulate('change', {target: {checked:true}});
    expect(handleChange).toBeCalledTimes(2);
    wrapper.find(ClrCheckbox).at(1).find('input').simulate('change', {target: {checked:false}, value:4});
    expect(handleChange).toBeCalledTimes(3);
  });

});
