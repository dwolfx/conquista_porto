import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import { Col, Row } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import products from 'pages/Objectives/Recommendation/productBannerData'
import { dataLayerProductSuggestion } from 'GoogleTagManager'

import { BannerTips, ButtonContainer } from './styles'

export default function CardCombine({ additional, onClick, ...rest }) {
  const dataLayerProducts = []
  const dataLayerReturnType = ''
  const dataLayerDescription = ''

  const renderedProducts = Object.entries(additional)
    .filter(value => value[1] === true)
    .map(item => products[item[0]])

  renderedProducts.map(
    (product, index) =>
      (product.category === 'Seguro Viagem' &&
        dataLayerProducts.push({
          name: 'seguro-viagem',
          category: 'seguros',
          position: index + 1,
        })) ||
      (product.category === 'Seguro de Vida' &&
        dataLayerProducts.push({
          name: 'seguro-de-vida',
          category: 'seguros',
          position: index + 1,
        })) ||
      (product.category === 'Cartão de Crédito' &&
        dataLayerProducts.push({
          name: 'cartao-de-credito',
          category: 'credito',
          position: index + 1,
        })) ||
      null
  )
  if (dataLayerProducts.length > 1) {
    dataLayerProductSuggestion(
      dataLayerProducts,
      dataLayerReturnType,
      dataLayerDescription
    )
  }

  return (
    <Row {...rest}>
      {renderedProducts.map(product => (
        <Col
          key={product.title}
          lg={renderedProducts.length > 1 ? '6' : '12'}
          xs={12}
        >
          <BannerTips
            size={renderedProducts.length > 1 ? 'sm' : 'lg'}
            image={product.image}
          >
            <Text type="captionUppercase">{product.category}</Text>
            <Text type="heading3">{product.title}</Text>
            <Text
              css={`
                width: calc(10 / 12 * 100%);
              `}
            >
              {product.text}
            </Text>
            <ButtonContainer>
              <Button
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname={`banner - ${product.category}`}
                data-gtm-name="conheca"
                color="primary"
                onClick={() => {
                  onClick(product)
                }}
              >
                Conheça
              </Button>
            </ButtonContainer>
          </BannerTips>
        </Col>
      ))}
    </Row>
  )
}

CardCombine.defaultProps = {
  onClick: null,
}

CardCombine.propTypes = {
  additional: PropTypes.shape({
    travel_security: PropTypes.bool.isRequired,
    life_security: PropTypes.bool.isRequired,
    credit_card: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
}
