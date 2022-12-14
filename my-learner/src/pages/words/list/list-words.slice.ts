import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { dictionaryRepository } from "../../../store/repositories/dictionary.repository";
import { FetchData, FetchState } from "../../../utils/fetch.utils";

const sliceName = 'pages/words/list';

export interface ListWordsPageState {
  selectedDictionary?: string;
  dictionariesData: FetchData<DictionaryEntity[]>;
}

const initialState: ListWordsPageState = {
  dictionariesData: {
    state: FetchState.IDLE,
  },
};

export const loadDictionaries = createAsyncThunk(`${sliceName}/loadDictionaries`, () => dictionaryRepository.getAll());

export const listWordsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    selectDictionary: (state, action: PayloadAction<string>) => {
      state.selectedDictionary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDictionaries.pending, (state) => {
      state.dictionariesData = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadDictionaries.fulfilled, (state, action) => {
      state.dictionariesData = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadDictionaries.rejected, (state, action) => {
      state.dictionariesData = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  }
});

export const selectDictionary = listWordsSlice.actions.selectDictionary;
