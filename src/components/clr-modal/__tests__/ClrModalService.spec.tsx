import React from 'react';
import {openModal} from "../ClrModalService";

describe('modal service test', () => {


  it('openModal render without crashing', () => {
    openModal((close: () => void) => {
      close();
      return <div/>
    }, {});
  });
});
