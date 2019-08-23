import React, {useEffect, useState} from 'react';
import './ClrPagination.scss'

interface Props {
  total?: number;
  page?: number;
  pageSize?: number;
  onChange?: (e: number) => void;
  disabled?: boolean;
}

const ClrPagination: React.FC<Props> = (props) => {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const groupCount = 4;

  useEffect(() => {
    // const {page = 1} = props;
    if (maxPage <= 1) {
      setStartPage(1);
      return;
    }
    if (currentPage % groupCount === 1) {
      setStartPage(currentPage);
    }
    if (currentPage % groupCount === 0) {
      const startPage = currentPage - groupCount + 1;
      setStartPage(startPage);
    }
    if (maxPage - currentPage < 2) {
      setStartPage(maxPage - groupCount)
    }
  }, [currentPage, maxPage, props]);

  useEffect(() => {
    const {total = 1, pageSize = 20} = props;
    if (total === 1) {
      setStartPage(1);
      return;
    }
    setMaxPage(Math.ceil(total / pageSize));
  }, [props]);


  useEffect(() => {
    const {page = 1,} = props;
    setCurrentPage(page);
  }, [props]);
  const hasPrev = (): boolean => {
    return currentPage > 1;
  };

  const hasNext = (): boolean => {
    return currentPage < maxPage;
  };


  const handleToPrev = () => {
    if (hasPrev()) {
      handleEmit(currentPage - 1);
    }
  };

  const handleToNext = () => {
    if (hasNext()) {
      handleEmit(currentPage + 1);
    }
  };

  const handleEmit = (page: number) => {
    if (props.disabled) {
      return;
    }
    if (page !== currentPage) {
      setCurrentPage(page);
      props.onChange && props.onChange(page);
    }
  };

  const renderItem = (key: string, pageNum: number) => {
    const { disabled} = props;
    return (
      <li key={key} className={`${currentPage === pageNum ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleEmit(pageNum)}>{pageNum}</li>
    );
  };

  const getPageElements = () => {
    const elements = [];
    // 小于等于一组
    if (maxPage <= groupCount) {
      for (let i = 1; i <= maxPage; i++) {
        elements.push(renderItem(i.toString(), i));
      }
      return elements;
    }
    let end = startPage + groupCount;
    if (end >= maxPage) {
      end = maxPage;
    }
    for (let i = startPage; i <= end; i++) {
      elements.push(renderItem(i.toString(), i));
    }
    if (maxPage - end >= 2) {
      elements.push(<li className="ellipsis" key="-1" onClick={() => {
      }}>...</li>);
      elements.push(renderItem((maxPage - 1).toString(), maxPage - 1));
      elements.push(renderItem(maxPage.toString(), maxPage));
    }
    return elements;
  };


  if (maxPage <= 1) {
    return null;
  }
  const {page, disabled} = props;
  const elements = [
    <li key="head" onClick={() => handleEmit(1)}
        className={`${page === 1 || disabled ? 'disabled' : ''}`}>首页</li>,
    <li key="prev" onClick={() => handleToPrev()}
        className={`${!hasPrev() || disabled ? 'disabled' : ''}`}>&lt;</li>
  ];
  elements.push(...getPageElements());
  elements.push(<li key="next" onClick={() => handleToNext()}
                    className={`${!hasNext() || disabled ? 'disabled' : ''}`}>&gt;</li>,
    <li key="foot" onClick={() => handleEmit(maxPage)}
        className={`${page === maxPage || disabled ? 'disabled' : ''}`}>尾页</li>);
  return (
    <ul className="clr-pagination">
      {elements}
    </ul>
  );
};

export default ClrPagination;
