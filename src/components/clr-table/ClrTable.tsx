import React, {PureComponent, ReactNode} from 'react';
import './ClrTable.scss'
import {TextAlignProperty} from "csstype";

interface OwnProps {
  columns: ITableColumn[];
  data: ITableData[];
  even?: boolean;
  line?: boolean;
  row?: boolean;
  nob?: boolean;
  size?: TTableSize;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrTable extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    const {columns, data, even, line, row, nob, size} = this.props;
    const classNames = ['clr-table'];
    even && classNames.push('clr-table-even');
    line && classNames.push('clr-table-line');
    row && classNames.push('clr-table-row');
    nob && classNames.push('clr-table-nob');
    size === 'lager' && classNames.push('clr-table-lager');
    size === 'small' && classNames.push('clr-table-small');

    return (
      <table className={classNames.join(' ')}>
        <colgroup>
          {columns.map(col => {
            return (
              <col style={{width: col.width}}/>
            );
          })}
        </colgroup>
        <thead>
        <tr>
          {columns.map(col => {
            return (
              <th style={{textAlign: col.align || 'left'}}>{col.title}</th>
            );
          })}
        </tr>
        </thead>

        <tbody>
        {data.map((item, index) => {
          return (
            <tr>{columns.map(col => {
              return (
                <td style={{textAlign: col.align || 'left'}}>{col.render ? col.render(item, index, data) : item[col.dataIndex as string]}</td>
              );
            })}</tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

export default ClrTable;

export interface ITableColumn {
  title: string;
  dataIndex?: string;
  align?: TextAlignProperty;
  width?: string;
  render?: (row: ITableData, index: number, data: ITableData[]) => ReactNode;
}

export interface ITableData {
  [s: string]: any;
}

export type TTableSize = 'normal' | 'small' | 'lager';

