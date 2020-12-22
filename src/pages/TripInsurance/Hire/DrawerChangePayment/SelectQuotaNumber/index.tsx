import React from 'react'

import * as s from '../styles'
import * as t from '../types'

const SelectQuotaNumber: React.FC<t.ISelectNumberQuota> = ({
  numberQuota,
  selected,
  label,
}: t.ISelectNumberQuota) => (
  <s.SelectWrapper>
    <s.Select
      label={label}
      options={numberQuota}
      selected={selected}
    ></s.Select>
  </s.SelectWrapper>
)

export default SelectQuotaNumber
