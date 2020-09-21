import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Text from 'components/Text'

import WelFareEmptyImg from 'assets/images/pages/Home/img_private_welfare_empty.jpg'

import {
  SliderBox,
  SliderImageBox,
  SliderBoxButton,
  SliderCaption,
  SliderTextBox,
} from './styles'

export default function PrivateWalfareSection() {
  const history = useHistory()

  const renderInvestimentCardContent = () => (
    <SliderBox>
      <SliderImageBox>
        <img src={WelFareEmptyImg} alt="PGBL ou VGBL" />
        <SliderCaption>
          <Text type="button" bold>
            PGBL ou VGBL
          </Text>
        </SliderCaption>
      </SliderImageBox>
      <SliderTextBox>
        <Text
          type="title"
          bold
          css={`
            padding-bottom: 7px;
          `}
        >
          Viver melhor hoje e amanhã
        </Text>
        <Text
          bold
          css={`
            padding-bottom: 14px;
          `}
        >
          Dedique uma parte de sua renda para investir em um futuro confortável.
          Gestores profissionais farão o seu dinheiro render ao longo dos anos
          para que você possa ter uma vida tranquila.
        </Text>
        <SliderBoxButton
          data-gtm-subname="card previdência, viver melhor hoje e amanhã"
          data-gtm-name="conhecer"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          onClick={() => history.push('/previdencia-privada')}
        >
          conhecer
        </SliderBoxButton>
      </SliderTextBox>
    </SliderBox>
  )

  return renderInvestimentCardContent()
}
