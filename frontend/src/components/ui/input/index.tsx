import classNames from "classnames";
import React, { FC } from "react";

import css from "./input.module.scss";

interface PropsInterface {
  type: "text" | "password" | "email";
  name?: string;
  placeholder: string;
  register?: any;
  error?: boolean;
  testId?: string;
}

const Input: FC<PropsInterface> = ({
  type,
  name,
  placeholder,
  register,
  error,
  testId,
}) => {
  return (
    <input
      data-testid={testId}
      type={type}
      name={name}
      placeholder={placeholder}
      className={classNames(css.input, error && css.error)}
      {...register}
    />
  );
};

export default Input;
