import classNames from "classnames";

import React, { FC } from "react";

import css from "./button.module.scss";

interface PropsInterface {
  color?:
    | "yellow"
    | "red"
    | "red-light"
    | "blue"
    | "default"
    | "yellow-border"
    | "green"
    | "green-border"
    | "white"
    | "white-border"
    | "black-border";
  disabled?: boolean;
  type?: "button" | "submit";
  isSmall?: boolean;
  onClick?: () => void;
  name?: string;
  className?: string;
  dataCy?: string;
  loading?: boolean;
}

const Button: FC<PropsInterface> = ({
  color,
  isSmall,
  disabled,
  type = "button",
  children,
  onClick,
  name,
  className,
  dataCy,
  loading = false,
}) => {
  return (
    <button
      className={classNames(
        css.btn,
        color && css[color],
        loading && css.loading,
        isSmall && css.small,
        color,
        "button",
        className
      )}
      disabled={disabled}
      type={type}
      onClick={() => !loading && onClick && onClick()}
      name={name}
      data-cy={dataCy}
    >
      {loading && (
        <img
          src="/img/icons/loading.svg"
          alt="loading"
          className={css.loadingImg}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
