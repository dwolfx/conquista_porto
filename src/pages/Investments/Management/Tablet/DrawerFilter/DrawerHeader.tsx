import React from 'react'
import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import { GTM_DATA_FUNDS_FILTROS_DRAWER } from 'pages/Investments/Management/types'
import {
  FilterDrawerHeader,
  HeaderColTitle,
  CloseButton,
  PrevButton,
} from './styles'

const DrawerHeader = (handleCloseFilters: () => void) => (
  <FilterDrawerHeader>
    <PrevButton
      {...GTM_DATA_FUNDS_FILTROS_DRAWER}
      data-gtm-name="botao voltar drawer filtros fundos"
      onClick={handleCloseFilters}
    />
    <HeaderColTitle>
      <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
    </HeaderColTitle>
    <CloseButton
      {...GTM_DATA_FUNDS_FILTROS_DRAWER}
      data-gtm-name="botao fechar drawer filtros fundos"
      onClick={handleCloseFilters}
    />
  </FilterDrawerHeader>
)

export default DrawerHeader
