import React, { PureComponent } from 'react';
import {Form} from "formik";

interface OwnProps {}

type Props = OwnProps;

type State = Readonly<{

}>;

class ClrForm extends PureComponent<Props, State> {
  readonly state: State = {

  };

  render() {
    return (
      <Form className="clr-form">
        {this.props.children}
      </Form>
    );
  }
}

export default ClrForm;
