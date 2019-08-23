import React from 'react';
import {mount} from "enzyme";
import ClrInput from "../ClrInput";

describe('input test', () => {

  it('render without crashing', () => {
    const wrapper = mount(<ClrInput value={"test"} placeholder="请输入用户名" type="text"/>);
    const input = wrapper.childAt(0).getDOMNode() as HTMLInputElement;
    expect(input.placeholder).toBe('请输入用户名');
    expect(input.value).toBe('test');
    expect(input.className).toBe('clr-input');
  });

  it('render lager small', () => {
    let wrapper = mount(<ClrInput size="lager" placeholder="请输入用户名" type="text"/>);
    expect(wrapper.childAt(0).hasClass('lager')).toBeTruthy();
    wrapper = mount(<ClrInput size="small" value={"test"} placeholder="请输入用户名" type="text"/>);
    expect(wrapper.childAt(0).hasClass('small')).toBeTruthy();
  });

  it('render with input', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();
    let wrapper = mount(<ClrInput onBlur={handleBlur} onChange={handleChange} size="lager" placeholder="请输入用户名" type="text"/>);
    wrapper.simulate('change',  );
    wrapper.simulate('blur',  );
    expect(handleChange).toBeCalledTimes(1);
    expect(handleBlur).toBeCalledTimes(1);
  });

});
