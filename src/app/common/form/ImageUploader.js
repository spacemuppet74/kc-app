import React, { Component } from 'react';
import { Form, Label, Image } from 'semantic-ui-react'

import { uploadImage } from '../../../features/cards/card-api'

class ImageUpload extends Component {
  state = {
    image: null
  }

  handleImageUpload = (evt) => {
    // first check to see if there is any files uploaded
    if (evt.target.files && evt.target.files[0]) {
      // store the info of the file
      const imageFile = evt.target.files[0]

      // create a instance of the fileReader
      // so that we can read the content of the file
      var reader = new FileReader()
      reader.fileName = imageFile.name
      reader.size = imageFile.size

      // once the file has been read by the browser
      // then we need to do 
      reader.onloadend = (upload) => {
        const src = URL.createObjectURL(imageFile)
        const image = {
          name: upload.target.fileName,
          file: upload.target.result,
          src: src,
          size: upload.target.size,
          testFile: imageFile
        }

        console.log(upload.target)

        this.setState({ image })

        this.props.input.onChange(image)
        uploadImage(image)
      }
      console.log('read file from ArrayBuffer')
      reader.readAsArrayBuffer(evt.target.files[0])
    }
  }

  render() {
    const { input, width, label, type, placeholder, bordered, size } = this.props
    const { image } = this.state
    return (
      <Form.Field width={width}>
        <label>{label}</label>
        <input type={type} placeholder={placeholder} onChange={this.handleImageUpload} />
        {image != null && <Image src={image.src || "http://via.placeholder.com/350x150"} bordered={bordered} rounded spaced size={size} />}
      </Form.Field>
    )
  }
}

export default ImageUpload;