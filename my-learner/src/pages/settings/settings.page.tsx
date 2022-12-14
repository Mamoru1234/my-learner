import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { MyAppBar } from "../../components/MyAppBar";
import { loadSettings, settingsSelector } from "../../store/slices/settings.slice";
import { RootState } from "../../app/store";
import { FetchContainer } from "../../components/fetch.container";
import { dictionariesSelector, loadDictionaries } from "../../store/slices/dictionaries.slice";
import { SettingsForm } from "./settings-form";

const connector = connect((state: RootState) => ({
  settings: settingsSelector(state),
  dictionaries: dictionariesSelector(state),
}), {
  loadSettings,
  loadDictionaries,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function SettingsPageComponent({ loadSettings, settings, dictionaries, loadDictionaries }: PropsFromRedux) {
  useEffect(() => {
    loadSettings();
    loadDictionaries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth='sm'>
      <MyAppBar/>
      <Typography variant="h5">
        User settings
      </Typography>
      <FetchContainer data={settings} entity='settings'>{
        (settingsData) => (
          <FetchContainer data={dictionaries} entity='dictionaries'>{
            (dictionariesData) => (
              <SettingsForm dictionaries={dictionariesData} settings = {settingsData}/>
            )
          }</FetchContainer>
        )
      }</FetchContainer>
    </Container>
  )
}

export const SettingsPage = connector(SettingsPageComponent);
