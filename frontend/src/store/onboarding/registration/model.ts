import { RematchDispatch, createModel } from "@rematch/core";
import router from "next/router";

import { RegisterUserData, registerUserApi } from "../../../api/users";
import { RootModel } from "../../index";
import { RegistrationStateType } from "./interface";

const initialState: RegistrationStateType = {
  registrationDataSending: false,
  registrationResponseErrors: null,
};

const model = createModel<RootModel>()({
  state: { ...initialState },
  reducers: {
    setRegistrationDataSending: (state, payload: boolean) => {
      return { ...state, registrationDataSending: payload };
    },
    setRegistrationResponseErrors: (state, payload: object | null) => {
      return { ...state, registrationResponseErrors: payload };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async onUserRegistration(data: RegisterUserData) {
      dispatch.registration.setRegistrationDataSending(true);

      const response = await registerUserApi({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      });

      dispatch.registration.setRegistrationDataSending(false);
      // set errors if api not return id or redirect if return
      if (response.status === 200) {
        router.push("success")
      } else {
        dispatch.registration.setRegistrationResponseErrors(
          response.statusText
        );
      }
    },

    async clearRegistrationErrors() {
      dispatch.registration.setRegistrationResponseErrors(null);
    },
  }),
});

export default model;
