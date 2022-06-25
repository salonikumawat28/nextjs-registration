import { motion } from "framer-motion";

import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import css from "./page-animation.module.scss";

const variants = {
  initial: {
    opacity: 0,
    marginLeft: "0%",
  },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  slide: {
    width: "calc(100vw - 60px)",
    marginLeft: "-110%",
    transition: { duration: 0.3 },
  },
  back: {
    width: "calc(100vw - 60px)",
    marginLeft: "110%",
    transition: { duration: 0.3 },
  },
  none: {
    width: "auto",
    marginLeft: "0",
    opacity: "1",
    transition: { duration: 0 },
  },
};

const PageAnimation: FC<{ disableAnimation?: boolean }> = ({
  disableAnimation,
  children,
}) => {
  const router = useRouter();
  const [exit, setExitType] = useState<
    "initial" | "exit" | "back" | "slide" | "none"
  >("exit");
  const [init, setInitType] = useState<"show" | "none">("show");

  useEffect(() => {
    const handleRouteChange = (data: any) => {
      setInitType("show");
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, router.pathname, disableAnimation]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={init}
      exit={exit}
      className={css.el}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimation;
