/* eslint-disable react/no-array-index-key */
import React from 'react'

import PropTypes from 'prop-types'
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

  const renderedProducts = Object.entries(additionalProducts)
    .filter(value => value[1] === true)
    .map(item => products[item[0]])

  return (
    <GridRow>
      {renderedProducts.map((product, index) => (
        <Col
          key={index}
          lg={renderedProducts.length === 2 ? '6' : '12'}
          xs={12}
        >
          <BannerTips size="lg" image={product.image}>
            <Text type="heading3">{product.title}</Text>
            <Text>{product.text}</Text>
          </BannerTips>
        </Col>
      ))}
    </GridRow>
  )
}

SectionThree.propTypes = {
  additionalProducts: PropTypes.object,
}

SectionThree.defaultProps = {
  additionalProducts: {},
}

export default SectionThree
