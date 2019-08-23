import React from 'react';
import {mount} from "enzyme";
import ClrHeader from "../ClrHeader";

describe('header test', () => {

  it('render without crashing', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<ClrHeader menus={[
      {name: '哈哈'},
      {name: '呵呵'},
    ]} currentIndex={0} onMenuChanged={handleChange}/>);
    // console.log(wrapper.childAt(0).find('li').at(1))
    wrapper.childAt(0).find('li').at(1).simulate('click');
    expect(handleChange).toBeCalledTimes(1);
  });
  it('render without menus', () => {
    const wrapper = mount(<ClrHeader/>);
    expect(wrapper.props().menus).toBeUndefined();
  });
});
