import { combineReducers } from "@reduxjs/toolkit"
import { dictionariesReducer } from "./dictionaries/dictionaries.reducer";
import { wordsReducer } from "./words/words.reducer";

export const pagesReducer = combineReducers({
  dictionaries: dictionariesReducer,
  words: wordsReducer,
});
