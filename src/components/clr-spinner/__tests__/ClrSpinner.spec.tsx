import React from 'react';
import {mount} from "enzyme";
import ClrSpinner from "../ClrSpinner";
describe('sidebar test', () => {

  it('render without crashing', () => {
    mount(<ClrSpinner/>);
  });
  it('render with size', () => {
    let wrapper = mount(<ClrSpinner size={"lager"}/>);
    expect(wrapper.hasClass('lager'));
    wrapper = mount(<ClrSpinner size={"small"}/>);
    expect(wrapper.hasClass('small'));
  });
});
