import React from 'react';
import {mount} from "enzyme";
import ClrFormItem from "../ClrFormItem";

describe('form-item test', () => {
  it('render without crashing', () => {
    mount(<ClrFormItem/>);
  });
  it('render with label name', () => {
    mount(<ClrFormItem name="test" label="test"/>);
  });
});
