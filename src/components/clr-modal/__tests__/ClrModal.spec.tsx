import React from 'react';
import {mount} from "enzyme";
import ClrModal from "../ClrModal";

describe('modal test', () => {

  it('render without crashing', () => {
    const wrapper = mount(<ClrModal close={() => {}}/>);
    wrapper.childAt(0).find('.clr-modal-container').simulate('click');
    wrapper.childAt(0).find('.clr-modal-header').simulate('click');
  });
  it('render with title Close', () => {
    const handleClose = jest.fn();
    const wrapper = mount(<ClrModal close={handleClose} title={"haha"}/>);
    wrapper.childAt(0).find('.clr-modal-container').simulate('click');
    expect(handleClose).toBeCalledTimes(1);
  });
  it('render with title Close2', () => {
    const handleClose = jest.fn();
    const wrapper = mount(<ClrModal close={handleClose} title={"haha"}/>);
    wrapper.childAt(0).find('i').simulate('click');
    expect(handleClose).toBeCalledTimes(1);
  });
});
