import React, {PureComponent} from 'react';
import './ClrRadio.scss';

interface OwnProps {
  disabled?: boolean;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrRadio extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    const {disabled} = this.props;
    return (
      <label className={`clr-radio ${disabled ? 'disabled' : ''}`}>
        <input disabled={disabled} type="radio" hidden/>
        <i/>
        <span>北京</span>
      </label>
    );
  }
}

export default ClrRadio;
