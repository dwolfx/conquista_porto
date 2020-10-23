import React from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Icon from 'components/IconExporter'

import {
  HeaderContent,
  HeaderColTitle,
  IconButton,
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
            <IconButton
              data-gtm-subname="header"
              data-gtm-name="botao voltar step"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleClose('BACK')}
            >
              <Icon name="arrowleft" width={35} height={35} />
            </IconButton>
            <HeaderColTitle>
              <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
            </HeaderColTitle>
            <IconButton
              data-gtm-subname="header"
              data-gtm-name="botao fechar step"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleClose('CLOSE')}
            >
              <Icon name="close" width={35} height={35} />
            </IconButton>
          </HeaderContent>
        </GridCol>
      </GridRow>
    </GridContainer>
  )
}

export default LayerHeader
