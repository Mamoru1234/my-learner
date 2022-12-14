import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FetchData, FetchState } from "../../utils/fetch.utils";
import { SettingsEntity } from "../entities/settings.entity";
import { settingsRepository } from "../repositories/settings.repository";

const sliceName = 'store/settings';

export interface SettingStoreState {
  settings: FetchData<SettingsEntity | null>;
}

const initialState: SettingStoreState = {
  settings: {
    state: FetchState.IDLE,
  },
};

export const settingsSelector = (state: RootState) => state.store.settings.settings;

export const loadSettings = createAsyncThunk(`${sliceName}/loadSettings`, () => settingsRepository.get());

export const saveSettings = createAsyncThunk(`${sliceName}/saveSettings`, async (settingsEntity: SettingsEntity, { dispatch }) => {
  await settingsRepository.save(settingsEntity);
  return dispatch(loadSettings());
});

export const settingsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSettings.pending, (state) => {
      state.settings = {
        state: FetchState.LOADING,
      };
    });
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      state.settings = {
        state: FetchState.LOADED,
        data: action.payload,
      };
    });
    builder.addCase(loadSettings.rejected, (state, action) => {
      state.settings = {
        state: FetchState.FAILED,
        err: action.error,
      };
    });
  },
});
