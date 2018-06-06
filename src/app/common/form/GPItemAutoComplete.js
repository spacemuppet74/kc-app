import React from 'react';
import { Form, Label, Search } from 'semantic-ui-react'

const GPItemAutoComplete = ({ input, label, type, width, placeholder, searching, items, meta: { touched, error } }) => {
  return (
    <Form.Field width={width} error={touched && !!error}>
      <label>{label}</label>
      <Search
        category
        value={input.value || ''}
        loading={searching}
        results={items}
        size='small'
        onSearchChange={(e, { value }) => input.onChange({ title: value })}
        onResultSelect={(e, { result }) => input.onChange(result)}
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


export default GPItemAutoComplete;
