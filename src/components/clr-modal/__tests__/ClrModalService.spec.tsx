import React from 'react';
import ClrModalService from "../ClrModalService";
import ClrButton from "../../clr-button/ClrButton";

describe('modal service test', () => {


  it('openModal render without crashing', () => {
    ClrModalService.openModal(ClrButton, {});
  });
});
