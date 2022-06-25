import classNames from "classnames";

import React, { FC } from "react";

import css from "./logo.module.scss";

const Logo: FC<{ showInDesktop: boolean }> = ({ showInDesktop }) => {
  return (
    <div
      className={classNames(css.logo, showInDesktop && css.showInDesk, "logo")}
    >
      <img src="/img/logo.svg" alt="logo" />
    </div>
  );
};

export default Logo;
