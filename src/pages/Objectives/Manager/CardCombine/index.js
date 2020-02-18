import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import { Col, Row } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import products from 'pages/Objectives/Recommendation/productBannerData'

import { BannerTips, ButtonContainer } from './styles'

export default function CardCombine({ additional, onClick, ...rest }) {
  const renderedProducts = Object.entries(additional)
    .filter(value => value[1] === true)
    .map(item => products[item[0]])

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
