import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchData, FetchState } from "../../utils/fetch.utils";
import { WordEntity } from "../entities/word.entity";
import { wordsRepository } from "../repositories/words.repository";

const sliceName = 'store/words';

export interface WordsStoreState {
  currentDictionaryWords: FetchData<WordEntity[]>;
}

const initialState: WordsStoreState = {
  currentDictionaryWords: {
    state: FetchState.IDLE,
  },
};

export const loadCurrentDictionaryWords = createAsyncThunk(`${sliceName}/loadCurrentDictionaryWords`, (currentDictionaryId: string): Promise<WordEntity[]> => wordsRepository.getByDictionary(currentDictionaryId));

export const wordsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCurrentDictionaryWords.pending, (state) => {
      state.currentDictionaryWords = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadCurrentDictionaryWords.fulfilled, (state, action) => {
      state.currentDictionaryWords = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadCurrentDictionaryWords.rejected, (state, action) => {
      state.currentDictionaryWords = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  }
});
