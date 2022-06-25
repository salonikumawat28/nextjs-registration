import { createSelector } from "reselect";

import { RootState } from "../../index";
import { RegistrationStateType } from "./interface";

const selectState = (state: RootState) => state.registration;

export const registrationDataSendingSelector = createSelector(
  selectState,
  (data: RegistrationStateType) => data.registrationDataSending
);

export const registrationResponseErrorsSelector = createSelector(
  selectState,
  (data: RegistrationStateType) => data.registrationResponseErrors
);
