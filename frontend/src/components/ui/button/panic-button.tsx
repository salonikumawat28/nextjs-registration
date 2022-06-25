import classNames from "classnames";

import React, { FC } from "react";

import css from "./button.module.scss";

interface PropsInterface {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  dataCy?: string;
  loading?: boolean;
}

const PanicButton: FC<PropsInterface> = ({
  disabled,
  children,
  onClick,
  className,
  dataCy,
  loading = false,
}) => {
  return (
    <button
      className={classNames(
        css.panicBtn,
        loading && css.loading,
        "button",
        className
      )}
      disabled={disabled}
      onClick={() => !loading && onClick && onClick()}
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

export default PanicButton;
