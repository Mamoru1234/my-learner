import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { memo } from "react";
import { FieldRenderProps } from "react-final-form";

export interface FormSelectOption {
  label: string;
  value: string;
}

export interface FormSelectFieldProps extends FieldRenderProps<string> {
  options: FormSelectOption[];
  label: string;
  name: string;
}

function FormSelectFieldRaw(props: FormSelectFieldProps) {
  const labelId = `${props.name}-label`;
  return (
    <FormControl error={props.meta.error && props.meta.touched}>
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Select
        value={props.input.value}
        labelId={labelId}
        label={props.label}
        onChange={props.input.onChange}
        onFocus={props.input.onFocus}
        onBlur={props.input.onBlur}
      >
        {props.options.map((it) => (<MenuItem value={it.value} key={it.value}>{it.label}</MenuItem>))}
      </Select>
      <FormHelperText>{props.meta.touched && props.meta.error}</FormHelperText>
    </FormControl>
  );
}

export const FormSelectField = memo(FormSelectFieldRaw);