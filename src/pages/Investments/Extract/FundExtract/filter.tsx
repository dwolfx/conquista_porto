import React from 'react'

import SelectRange from 'components/Dates/SelectRange'

import * as s from './styles'

export const months = [
  {
    name: 'Últimos 7 dias',
    compactName: 'Últ. M',
    value: 1,
  },
  {
    name: 'Últimos 30 dias',
    compactName: '12 M',
    value: 12,
  },
  {
    name: 'Período específico',
    compactName: '0 M',
    value: 0,
  },
]

export default function filter() {
  return (
    <s.RowFilter>
      <s.WrapperFilters>
        <s.WrapperSelectRange>
          <SelectRange options={months} />
        </s.WrapperSelectRange>
        <s.ButtonTagStyled color="primary" onClick={() => {}}>
          aplicação
        </s.ButtonTagStyled>
        <s.ButtonTagStyled color="primary" onClick={() => {}}>
          resgate
        </s.ButtonTagStyled>
        <s.ButtonTagStyled color="primary" onClick={() => {}}>
          come-cotas
        </s.ButtonTagStyled>
      </s.WrapperFilters>
      <s.ButtonClearFilters noIcon onClick={() => {}} hasFilter={false}>
        limpar filtros
      </s.ButtonClearFilters>
    </s.RowFilter>
  )
}
