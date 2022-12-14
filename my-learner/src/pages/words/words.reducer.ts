import { combineReducers } from "@reduxjs/toolkit";
import { listWordsSlice } from "./list/list-words.slice";

export const wordsReducer = combineReducers({
  list: listWordsSlice.reducer,
});
