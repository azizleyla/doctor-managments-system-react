import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth.service";
import { doctorsApi } from "../services/Doctor.service";

const rootReducer = {
    [authApi.reducerPath]: authApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer

}
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, doctorsApi.middleware),
});

export default store;