import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../app/store";
import { FetchContainer } from "../../../components/fetch.container";
import { loadCurrentDictionaryWords } from "../../../store/slices/words.slice";

export interface WordsListProps {
  currentDictionaryId: string;
}

const connector = connect((state: RootState) => ({
  currentDictionaryWords: state.store.words.currentDictionaryWords,
}), {
  loadCurrentDictionaryWords,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function WordsListComponent({ currentDictionaryId, loadCurrentDictionaryWords, currentDictionaryWords }: WordsListProps & PropsFromRedux) {
  useEffect(() => {
    loadCurrentDictionaryWords(currentDictionaryId);
  }, [
    currentDictionaryId,
    loadCurrentDictionaryWords
  ]);
  return (
    <FetchContainer data={currentDictionaryWords} entity='words'>{
      (data) => {
        if (data.length === 0) {
          return (<div>No words</div>);
        }
        return (
          <List>
            {data.map((it) => (
              <ListItem key={it.id}>
                <ListItemText primary={`${it.value} - ${it.translation}`}/>
              </ListItem>)
            )}
          </List>
        );
      }
    }</FetchContainer>
  );
}

export const WordsList = connector(WordsListComponent);