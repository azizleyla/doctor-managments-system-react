import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth.service";

const rootReducer = {
    [authApi.reducerPath]: authApi.reducer,

}
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export default store;