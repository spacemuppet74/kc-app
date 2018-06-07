import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Header, Button, Form } from 'semantic-ui-react'

import ImageUploader from '../../app/common/form/ImageUploader'

class TestForm extends Component {
  state = {}
  handleSubmit = (values) => {
    console.log('submit these values ', values)
  }
  render() {
    return (
      <div>
        <Header as="h2" content="Test Form" />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor="">Field 1</label>
            <input type="text" />
          </Form.Field>
          <Field name="image" type="file" placeholder="upload image" component={ImageUploader} label="Upload Image" width={6} bordered={true} />
        </Form>
      </div>
    )
  }
}

export default reduxForm({ form: 'test' })(TestForm);