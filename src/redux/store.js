import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

export default configureStore({
  reducer: {
    auth: persistedReducer,
  },
  /*
  Setting middleware in RTK
   * serializableCheck is to check data in redux is pure object not non-serialization
  */
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
