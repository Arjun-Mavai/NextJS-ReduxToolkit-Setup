 import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authSlice ,counterSlice,dataSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

 const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [counterSlice.name]:counterSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

 export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
     return makeConfiguredStore();
  } else {
     const persistConfig = {
      key: "nextjs",
      whitelist: ["auth","data" ,"counter"], // Parts of the store to persist
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // Magical key to access persisted data
    return store;
  }
};

// Redux store and types
export type AppDispatch =  ReturnType<typeof makeStore>['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// Creating a wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore , {debug:true});
