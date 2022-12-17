import { ListItem, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { useCallback } from "react";
import { DictionaryEntity } from "../../../store/entities/dictionary.entity";
import { connect, ConnectedProps } from "react-redux";
import { deleteDictionary } from "../../../store/slices/dictionaries.slice";

const mapDispatchToProps = {
  deleteDictionary,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function DictionaryListItemComponent(props: DictionaryEntity & PropsFromRedux) {
  const { id, deleteDictionary } = props; 
  const onDelete = useCallback(() => {
    console.log('delete', id);
    deleteDictionary(id);
  }, [id, deleteDictionary]);
  return (
    <ListItem key={props.id} secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    }>
      <ListItemText primary={props.name}/>
    </ListItem>
  );
}

export const DictionaryListItem = connector(DictionaryListItemComponent);