import React, {PureComponent} from 'react';
import {ErrorMessage} from "formik";
import {JustifyContentProperty} from "csstype";

interface OwnProps {
  name?: string;
  label?: string;
  required?: boolean;
  labelWidth?: string;
  labelAlign?: JustifyContentProperty;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrFormItem extends PureComponent<Props, State> {
  readonly state: State = {};
  static defaultProps = {
    required: false,
    labelWidth: '80px',
    labelAlign: 'flex-end',
  };

  render() {
    const {name, label, labelWidth, labelAlign} = this.props;
    return (
      <div className="clr-form-item">
        <label className="clr-form-item-label">
          <span className="clr-form-item-head" style={{width: labelWidth, justifyContent: labelAlign}}>{label ? (`${label}:`) : null} </span>
          <div className="clr-form-item-body">
          {this.props.children}
            <div className="error-message">
              {name ? (
                <ErrorMessage name={name} component="span"/>
              ) : null}
            </div>
          </div>
        </label>

      </div>
    );
  }
}

export default ClrFormItem;
