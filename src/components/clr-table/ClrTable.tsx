import React, { ReactNode, useEffect, useState} from 'react';
import './ClrTable.scss'
import {TextAlignProperty} from "csstype";
import {withSpinner} from "../hoc/clr-with-spinner/ClrWithSpinner";
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

function isSet(value: any) {
  return !isNull(value) && !isUndefined(value);
}

interface Props {
  columns: ITableColumn[];
  data: ITableData[];
  even?: boolean;
  line?: boolean;
  row?: boolean;
  nob?: boolean;
  size?: TTableSize;
}

const ClrTable: React.FC<Props> = props => {
  const [rowIndex, setRowIndex] = useState(-1);
  const [colIndex, setColIndex] = useState(-1);
  const {columns, data, even, line, row, nob, size} = props;
  const classNames = ['clr-table'];
  even && classNames.push('clr-table-even');
  line && classNames.push('clr-table-line');
  row && classNames.push('clr-table-row');
  nob && classNames.push('clr-table-nob');
  size === 'lager' && classNames.push('clr-table-lager');
  size === 'small' && classNames.push('clr-table-small');
  useEffect(() => {
    setRowIndex(-1);
    setColIndex(-1);
  }, [props.data, props.columns]);

  function handleKeyDown(keyCode: number) {
    let newRowIndex = rowIndex;
    let newColIndex = colIndex;
    switch (keyCode) {
      case 37: // left
        newColIndex--;
        break;
      case 38: // top
        newRowIndex--;
        break;
      case 39: // right
        newColIndex++;
        break;
      case 40: // bottom
        newRowIndex++;
        break;
      default:
        break;
    }
    if (newRowIndex < 0) {
      newRowIndex = 0;
    } else if (newRowIndex > data.length - 1) {
      newRowIndex = data.length - 1;
    }
    if (newColIndex < 0) {
      newColIndex = 0;
    } else if (newColIndex > columns.length - 1) {
      newColIndex = columns.length - 1;
    }
    if (!columns[newColIndex].selectable) {
      return;
    }
    setRowIndex(newRowIndex);
    setColIndex(newColIndex);
  }

  return <table style={{outline: 'none'}} tabIndex={0} onKeyDown={(e) => handleKeyDown(e.keyCode)}
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
    {data.map((item, index) => {
      return <tr key={index}>{columns.map((col, idx) => {
        const content = col.render ? col.render(item, index, data) : item[col.dataIndex as string];
        const isSelected = index === rowIndex && idx === colIndex;
        return <td onClick={() => {
          setRowIndex(index);
          setColIndex(idx);

        }} key={col.title}
                   style={{textAlign: col.align || 'left'}}>
          {!isSet(content) ? '--' : content}
          {(isSelected && col.selectable) && <div className={"cursor"}/>}
        </td>;
      })}</tr>;
    })}
    </tbody>
  </table>;
};

export default ClrTable;
export const ClrTableWithSpinner = withSpinner(ClrTable);

export interface ITableColumn {
  selectable?: boolean,
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

