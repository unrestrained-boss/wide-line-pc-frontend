import React from 'react';
import {mount} from "enzyme";
import ClrTable from "../ClrTable";

describe('table test', () => {

  it('render without crashing', () => {
    const wrapper = mount(<ClrTable columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table')).toBeTruthy();
  });
  it('render with data', () => {
    const wrapper = mount(<ClrTable columns={[
      {title: '名称', dataIndex: 'name', align: 'center', width: '100px'},
      {title: '头像', dataIndex: 'avatar', width: '100px', render: row => <img src={row.avatar}/>},
    ]} data={[{name: 'HaHa', avatar: 'src'}]} />);
    expect(wrapper.childAt(0).hasClass('clr-table')).toBeTruthy();
  });

  it('render with even', () => {

    let wrapper = mount(<ClrTable even columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-even')).toBeTruthy();

    wrapper = mount(<ClrTable line columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-line')).toBeTruthy();

    wrapper = mount(<ClrTable row columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-row')).toBeTruthy();

    wrapper = mount(<ClrTable nob columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-nob')).toBeTruthy();

    wrapper = mount(<ClrTable size={"lager"} columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-lager')).toBeTruthy();

    wrapper = mount(<ClrTable size={"small"} columns={[]} data={[]} />);
    expect(wrapper.childAt(0).hasClass('clr-table-small')).toBeTruthy();

  });
});
