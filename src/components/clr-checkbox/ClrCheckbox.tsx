import React, {PureComponent} from 'react';
import './ClrCheckbox.scss';

interface OwnProps {
  value: any;
  onChange: (e: any) => void;
  activeValue?: any;	// checkbox 打开时的值
  inactiveValue?: any;	// checkbox 关闭时的值
  name?: string;
  disabled?: boolean;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrCheckbox extends PureComponent<Props, State> {
  static defaultProps = {
    activeValue: true,
    inactiveValue: false,
  };
  readonly state: State = {};

  handleLabelClicked() {
    const {value, onChange, activeValue, inactiveValue} = this.props;
    if (onChange) {
      let currentValue = activeValue;
      if (value === activeValue) {
        currentValue = inactiveValue;
      }
      onChange(currentValue);
    }
  }

  render() {
    const {value, disabled, activeValue, name} = this.props;
    const isChecked = value === activeValue;
    return (
      <label className={`clr-checkbox ${disabled ? 'disabled': ''}`}>
        <input disabled={disabled} name={name} onChange={() => this.handleLabelClicked()} checked={isChecked} type="checkbox" hidden/>
        <i/>
        <span>{this.props.children}</span>
      </label>
    );
  }
}

export default ClrCheckbox;
