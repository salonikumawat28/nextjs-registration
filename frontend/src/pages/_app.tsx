import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import type { AppProps } from "next/app";

import { ErrorBoundary } from "../components/error-boundaries";
import store from "../store";
import "../styles/index.scss";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
        <Provider store={store}>
          <PersistGate persistor={getPersistor()}>
            <ErrorBoundary>
              <Component {...pageProps} key={router.route} />
            </ErrorBoundary>
          </PersistGate>
        </Provider>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default MyApp;
