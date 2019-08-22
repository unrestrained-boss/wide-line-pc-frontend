// @ts-ignore
import React from "react";
import {shallow, mount} from 'enzyme';
import ClrButton from "../ClrButton";

describe('button test', () => {
  it('render without crashing', () => {
    const wrapper = shallow(<ClrButton>按钮</ClrButton>);
    expect(wrapper.text()).toBe('按钮');
    expect(wrapper.type()).toBe('button');
    expect(wrapper.hasClass('clr-button')).toBe(true);
  });

  it('render with type', () => {
    let wrapper = shallow(<ClrButton type="primary">按钮</ClrButton>);
    expect(wrapper.hasClass('clr-button-primary')).toBe(true);
    wrapper = shallow(<ClrButton type="success" nativeType="submit">按钮</ClrButton>);
    expect(wrapper.hasClass('clr-button-success')).toBe(true);
    wrapper = shallow(<ClrButton type="danger" nativeType="submit">按钮</ClrButton>);
    expect(wrapper.hasClass('clr-button-danger')).toBe(true);
    wrapper = shallow(<ClrButton type="warning" nativeType="submit">按钮</ClrButton>);
    expect(wrapper.hasClass('clr-button-warning')).toBe(true);
  });

  it('render with native type', () => {
    const wrapper = mount(<ClrButton nativeType="submit">按钮</ClrButton>);
    expect(wrapper.childAt(0).getDOMNode().getAttribute('type')).toBe('submit');
  });

  it('render with disabled', () => {
    let wrapper = mount(<ClrButton disabled={false}>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeFalsy();
    wrapper = mount(<ClrButton>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeFalsy();
    wrapper = mount(<ClrButton disabled={true}>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeTruthy();
  });

  it('render with onClick', () => {
    const fn = jest.fn();
    const wrapper = mount(<ClrButton nativeType="submit" onClick={fn}>按钮</ClrButton>);
    wrapper.childAt(0).simulate('click');
    expect(fn).toBeCalled();
  });
});
