import React from 'react'

import TableStatement from './Table'
import { StatementSection, StatementContainer } from './styles'
import Breadcrumb from '../../../components/Breadcrumb'

export default function Statement() {
  return (
    <StatementSection>
      <StatementContainer>
        <Breadcrumb crumbs={['Pontos', 'Extrato de pontos']} />
        <TableStatement />
      </StatementContainer>
    </StatementSection>
  )
}
