import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./petSlice"
export const store = configureStore({
    reducer: {
        pet: petReducer
    },
})