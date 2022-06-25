import classNames from "classnames";

import React, { FC } from "react";

import Logo from "@/components/header/logo";
import PageAnimation from "@/components/page-animations/pageAnimation";
import Button from "@/components/ui/button";
import router from "next/router";

const RegSuccessPage: FC = () => {
  return (
    <div className={classNames("pageContent", "rightContentPage")}>
      <Logo showInDesktop />

      <PageAnimation>
        <h1>Registration Success</h1>

        <p style={{ padding: 20 }}>The registration was successful</p>

        <Button
        onClick={() => {router.push("/registration")}}>
          Back</Button>
      </PageAnimation>
    </div>
  );
};

export default RegSuccessPage;
