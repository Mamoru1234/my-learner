import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { FetchContainer } from "../../../components/fetch.container";
import { MyAppBar } from "../../../components/MyAppBar";
import { loadCurrentDictionary } from "../../../store/slices/dictionaries.slice";
import { WordsList } from "./words-list";

const connector = connect((state: RootState) => ({
  currentDictionary: state.store.dictionaries.currentDictionary,
}), {
  loadCurrentDictionary,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function ListWordsPageComponent({ loadCurrentDictionary, currentDictionary }: PropsFromRedux) {
  useEffect(() => {
    loadCurrentDictionary();
  }, [loadCurrentDictionary]);
  return (
    <Container maxWidth='sm'>
      <MyAppBar/>
      <Box>
        <Typography variant="h5">
          List of words
        </Typography>
        <FetchContainer data={currentDictionary} entity='current dictionary'>{
          (currentDictionaryData) => {
            if (currentDictionaryData === null) {
              return (<div>No dictionary selected</div>);
            }
            return (
              <Box>
                <Typography variant="body1">Selected dictionary {currentDictionaryData.name}</Typography>
                <WordsList currentDictionaryId={currentDictionaryData.id}/>
                <Link to='/words/new'>New word</Link>
              </Box>
            );
          }
        }</FetchContainer>
      </Box>
    </Container>
  );
}

export const ListWordsPage = connector(ListWordsPageComponent);