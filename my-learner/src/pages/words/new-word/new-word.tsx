import { Box, Container, Typography } from "@mui/material";
import { MyAppBar } from "../../../components/MyAppBar";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../app/store";
import { loadCurrentDictionary } from "../../../store/slices/dictionaries.slice";
import { useEffect } from "react";
import { FetchContainer } from "../../../components/fetch.container";
import { NewWordForm } from "./new-word-form";

const connector = connect((state: RootState) => ({
  currentDictionary: state.store.dictionaries.currentDictionary,
}), {
  loadCurrentDictionary,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function NewWordPageComponent({ currentDictionary, loadCurrentDictionary }: PropsFromRedux) {
  useEffect(() => {
    loadCurrentDictionary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth = "sm">
      <MyAppBar/>
      <Box sx = {{py: 1}}>
        <Typography variant = 'h6'>
          Create new word
        </Typography>
        <FetchContainer data={currentDictionary} entity='current dictionary'>{
          (data) => {
            if (!data) {
              return (<div>No dictionary configured</div>);
            }
            return (<NewWordForm currentDictionaryId={data.id}/>);
          }
        }</FetchContainer>
      </Box>
    </Container>
  );
}

export const NewWordPage = connector(NewWordPageComponent);