import React from 'react';
import { Form, Select, Label } from "semantic-ui-react";

const SelectInput = ({ input,
  type,
  placeholder,
  multiple,
  options,
  width,
  label,
  search,
  meta: { touched, error } }) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <label>{label}</label>
      <Select
        {...input}
        value={input.value || null}
        onChange={(evt, data) => {
          input.onChange(data.value);
        }}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
        search={search}
      />
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  )
}

export default SelectInput;