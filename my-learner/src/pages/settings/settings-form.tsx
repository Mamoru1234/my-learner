import { useCallback, useMemo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Field, Form } from "react-final-form";
import { DictionaryEntity } from "../../store/entities/dictionary.entity";
import { SettingsEntity } from "../../store/entities/settings.entity";
import { saveSettings } from "../../store/slices/settings.slice";
import { required } from "../../components/forms/validators";
import { Button, FormGroup } from "@mui/material";
import { FormSelectField, FormSelectOption } from "../../components/forms/form-select-field";

const connector = connect(null, {
  saveSettings,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface SettingsFormProps extends PropsFromRedux {
  settings: SettingsEntity | null;
  dictionaries: DictionaryEntity[];
}

function SettingsFormComponent({ settings, dictionaries, saveSettings }: SettingsFormProps) {
  const onSubmit = useCallback((values: any) => saveSettings({
    selectedDictionary: values.dictionary,
  }), [saveSettings]);
  const initialValues = useMemo(() => ({
    dictionary: settings?.selectedDictionary,
  }), [settings]);
  const dictionaryOptions = useMemo((): FormSelectOption[] => dictionaries.map((it) => ({
    label: it.name,
    value: it.id,
  })), [dictionaries]);
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>{
      (props) => (
        <form onSubmit={props.handleSubmit}>
          <Field name="dictionary" validate={required}>
              {(props) => (
                <FormGroup sx={{my: 1}}>
                  <FormSelectField
                    label="Active dictionary"
                    name="dictionary"
                    options={dictionaryOptions}
                    {...props}
                  />
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

export const SettingsForm = connector(SettingsFormComponent);