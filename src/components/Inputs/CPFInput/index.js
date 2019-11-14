import React from 'react'
import TextInput from '../Text'

export default ({ ...props }) => {
  const maskedValue = props.value

  const applyCPFMask = event => {
    console.log(event)
  }

  return <TextInput onChange={applyCPFMask} value={maskedValue} {...props} />
}
