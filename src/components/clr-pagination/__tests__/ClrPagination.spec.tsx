import React from 'react';
import {mount} from "enzyme";
import ClrPagination from "../ClrPagination";

describe('pagination test', () => {

  it('render without crashing', () => {
    mount(<ClrPagination/>)
  });
});
