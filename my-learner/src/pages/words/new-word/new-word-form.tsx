import { useCallback } from "react";
import { wordsRepository } from "../../../store/repositories/words.repository";
import { v4 as uuidV4} from 'uuid';
import { Field, Form } from "react-final-form";
import { required } from "../../../components/forms/validators";
import { Button, FormGroup } from "@mui/material";
import { FormTextField } from "../../../components/forms/form-text-field";

interface NewWordFormProps {
  currentDictionaryId: string;
}

function NewWordFormComponent({ currentDictionaryId }: NewWordFormProps) {
  const onSubmit = useCallback(async (values: any, form: any) => {
    await wordsRepository.insert({
      id: uuidV4(),
      value: values.value,
      dictionary: currentDictionaryId,
      translation: values.translaction,
    });
    form.restart();
  }, [currentDictionaryId]);
  return (
    <Form onSubmit={onSubmit}>{
      (props) => (
        <form onSubmit={props.handleSubmit}>
          <Field name="value" validate={required}>
            {props => (
              <FormGroup sx={{my: 1}}>
                {FormTextField('Original value', props)}
              </FormGroup>
            )}
          </Field>
          <Field name="translaction" validate={required}>
            {props => (
              <FormGroup sx={{my: 1}}>
                {FormTextField('Translaction', props)}
              </FormGroup>
            )}
          </Field>
          <Button type="submit" disabled={props.submitting} variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      )
    }</Form>
  );
}

export const NewWordForm = NewWordFormComponent;