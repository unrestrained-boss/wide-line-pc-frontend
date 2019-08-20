import React, {PureComponent} from 'react';
import './ClrPagination.scss'

interface OwnProps {
  total: number;
  page: number;
  pageSize: number;
  onChange?: (e: number) => void;
  disabled?: boolean;
}

type Props = OwnProps;

type State = Readonly<{
  startPage: number;
}>;

class ClrPagination extends PureComponent<Props, State> {
  static defaultProps = {
    total: 1,
    page: 1,
    pageSize: 1,
  };
  groupCount = 4;

  setStartPage(page: number) {
    if (page % this.groupCount === 1) {
      this.setState({startPage: page});
    }
    if (page % this.groupCount === 0) {
      const startPage = page - this.groupCount + 1;
      this.setState({startPage});
    }
    if (this.maxPage - page < 2) {
      this.setState({
        startPage: this.maxPage - this.groupCount,
      })
    }
  };

  get hasPrev(): boolean {
    return this.props.page > 1;
  }

  get hasNext(): boolean {
    return this.props.page < this.maxPage;
  }

  get maxPage(): number {
    const {total, pageSize} = this.props;
    return Math.ceil(total / pageSize);
  }

  readonly state: State = {
    startPage: 1
  };

  handleToPrev() {
    if (this.hasPrev) {
      this.handleEmit(this.props.page - 1);
    }
  }

  handleToNext() {
    if (this.hasNext) {
      this.handleEmit(this.props.page + 1);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<OwnProps>, nextContext: any): void {
    if (nextProps.page !== this.props.page) {
      this.setStartPage(nextProps.page);
    }
  }

  handleEmit(page: number) {
    if (this.props.disabled) {
      return;
    }
    if (page !== this.props.page) {
      this.props.onChange && this.props.onChange(page);
    }

  }

  renderItem(key: string, pageNum: number) {
    const {page, disabled} = this.props;
    return (
      <li key={key} className={`${page === pageNum ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => this.handleEmit(pageNum)}>{pageNum}</li>
    );
  }

  getPageElements() {
    const elements = [];
    // 小于等于一组
    if (this.maxPage <= this.groupCount) {
      for (let i = 1; i <= this.maxPage; i++) {
        elements.push(this.renderItem(i.toString(), i));
      }
      return elements;
    }
    let end = this.state.startPage + this.groupCount;
    if (end >= this.maxPage) {
      end = this.maxPage;
    }

    for (let i = this.state.startPage; i <= end; i++) {
      elements.push(this.renderItem(i.toString(), i));
    }
    if (this.maxPage - end >= 2) {
      elements.push(<li className="ellipsis" key="-1" onClick={() => {
      }}>...</li>);
      elements.push(this.renderItem((this.maxPage - 1).toString(), this.maxPage - 1));
      elements.push(this.renderItem(this.maxPage.toString(), this.maxPage));
    }
    return elements;
  }

  render() {
    if (this.maxPage <= 1) {
      return null;
    }
    const {page, disabled} = this.props;
    const elements = [
      <li key="head" onClick={() => this.handleEmit(1)}
          className={`${page === 1 || disabled ? 'disabled' : ''}`}>首页</li>,
      <li key="prev" onClick={() => this.handleToPrev()}
          className={`${!this.hasPrev || disabled ? 'disabled' : ''}`}>&lt;</li>
    ];
    elements.push(...this.getPageElements());
    elements.push(<li key="next" onClick={() => this.handleToNext()}
                      className={`${!this.hasNext || disabled ? 'disabled' : ''}`}>&gt;</li>,
      <li key="foot" onClick={() => this.handleEmit(this.maxPage)}
          className={`${page === this.maxPage || disabled ? 'disabled' : ''}`}>尾页</li>);
    return (
      <ul className="clr-pagination">
        {/*<li>{this.props.page}</li>*/}
        {/*<li>{this.state.startPage}</li>*/}
        {elements}
      </ul>
    );
  }
}

export default ClrPagination;
