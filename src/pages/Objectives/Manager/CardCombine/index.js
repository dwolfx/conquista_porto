import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import Button from 'components/Button'
import products from 'pages/Objectives/Recommendation/productBannerData'
import { dataLayerProductSuggestion } from 'GoogleTagManager'
import useMedia from 'hooks/useMedia'

import { BannerTips, ButtonContainer, ColBanner, RowBanner } from './styles'

export default function CardCombine({ additional, onClick, ...rest }) {
  const isMobile = useMedia('sm')
  const dataLayerProducts = []
  let dataLayerReturnType = 'erro'
  let dataLayerDescription = 'Não existem produtos sugeridos'

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
  if (dataLayerProducts.length >= 1) {
    dataLayerReturnType = 'sucesso'
    dataLayerDescription = ''
    dataLayerProductSuggestion(
      dataLayerProducts,
      dataLayerReturnType,
      dataLayerDescription
    )
  }

  return (
    <RowBanner {...rest}>
      {renderedProducts.map(product => (
        <ColBanner
          key={product.title}
          lg={renderedProducts.length > 1 ? '6' : '12'}
          xs={12}
        >
          <BannerTips
            size={renderedProducts.length > 1 ? 'sm' : 'lg'}
            image={product.image}
          >
            {isMobile ? (
              <>
                <Text bold type="captionUppercase">
                  {product.category}
                </Text>
                <Text bold type="heading4">
                  {product.title}
                </Text>
                <Text bold type="headline">
                  {product.text}
                </Text>
              </>
            ) : (
              <>
                <Text bold type="captionUppercase">
                  {product.category}
                </Text>
                <Text bold type="heading3">
                  {product.title}
                </Text>
                <Text
                  bold
                  type="headline"
                  css={`
                    width: calc(10 / 12 * 100%);
                  `}
                >
                  {product.text}
                </Text>
              </>
            )}

            <ButtonContainer>
              <Button
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname={`banner - ${product.category}`}
                data-gtm-name="conheca"
                color="secondary"
                onClick={() => {
                  onClick(product)
                }}
              >
                Conheça
              </Button>
            </ButtonContainer>
          </BannerTips>
        </ColBanner>
      ))}
    </RowBanner>
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
