import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { apiBase } from "../api/apiBase";
import authReducer from "./authSlice";

const persistConfig = {
    key: "root",
    storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        [apiBase.reducerPath]: apiBase.reducer,
    },
    middleware: (getdefaultMiddleware) =>
        getdefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(apiBase.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);