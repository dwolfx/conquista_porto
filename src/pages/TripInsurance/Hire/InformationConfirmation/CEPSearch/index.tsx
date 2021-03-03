import React, { useState } from 'react'
import CEPInput from 'components/Inputs/CEPInput'
import * as s from './styles'
import CEPStates from './CEPStates'
import { ECEPStates } from './CEPStates/types'

const CEPSearch = () => {
  const [CEPState, setCEPState] = useState<ECEPStates>(ECEPStates.initialState)

  return (
    <>
      <CEPInput
        label="CEP"
        onChange={() => null}
        suffix={<s.Icon name="search" />}
        value="03659-874"
      />
      <CEPStates CEPState={CEPState} setCEPState={setCEPState} />
    </>
  )
}

export default CEPSearch
