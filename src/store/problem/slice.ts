import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { MOCK_PROBLEMS } from "@/constants";
import type {
  ProblemWithUserDataType,
  ProblemType,
} from "@/types/problem";
import type { RootState } from "..";

export interface ProblemState {
  items: ProblemWithUserDataType[];
}

const initialState: ProblemState = {
  items: [...MOCK_PROBLEMS],
};

type UpdateProblemPayload = {
  id: ProblemType["id"];
  changes: Partial<ProblemWithUserDataType>;
};

type SetStatusPayload = {
  id: ProblemType["id"];
  status: ProblemWithUserDataType["status"];
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblems(state, action: PayloadAction<ProblemWithUserDataType[]>) {
      state.items = action.payload;
    },
    addProblem(state, action: PayloadAction<ProblemWithUserDataType>) {
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    updateProblem(state, action: PayloadAction<UpdateProblemPayload>) {
      const { id, changes } = action.payload;
      const idx = state.items.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...changes };
      }
    },
    removeProblem(state, action: PayloadAction<ProblemType["id"]>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleBookmark(state, action: PayloadAction<ProblemType["id"]>) {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) item.isBookmarked = !item.isBookmarked;
    },
    setProblemStatus(state, action: PayloadAction<SetStatusPayload>) {
      const { id, status } = action.payload;
      const item = state.items.find((p) => p.id === id);
      if (item) item.status = status;
    },
  },
});

export const problemReducer = problemSlice.reducer;
export const {
  setProblems,
  addProblem,
  updateProblem,
  removeProblem,
  toggleBookmark,
  setProblemStatus,
} = problemSlice.actions;

// Selectors
export const selectProblems = (state: RootState) => state.problem.items;
export const selectProblemById = (id: string) => (state: RootState) =>
  state.problem.items.find((p: ProblemWithUserDataType) => p.id === id) ?? null;
export const selectBookmarkedProblems = (state: RootState) =>
  state.problem.items.filter((p: ProblemWithUserDataType) => p.isBookmarked);
