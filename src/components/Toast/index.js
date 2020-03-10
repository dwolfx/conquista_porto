import React from 'react'

import { ToastContainer } from './styles'

export default function Toast({ ...rest }) {
  return (
    <ToastContainer
      className="Toast__container"
      autoClose={3000}
      draggable={false}
      {...rest}
    />
  )
}
