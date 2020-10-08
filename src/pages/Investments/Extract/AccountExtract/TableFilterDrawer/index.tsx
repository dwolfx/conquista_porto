import React from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Drawer from 'components/Drawer'

import {
  ButtonSubmit,
  CloseButton,
  FilterDrawerHeader,
  HeaderColTitle,
  PrevButton
} from './styles'

const TableFilterDrawer = ({ isOpen, onHandleClose }: any) => {

  const DrawerHeader = (handleCloseFilters: () => void) => (
    <FilterDrawerHeader>
      <PrevButton
        data-gtm-subname="drawer filtros"
        data-gtm-name="botao fechar drawer filtros"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        name="arrowleft"
        color="gray4"
        width={28}
        height={28}
        onClick={() => handleCloseFilters()}
      />
      <HeaderColTitle>
        <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
      </HeaderColTitle>
      <CloseButton
        data-gtm-subname="drawer close"
        data-gtm-name="botao fechar drawer filtros"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        name="close"
        color="gray4"
        width={28}
        height={28}
        onClick={() => handleCloseFilters()}
      />
    </FilterDrawerHeader>
  )

  return (
    <Drawer
      isOpen={isOpen}
      header={DrawerHeader(onHandleClose)}
      handleClose={onHandleClose}
      data-testid="extract-filter-drawer"
    >
      <div>content</div>
    </Drawer>
  )
}

export default TableFilterDrawer