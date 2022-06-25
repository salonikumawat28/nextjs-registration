import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


import Input from "@/components/ui/input";

import { RootDispatch } from "../../store";
import {
  registrationDataSendingSelector,
  registrationResponseErrorsSelector,
} from "../../store/onboarding/registration/selector";
import Button from "../ui/button";

const RegistrationForm: FC = () => {
  const dataSending = useSelector(registrationDataSendingSelector);
  const apiErrors = useSelector(registrationResponseErrorsSelector);
  const dispatch = useDispatch<RootDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
  });

  const onSubmit = useCallback(
    (data) => {
      dispatch.registration.onUserRegistration(data);
    },
    [dispatch.registration]
  );

  // clear registration errors on initial load
  useEffect(() => {
    dispatch.registration.clearRegistrationErrors();
  }, [dispatch.registration]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input">
        <p className="label">Email:</p>
        <Input
          placeholder="Email"
          type="email"
          register={register("email", {
            required: "Email is required",
          })}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div className="input">
        <p className="label">First Name:</p>
        <Input
          placeholder="First Name"
          type="text"
          register={register("firstName", {
            required: "First name is required",
          })}
        />
        <p>{errors.firstName?.message}</p>
      </div>

      <div className="input">
        <p className="label">Last Name:</p>
        <Input
          placeholder="Last Name"
          type="text"
          register={register("lastName", {
            required: "Last name is required",
          })}
        />
        <p>{errors.lastName?.message}</p>
      </div>

      {apiErrors && <p className="apiError">Something went wrong</p>}

      <div className="btnGroup">
        <Button color="yellow" type="submit" loading={dataSending}>
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
