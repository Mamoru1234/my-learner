import { Box, Button, FormGroup } from "@mui/material";
import { Container } from "@mui/system";
import { Field, Form } from "react-final-form";
import { FormSelectField, FormSelectOption } from "../../../components/forms/form-select-field";
import { FormTextField } from "../../../components/forms/form-text-field";
import { required } from "../../../components/forms/validators";
import { MyAppBar } from "../../../components/MyAppBar";
import { dictionaryRepository } from "../../../store/repositories/dictionary.repository";
import { v4 as uuidV4} from 'uuid';

async function onSubmit(values: any, form: any) {
  await dictionaryRepository.insert({
    id: uuidV4(),
    name: values.dictionaryName,
    fromLang: values.fromLanguage,
    toLang: values.toLanguage,
  });
  form.restart();
}

const LANGUAGE_OPTIONS: FormSelectOption[] = [
  {
    label: 'English',
    value: 'EN',
  },
  {
    label: 'German',
    value: 'DE',
  },
  {
    label: 'Ukrainian',
    value: 'UK'
  },
];

export function NewDictionaryPage() {
  return (
    <Container maxWidth='sm'>
      <MyAppBar/>
      <Box sx={{py: 1}}>
        <Form onSubmit={onSubmit}>{(props) => (
          <form onSubmit = {props.handleSubmit}>
            <Field name="dictionaryName" validate={required}>
              {props => (
                <FormGroup sx={{my: 1}}>
                  {FormTextField('Dictionary name', props)}
                </FormGroup>
              )}
            </Field>
            <Field name="fromLanguage" validate={required}>
              {(props) => (
                <FormGroup sx={{my: 1}}>
                  <FormSelectField
                    label="From language"
                    name="fromLanguage"
                    options={LANGUAGE_OPTIONS}
                    {...props}
                  />
                </FormGroup>
              )}
            </Field>
            <Field name="toLanguage" validate={required}>
              {(props) => (
                <FormGroup sx={{my: 1}}>
                  <FormSelectField
                    label="To language"
                    name="toLanguage"
                    options={LANGUAGE_OPTIONS}
                    {...props}
                  />
                </FormGroup>
              )}
            </Field>
            <Button type="submit" disabled={props.submitting} variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        )}
        </Form>
      </Box>
    </Container>
  )
}
