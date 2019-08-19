import React, {PureComponent} from 'react';
import './ClrModal.scss'

interface OwnProps {
  Close: () => void;
  title: string;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrModal extends PureComponent<Props, State> {
  readonly state: State = {};

  handleContainerClicked(e: React.MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) {
      this.close();
    }
  }

  componentWillUnmount(): void {
  }

  close() {
    this.props.Close();
  }

  render() {
    return (<div onClick={(e) => this.handleContainerClicked(e)} className="clr-modal-container">
      <div className="clr-modal-wrapper">
        <div className="clr-modal-header">
          {this.props.title}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    </div>);
  }
}

export default ClrModal;
