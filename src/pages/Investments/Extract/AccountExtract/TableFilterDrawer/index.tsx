import React from 'react'
import 'styled-components/macro'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Drawer from 'components/Drawer'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import ButtonTag from 'components/Button/Tag'

import {
  ButtonSubmit,
  CloseButton,
  FilterDrawerHeader,
  HeaderColTitle,
  PrevButton,
  PeriodButtonsWrapper,
  ContentWrapper,
  FooterWrapper,
  FooterButtonsWrapper,
  FilterButtonsWrapper,
  FilterContentWrapper
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

  const DrawerFooter = (
    submitNewFilters: () => void,
    handleRemoveFilters: () => void,
    applyButtonDisabled: boolean,
    cleanUpButtonDisabled: boolean
  ) => {
    return (
      <FooterWrapper>
        <FooterButtonsWrapper>
          <ButtonSubmit
            outline={!cleanUpButtonDisabled}
            onClick={() => handleRemoveFilters()}
            disabled={cleanUpButtonDisabled}
          >
            CANCELAR
          </ButtonSubmit>
          <ButtonSubmit
            color="secondary"
            onClick={() => submitNewFilters()}
            disabled={applyButtonDisabled}
          >
            APLICAR
          </ButtonSubmit>
        </FooterButtonsWrapper>
        <ButtonSubmit
          outline={!cleanUpButtonDisabled}
          css={`
            margin-bottom: 14px;
          `}
          onClick={() => handleRemoveFilters()}
          disabled={cleanUpButtonDisabled}
        >
          LIMPAR
        </ButtonSubmit>
      </FooterWrapper>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      header={DrawerHeader(onHandleClose)}
      footer={DrawerFooter(() => {}, () => {}, false, false)}
      footerHeight="auto"
      handleClose={onHandleClose}
      data-testid="extract-filter-drawer"
    >
      <ContentWrapper>
        <Text
          type="subheading"
          color="gray6"
          bold
        >
          PERÍODO
        </Text>
        <PeriodButtonsWrapper
        >
          <ButtonTag
            color="primary"
            onClick={() => console.log('7')}
            css={`margin: 0 7px 7px 0;`}
          >
            últimos 7 dias
          </ButtonTag>
          <ButtonTag
            color="primary"
            onClick={() => console.log('30')}
          >
            últimos 30 dias
          </ButtonTag>
          <ButtonTag
            color="primary"
            onClick={() => console.log('44')}
          >
            período específico
          </ButtonTag>
        </PeriodButtonsWrapper>
        <Divisor />
        <FilterContentWrapper>
          <Text
            type="subheading"
            color="gray6"
            bold
          >
            TIPO DE MOVIMENTAÇÃO
          </Text>
          <FilterButtonsWrapper>
            <ButtonTag
              color="primary"
              onClick={() => console.log('7')}
              css={`margin: 0 7px 7px 0;`}
            >
              entrada
            </ButtonTag>
            <ButtonTag
              color="primary"
              onClick={() => console.log('30')}
            >
              retirada
            </ButtonTag>
          </FilterButtonsWrapper>
        </FilterContentWrapper>
      </ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer