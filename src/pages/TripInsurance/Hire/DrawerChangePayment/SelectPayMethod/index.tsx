import React from 'react'

import * as s from '../styles'
import * as t from '../types'

const SelectPayMethod: React.FC<t.ISelectPayMethod> = ({
  paymentType,
  selected,
  label,
}: t.ISelectPayMethod) => (
  <s.SelectWrapper>
    <s.Select
      label={label}
      options={paymentType}
      selected={selected}
    ></s.Select>
  </s.SelectWrapper>
)

export default SelectPayMethod
