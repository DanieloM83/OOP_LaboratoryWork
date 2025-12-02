import { combineReducers } from "@reduxjs/toolkit";

import { problemReducer } from "./problem/slice.ts";
import { userReducer } from "./user/slice.ts";

export const rootReducer = combineReducers({
	problem: problemReducer,
	user: userReducer,
});

export type RootReducer = typeof rootReducer;
