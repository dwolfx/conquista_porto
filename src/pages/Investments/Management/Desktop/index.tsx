import React from 'react'

import ChartPosition from './ChartPosition'
import { RowContent, LeftContent, MainContent } from './styles'

const Desktop: React.FC = () => {
  return (
    <RowContent>
      <LeftContent xl={3}>
        <ChartPosition />
      </LeftContent>
      <MainContent xl={9}>
        {/* Informações do fundo e saldos, Tabela de rentabilidade... */}
      </MainContent>
    </RowContent>
  )
}

export default Desktop
