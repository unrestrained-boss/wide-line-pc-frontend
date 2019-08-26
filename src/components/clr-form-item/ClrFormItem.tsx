import React from 'react';
import {ErrorMessage, Field} from "formik";
import {JustifyContentProperty} from "csstype";
import './ClrFormItem.scss';

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
        {children && (name ? (
          <>
            <Field name={name}
                   render={({field}: any) => {
                     return React.cloneElement(children as any, {
                       ...field,
                       placeholder: '请输入' + props.label,
                     });
                   }}/>

            <div className="error-message">
              <ErrorMessage name={name} component="span"/>
            </div>
          </>
        ) : children)}
      </div>
    </div>
  );
};

export default ClrFormItem;
