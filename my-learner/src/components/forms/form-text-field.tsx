import { TextField } from "@mui/material"
import { FieldRenderProps } from "react-final-form";

export function FormTextField(label: string, props: FieldRenderProps<string>) {
  return (
    <TextField
      error={props.meta.error && props.meta.touched}
      name={props.input.name}
      value={props.input.value}
      onChange={props.input.onChange}
      onFocus={props.input.onFocus}
      onBlur={props.input.onBlur}
      label={label}
      helperText={props.meta.touched && props.meta.error}
    />
  );
}