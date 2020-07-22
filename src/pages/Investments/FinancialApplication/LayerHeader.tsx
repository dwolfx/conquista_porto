import React from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import {
  HeaderContent,
  HeaderColTitle,
  HeaderIconButton,
  GridContainer,
  GridCol,
  GridRow,
} from './styles'

export interface IProps {
  step: number
  setStep: (step: number) => void
  handleClose: (actionType: 'BACK' | 'CLOSE') => void
}

const LayerHeader = (props: IProps) => {
  const { handleClose } = props
  return (
    <GridContainer>
      <GridRow>
        <GridCol lg={12}>
          <HeaderContent>
            <HeaderIconButton
              data-gtm-subname="layer Investimentir"
              data-gtm-name="botao voltar step"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              icon="ArrowLeft"
              onClick={() => handleClose('BACK')}
            />
            <HeaderColTitle>
              <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
            </HeaderColTitle>
            <HeaderIconButton
              className="layer-close-button"
              data-gtm-subname="botao fechar layer"
              data-gtm-name="botao fechar"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              icon="CloseIcon"
              onClick={() => handleClose('CLOSE')}
            />
          </HeaderContent>
        </GridCol>
      </GridRow>
    </GridContainer>
  )
}

export default LayerHeader
