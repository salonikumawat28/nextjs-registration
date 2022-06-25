import type { NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";

const IndexPage: NextPage = () => {
  const router = Router;

  useEffect(() => {
    router.push("/registration");
  }, [router]);

  return <></>;
};

export default IndexPage;
