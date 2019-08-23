import React from "react";
import {mount} from "enzyme";
import ClrForm from "../ClrForm";

describe('form test', () => {
  it('render without crashing', () => {
    const wrapper = mount(<ClrForm><div>test</div></ClrForm>);
    expect(wrapper.text()).toBe('test');
  });
});
