import React from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import {
  HeaderContent,
  HeaderColTitle,
  HeaderIconButton,
  GridContainer,
  GridRowNoMargin,
  GridCol,
} from './styles'

export interface IProps {
  step: number
  setStep: (step: number) => void
  handleClose: () => void
}

const LayerHeader = (props: IProps) => {
  const { step, setStep, handleClose } = props

  return (
    <GridContainer>
      <GridRowNoMargin>
        <GridCol lg={12}>
          <HeaderContent>
            <HeaderIconButton
              data-gtm-subname="layer Investimentir"
              data-gtm-name="botao voltar step"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              icon="ArrowLeft"
              onClick={() => {
                if (step === 0) {
                  handleClose()
                } else {
                  setStep(step - 1)
                }
              }}
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
              onClick={handleClose}
            />
          </HeaderContent>
        </GridCol>
      </GridRowNoMargin>
    </GridContainer>
  )
}

export default LayerHeader
