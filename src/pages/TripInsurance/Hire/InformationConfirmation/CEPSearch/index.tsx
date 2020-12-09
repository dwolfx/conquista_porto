import React, { useState } from 'react'
import * as s from './styles'
import CEPStates from './CEPStates'

const CEPSearch = () => {
  const [isLoading] = useState(false)
  const [isFound] = useState(false)
  const [isPartiallyFound] = useState(true)
  const [isNotFound] = useState(false)

  return (
    <>
      <s.InputCEP
        label="CEP"
        onChange={() => null}
        suffix={<s.Icon name="search" />}
        value="03659-874"
      />
      <CEPStates
        isLoading={isLoading}
        isFound={isFound}
        isPartiallyFound={isPartiallyFound}
        isNotFound={isNotFound}
      />
    </>
  )
}

export default CEPSearch
