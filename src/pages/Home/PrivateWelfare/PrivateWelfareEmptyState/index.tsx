import React from 'react'

import WelFareEmptyImg from 'assets/images/pages/Home/img_private_welfare_empty.jpg'
import Text from 'components/Text'

import { handlePrivateWelfareRedirect } from 'helpers'

import {
  Wrapper,
  ImageWrapper,
  SliderBoxButton,
  SliderCaption,
  Title,
  Description,
  ContentWrapper,
} from './styles'

const PrivateWelfareEmptyState = () => (
  <Wrapper>
    <ImageWrapper>
      <img src={WelFareEmptyImg} alt="PGBL ou VGBL" />
      <SliderCaption>
        <Text type="button" color="white" bold>
          PGBL ou VGBL
        </Text>
      </SliderCaption>
    </ImageWrapper>
    <ContentWrapper>
      <Title>Viver melhor hoje e amanhã</Title>
      <Description>
        Dedique uma parte de sua renda para investir em um futuro confortável.
        Gestores profissionais farão o seu dinheiro render ao longo dos anos
        para que você possa ter uma vida tranquila.
      </Description>
      <SliderBoxButton
        data-gtm-subname="card previdência, viver melhor hoje e amanhã"
        data-gtm-name="conhecer"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="secondary"
        onClick={() => handlePrivateWelfareRedirect()}
      >
        Simular
      </SliderBoxButton>
    </ContentWrapper>
  </Wrapper>
)

export default PrivateWelfareEmptyState
