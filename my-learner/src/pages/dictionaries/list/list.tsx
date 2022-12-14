import { Container, List, Typography } from "@mui/material";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { MyAppBar } from "../../../components/MyAppBar";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { DictionaryListItem } from "./dictionary-list-item";
import { FetchState } from "../../../utils/fetch.utils";
import { loadDictionaries } from "../../../store/slices/dictionaries.slice";

const mapState = (state: RootState) => ({
  dictionaries: state.store.dictionaries.dictionaries,
});

const mapDispatchToProps = {
  loadDictionaries,
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function DictionariesList(dictionaries: DictionaryEntity[]) {
  if (dictionaries.length === 0) {
    return (<div>No dictionaries</div>);
  }
  return (
    <List>
      {dictionaries.map((it) => (<DictionaryListItem {...it} key={it.id}/>))}
    </List>
  );
}

function ListDictionariesComponent({ loadDictionaries, dictionaries }: PropsFromRedux) {
  useEffect(() => {
    loadDictionaries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (dictionaries.state === FetchState.IDLE || dictionaries.state === FetchState.LOADING) {
    return (<div>Loading dictionaries</div>);
  }
  if (dictionaries.state === FetchState.FAILED) {
    console.log(dictionaries.err);
    return (<div>Failed to load dictionaries</div>);
  }
  return (
    <Container maxWidth='sm'>
      <MyAppBar/>
      <div>
        <Typography variant="h5">
          List dictionaries
        </Typography>
          {DictionariesList(dictionaries.data)}
        <div><Link to="/dictionaries/new">New dictionary</Link></div>
      </div>
    </Container>
  );
}

export const ListDictionariesPage = connector(ListDictionariesComponent);