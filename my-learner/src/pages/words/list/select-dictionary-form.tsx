import { Button, FormGroup } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Field, Form } from "react-final-form";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../app/store";
import { FormSelectField, FormSelectOption } from "../../../components/forms/form-select-field";
import { required } from "../../../components/forms/validators";
import { FetchState } from "../../../utils/fetch.utils";
import { selectDictionary } from "./list-words.slice";

const connector = connect((state: RootState) => ({
  dictionariesData: state.pages.words.list.dictionariesData,
  selectedDictionary: state.pages.words.list.selectedDictionary,
}), {
  selectDictionary,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

function SelectDictionaryFormComponent({ selectDictionary, selectedDictionary, dictionariesData }: PropsFromRedux) {
  const onSubmit = useCallback((values: any, form: any) => {
    selectDictionary(values.dictionary);
    form.restart();
  }, [selectDictionary]);
  const dictionariesOptions = useMemo((): FormSelectOption[] => {
    if (dictionariesData.state !== FetchState.LOADED) {
      return [];
    }
    return dictionariesData.data.map((it) => ({
      label: it.name,
      value: it.id,
    }));
  }, [dictionariesData]);
  if (dictionariesData.state !== FetchState.LOADED) {
    return (<div>No data</div>);
  }
  return (
    <Form onSubmit={onSubmit} initialValues={{dictionary: selectedDictionary}}>{(props) => (
      <form onSubmit={props.handleSubmit}>
        <Field name="dictionary" validate={required}>
          {(props) => (
            <FormGroup sx={{my: 1}}>
              <FormSelectField
                label="Select dictionary"
                name="dictionary"
                options={dictionariesOptions}
                {...props}
              />
            </FormGroup>
          )}
        </Field>
        <Button type="submit" disabled={props.submitting} variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    )}</Form>
  );
}

export const SelectDictionaryForm = connector(SelectDictionaryFormComponent);