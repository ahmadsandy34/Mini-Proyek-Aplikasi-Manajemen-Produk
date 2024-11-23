import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./async/productsSlice";
import logsReducer from "./async/logsSlice";

export const store = configureStore({
    reducer: {
        products : productsReducer,
        logs : logsReducer
    },
})