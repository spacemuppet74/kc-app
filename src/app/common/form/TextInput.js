import React from 'react';
import { Form, Label } from 'semantic-ui-react'

const TextInput = ({ input, label, type, width, placeholder, meta: { touched, error } }) => {
  return (
    <Form.Field width={width} error={touched && !!error}>
      <label>{label}</label>
      <input {...input} type={type} placeholder={placeholder} />
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  )
}

TextInput.defaultProps = {
  label: "Label",
  placeholder: "placeholder",
  type: "text"
}

export default TextInput;
