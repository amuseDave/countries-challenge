import { configureStore } from "@reduxjs/toolkit";
import uiSlicer from "./uiSlicer";

const store = configureStore({ reducer: { uiSlicer } });

export default store;
