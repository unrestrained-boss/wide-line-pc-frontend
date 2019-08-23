import React from 'react';
import {openModal} from "../ClrModalService";
import ClrButton from "../../clr-button/ClrButton";

describe('modal service test', () => {


  it('openModal render without crashing', () => {
    openModal(ClrButton, {});
  });
});
