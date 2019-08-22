import React, { PureComponent } from 'react';
import {Form} from "formik";

interface OwnProps {
  // labelWidth?: string;
  // layout?: 'horizontal'|'vertical'|'inline';
}

type Props = OwnProps;

type State = Readonly<{

}>;

class ClrForm extends PureComponent<Props, State> {
  readonly state: State = {

  };
  static defaultProps = {
    // labelWidth: 'auto',
    // layout: 'horizontal',
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
