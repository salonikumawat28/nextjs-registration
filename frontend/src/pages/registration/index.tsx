import classNames from "classnames";

import React, { FC } from "react";

import Logo from "@/components/header/logo";
import PageAnimation from "@/components/page-animations/pageAnimation";
import RegistrationForm from "@/components/registration-form";

const RegistrationPage: FC = () => {
  return (
    <div className={classNames("pageContent", "rightContentPage")}>
      <Logo showInDesktop />

      <PageAnimation>
        <h1>Registration</h1>

        <div className="section">
          <RegistrationForm />
        </div>
      </PageAnimation>
    </div>
  );
};

export default RegistrationPage;
