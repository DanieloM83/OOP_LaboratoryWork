import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";

export const store = configureStore({
	reducer: rootReducer,
	// Default middleware includes thunk; keep defaults for now
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
