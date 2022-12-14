import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { MyAppBar } from "../../../components/MyAppBar";
import { loadDictionaries } from "./list-words.slice";
import { SelectDictionaryForm } from "./select-dictionary-form";

const connector = connect(null, {
  loadDictionaries,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function ListWordsPageComponent({ loadDictionaries }: PropsFromRedux) {
  useEffect(() => {
    loadDictionaries();
  }, [loadDictionaries]);
  return (
    <Container maxWidth='sm'>
      <MyAppBar/>
      <Box>
        <Typography variant="h5">
          List of words
        </Typography>
        <SelectDictionaryForm/>
      </Box>
    </Container>
  );
}

export const ListWordsPage = connector(ListWordsPageComponent);