import * as React from "react";
import {ReactElement, ReactNode} from "react";

export function map(children: ReactNode, func: (item: ReactElement, index: number) => any) {
  let index = 0;
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    let handle = func.call(undefined, child, index);
    index += 1;
    return handle;
  });
}
