import React  from 'react';
import {Form} from "formik";

interface Props {
}

const ClrForm:React.FC<Props> = (props) => {

  return (
    <Form className="clr-form">
      {props.children}
    </Form>
  );
};

export default ClrForm;
