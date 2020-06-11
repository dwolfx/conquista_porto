import React from 'react'

import { RowContent, LeftContent, MainContent } from './styles'

const Desktop: React.FC = () => {
  return (
    <RowContent>
      <LeftContent xl={3}>
        {/* Gráfico de posição e informações da conta de investidor */}
      </LeftContent>
      <MainContent xl={9}>
        {/* Informações do fundo e saldos, Tabela de rentabilidade... */}
      </MainContent>
    </RowContent>
  )
}

export default Desktop
