import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../components/Login/LoginRedux";
export const Store = configureStore({
    reducer:{
        login:LoginSlice
    }
})