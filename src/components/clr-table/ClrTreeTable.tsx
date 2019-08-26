import React, {ReactNode, useState} from 'react';
import './ClrTable.scss'
import {TextAlignProperty} from "csstype";
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

function isSet(value: any) {
  return !isNull(value) && !isUndefined(value);
}
function getKey(row: ITreeTableData, rowKey: ((s: ITreeTableData) => any) | string ) {
  if (typeof  rowKey === 'string') {
    return row[rowKey];
  }
  return rowKey(row);
}

interface Props {
  columns: ITableColumn[];
  data: ITreeTableData[];
  even?: boolean;
  line?: boolean;
  row?: boolean;
  nob?: boolean;
  size?: TTreeTableSize;
  rowKey: ((s: ITreeTableData) => any) | string;
}

interface TrProps {
  row: ITreeTableData;
  columns: ITreeTableData[];
  level: number;
  rowKey: ((s: ITreeTableData) => any) | string;
}

const ClrTreeTableTr: React.FC<TrProps> = props => {
  function renderSingle(row: ITreeTableData, level: number) {

    return (
      <tr>{columns.map((col, index) => {
        const content = col.render ? col.render(row, index, row) : row[col.dataIndex as string];
        const marginLeft = index === 0 ? {marginLeft: `${level * 10}px`} : {};
        return <td key={col.title}
                   style={{textAlign: col.align || 'left'}}>
          {row.children && index === 0 ? (
            <span onClick={() => {
              setIsOpen(!isOpen);
            }}>{isOpen ? '-' : '+'}</span>
          ) : null}

          <span style={marginLeft}>{!isSet(content) ? '--' : content}</span>
        </td>;
      })}</tr>
    );
  }

  const {row, columns, level, rowKey} = props;
  const [isOpen, setIsOpen] = useState(false);
  if (!row.children || !isOpen) {
    return renderSingle(row, level);
  }
  return (
    <>
      {renderSingle(row, level)}
      {row.children!.map((item) => {
        return <ClrTreeTableTr key={getKey(item, rowKey)} rowKey={rowKey} level={level + 1} columns={columns} row={item}/>;
      })}
    </>
  );
};
const ClrTreeTable: React.FC<Props> = props => {
  const {columns, rowKey, data, even, line, row, nob, size} = props;
  const classNames = ['clr-table'];
  even && classNames.push('clr-table-even');
  line && classNames.push('clr-table-line');
  row && classNames.push('clr-table-row');
  nob && classNames.push('clr-table-nob');
  size === 'lager' && classNames.push('clr-table-lager');
  size === 'small' && classNames.push('clr-table-small');


  return <table
    className={classNames.join(' ')}>
    <colgroup>
      {columns.map(col => {
        return <col key={col.title} style={{width: col.width}}/>;
      })}
    </colgroup>
    <thead>
    <tr>
      {columns.map(col => {
        return <th key={col.title} style={{textAlign: col.align || 'left'}}>{col.title}</th>;
      })}
    </tr>
    </thead>

    <tbody>
    {data.map((item) => {
      return <ClrTreeTableTr key={getKey(item, rowKey)} rowKey={rowKey} level={0} row={item} columns={columns}/>
    })}
    </tbody>
  </table>;
};

export default ClrTreeTable;

export interface ITableColumn {
  selectable?: boolean,
  title: string;
  dataIndex?: string;
  align?: TextAlignProperty;
  width?: string;
  render?: (row: ITreeTableData, index: number, data: ITreeTableData[]) => ReactNode;
}

export interface ITreeTableData {
  [s: string]: any;

  children?: ITreeTableData[];
}

export type TTreeTableSize = 'normal' | 'small' | 'lager';

