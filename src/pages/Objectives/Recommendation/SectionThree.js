/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import travelSrcurityImg from 'assets/images/pages/Objectives/travelSecurity.jpg'
import lifeSecurityImg from 'assets/images/pages/Objectives/lifeSecurity.jpg'
import creditCardImg from 'assets/images/pages/Objectives/creditCard.jpg'

import { BannerTips, GridRow } from './styles'

const SectionThree = ({ additionalProducts }) => {
  const products = {
    travelSecurity: {
      title: 'Leve a tranquilidade na mala',
      text:
        'Escola hoje as coberturas mais adequadas aos seus planos e proteja-se contra imprevistos em viagens nacionais ou internacionais.',
      image: travelSrcurityImg,
    },
    lifeSecurity: {
      title: 'Suporte em todos os momentos',
      text:
        'Planeje a sua protção ou da sua família e tenha tranquilidade para enfrentar adversidades e ainda conte com muitos benefícios.',
      image: lifeSecurityImg,
    },
    creditCard: {
      title: 'O cartão com mais benefícios',
      text:
        'O Cartão de Crédito que resolve e ainda dá vantagens e benefícios da Porto Seguro para você, sua casa e seu carro.',
      image: creditCardImg,
    },
  }

  console.log('... additional products:', additionalProducts)

  return (
    <GridRow>
      <Col lg="6">
        <BannerTips image={products.travelSecurity.image}>
          <Text type="heading3">{products.travelSecurity.title}</Text>
          <Text>{products.travelSecurity.text}</Text>
        </BannerTips>
      </Col>

      <Col lg="6">
        <BannerTips image={products.lifeSecurity.image}>
          <Text type="heading3">{products.lifeSecurity.title}</Text>
          <Text>{products.lifeSecurity.text}</Text>
        </BannerTips>
      </Col>
    </GridRow>
  )
}

export default SectionThree
