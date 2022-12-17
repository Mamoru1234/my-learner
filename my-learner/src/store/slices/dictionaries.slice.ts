import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FetchData, FetchState } from "../../utils/fetch.utils";
import { DictionaryEntity } from "../entities/dictionary.entity";
import { dictionaryRepository } from "../repositories/dictionary.repository";
import { loadSettings, settingsSelector } from "./settings.slice";

const sliceName = 'store/dictionaries';

export interface DictionariesStoreState {
  dictionaries: FetchData<DictionaryEntity[]>;
  currentDictionary: FetchData<DictionaryEntity | null>;
}

const initialState: DictionariesStoreState = {
  dictionaries: {
    state: FetchState.IDLE,
  },
  currentDictionary: {
    state: FetchState.IDLE,
  },
};
export const loadDictionaries = createAsyncThunk(`${sliceName}/loadDictionaries`, () => dictionaryRepository.getAll());

export const loadCurrentDictionary = createAsyncThunk(`${sliceName}/loadCurrentDictionary`, async (_: void, { dispatch, getState }): Promise<DictionaryEntity | null> => {
  await dispatch(loadSettings());
  const settings = settingsSelector(getState() as RootState);
  if (settings.state !== FetchState.LOADED) {
    throw new Error('Wrong setting state');
  }
  if (!settings.data) {
    return null;
  }
  const { selectedDictionary } = settings.data;
  if (!selectedDictionary) {
    return null;
  }
  return dictionaryRepository.getById(selectedDictionary);
});

export const deleteDictionary = createAsyncThunk(`${sliceName}/deleteDictionary`, async (id: string, { dispatch }) => {
  await dictionaryRepository.delete(id);
  return dispatch(loadDictionaries());
});

export const dictionariesSelector = (state: RootState) => state.store.dictionaries.dictionaries;

export const dictionariesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadDictionaries.pending, (state) => {
      state.dictionaries = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadDictionaries.fulfilled, (state, action) => {
      state.dictionaries = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadDictionaries.rejected, (state, action) => {
      state.dictionaries = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
    builder.addCase(loadCurrentDictionary.pending, (state) => {
      state.currentDictionary = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadCurrentDictionary.fulfilled, (state, action) => {
      state.currentDictionary = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadCurrentDictionary.rejected, (state, action) => {
      state.currentDictionary = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  },
});
