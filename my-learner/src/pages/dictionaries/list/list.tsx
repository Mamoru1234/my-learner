import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { FetchState, loadDictionaries } from "./list-dictionaries.slice";

const mapState = (state: RootState) => ({
  dictionaries: state.pages.dictionaries.list.dictionariesData,
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
    <div>
      {dictionaries.map((it) => (<div key={it.id}>{it.name}</div>))}
    </div>
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
    <div>
      <div>List dictionaries</div>
      {DictionariesList(dictionaries.data)}
      <div><Link to="/dictionaries/new">New dictionary</Link></div>
    </div>
  );
}

export const ListDictionariesPage = connector(ListDictionariesComponent);