import React from 'react'

import useBankOptions from './useBankOptions'

import * as s from './styles'
import * as t from '../types'

const BankSelect: React.FC<t.ISelect> = ({ selectedState, ...rest }) => {
  const { options } = useBankOptions({ selectedState })
  const [state] = selectedState

  return (
    <s.Select
      selected={state}
      label="Banco"
      options={options}
      optionBoxDirection="bottom"
      testId="bancos"
      {...rest}
    />
  )
}

export default BankSelect
