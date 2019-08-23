import React from 'react';
import {mount} from "enzyme";
import ClrSidebar from "../ClrSidebar";
import {HashRouter} from 'react-router-dom';
describe('sidebar test', () => {

  it('render without crashing', () => {
    mount(<ClrSidebar/>);
  });
  it('render with menus', () => {
    mount(<HashRouter>
      <ClrSidebar menus={[
        { name: 'tt', path: '/'}
      ]}/>
    </HashRouter>);
  });
});
