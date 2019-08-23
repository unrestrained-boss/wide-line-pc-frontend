import React from 'react';
import {ErrorMessage} from "formik";
import {JustifyContentProperty} from "csstype";

interface Props {
  name?: string;
  label?: string;
  required?: boolean;
  labelWidth?: string;
  labelAlign?: JustifyContentProperty;
}


const ClrFormItem: React.FC<Props> = (props) => {

    const {name, label, labelWidth = '80px', labelAlign = 'flex-end', children} = props;
    return (
      <div className="clr-form-item">
        <span className="clr-form-item-label"
              style={{width: labelWidth, justifyContent: labelAlign}}>{label ? (`${label}:`) : null} </span>
        <div className="clr-form-item-children">
          {children}
          <div className="error-message">
            {name ? (
              <ErrorMessage name={name} component="span"/>
            ) : null}
          </div>
        </div>

      </div>
    );
};

export default ClrFormItem;
