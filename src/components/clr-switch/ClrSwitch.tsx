import React, {PureComponent} from 'react';
import './ClrSwitch.scss'
import {withSpinner} from "../hoc/clr-with-spinner/ClrWithSpinner";

interface OwnProps {
  value: any;
  onChange?: (e: any) => void;
  activeValue?: any;	// switch 打开时的值
  inactiveValue?: any;	// switch 关闭时的值
  activeText?: string;	// switch 打开时的文字描述
  inactiveText?: string;	// switch 打开时的文字描述
  name?: string;
  disabled?: boolean;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrSwitch extends PureComponent<Props, State> {
  static defaultProps = {
    activeValue: true,
    inactiveValue: false,
    activeText: '启用',
    inactiveText: '禁用',
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
    const {value, disabled, activeValue, activeText, inactiveText, name} = this.props;
    const isChecked = value === activeValue;
    const currentText = isChecked ? activeText : inactiveText;
    return (
      <label className={`clr-switch ${isChecked ? 'clr-switch-on' : ''} ${disabled ? 'disabled': ''}`}>
        <input disabled={disabled} name={name} onChange={() => this.handleLabelClicked()} checked={isChecked} type="checkbox" hidden/>
        <i/>
        <span>{currentText}</span>
      </label>
    );
  }
}

export default ClrSwitch;
export const ClrSwitchWithSpinner = withSpinner(ClrSwitch);
