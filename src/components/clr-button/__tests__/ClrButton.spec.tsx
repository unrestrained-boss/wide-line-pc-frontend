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
    const handleClick = jest.fn();
    let wrapper = mount(<ClrButton onClick={handleClick} disabled={false}>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeFalsy();
    wrapper = mount(<ClrButton>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeFalsy();
    wrapper = mount(<ClrButton disabled={true}>按钮</ClrButton>);
    expect((wrapper.childAt(0).getDOMNode() as HTMLButtonElement).disabled).toBeTruthy();
    wrapper.childAt(0).simulate('click');
    expect(handleClick).not.toBeCalled();
  });

  it('render with onClick', () => {
    const handleClick = jest.fn();
    const wrapper = mount(<ClrButton nativeType="submit" onClick={handleClick}>按钮</ClrButton>);
    wrapper.childAt(0).simulate('click');
    expect(handleClick).toBeCalledTimes(1);
  });
});
