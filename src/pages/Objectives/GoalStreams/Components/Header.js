import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from 'components/Wizard/Header'

export default () => {
  const history = useHistory()

  return (
    <Header
      onClose={() => {
        history.push('/objetivos')
      }}
    />
  )
}
