import { Models, RematchDispatch, RematchRootState, init } from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";

import registration from "./onboarding/registration/model";

export interface RootModel extends Models<RootModel> {
  registration: typeof registration;
}

const models: RootModel = {
  registration,
};

const persistPlugin = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: [
    "registration",
  ],
});

export type RootState = RematchRootState<RootModel>;
export type RootDispatch = RematchDispatch<RootModel>;

const store = init<any>({
  models,
  plugins: [persistPlugin],
});

export const { select } = store;
export default store;
