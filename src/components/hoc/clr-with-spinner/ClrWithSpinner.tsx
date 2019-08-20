import React, {Component, ComponentType} from 'react';
import './ClrWithSpinner.scss'
import ClrSpinner, {TSpinnerSize} from "../../clr-spinner/ClrSpinner";

interface WithSpinnerProps {
  spinner: boolean;
  spinnerSize?: TSpinnerSize;
  showText?: boolean;
  spinnerText?: string;
}

export const withSpinner = <P extends object>(
  WrappedComponent: ComponentType<P>
) =>
  class WithLoading extends Component<P & WithSpinnerProps> {
    static defaultProps = {
      spinnerSize: 'small',
      showText: false,
      spinnerText: "努力加载中...",
    };

    render() {
      const {showText, spinnerText, spinnerSize} = this.props;
      return (
        <div className="clr-with-spinner-wrapper">
          <WrappedComponent {...this.props} />
          {!this.props.spinner ? null : <div className="inner">
            <ClrSpinner size={spinnerSize}/>
            {showText ? <span>&nbsp;&nbsp;&nbsp;{spinnerText}</span> : null}
          </div>}
        </div>
      );
    }
  };
