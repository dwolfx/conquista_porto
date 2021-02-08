import React from 'react'

import useAdministrationFeeOptions from './useAdministrationFeeOptions'

import * as s from './styles'
import * as t from '../types'

const AdministrationFeeSelect: React.FC<t.ISelect> = ({
  selectedState,
  ...rest
}) => {
  const { options } = useAdministrationFeeOptions({ selectedState })
  const [state] = selectedState

  return (
    <s.Select
      selected={state}
      label="Taxa de administração antecipada"
      options={options}
      optionBoxDirection="top"
      testId="bancos"
      {...rest}
    />
  )
}

export default AdministrationFeeSelect
