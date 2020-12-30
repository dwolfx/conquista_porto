import React from 'react'
import { dataLayerProductSuggestion } from 'GoogleTagManager'

import Button from 'components/Button'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'
import products from 'pages/Objectives/Recommendation/ProductBanner/productBannerData'

import { IDataLayer, IProps } from './types'
import { BannerTips, ButtonContainer, ColBanner, RowBanner } from './styles'

export default function CardCombine({ additional, onClick, ...rest }: IProps) {
  const isMobile = useMedia('sm')
  let dataLayerReturnType = 'erro'
  let dataLayerDescription = 'Não existem produtos sugeridos'

  const renderedProducts = Object.entries(additional)
    .filter(([, value]) => value === true)
    .map(([key]) => products[key])

  if (renderedProducts.length >= 1) {
    const dataLayerProducts: IDataLayer[] | [] = [...renderedProducts].map(
      (product, index) => {
        if (product.category === 'Seguro Viagem') {
          return {
            name: 'seguro-viagem',
            category: 'seguros',
            position: index + 1,
          }
        }
        if (product.category === 'Seguro de Vida') {
          return {
            name: 'seguro-de-vida',
            category: 'seguros',
            position: index + 1,
          }
        }

        return {
          name: 'cartao-de-credito',
          category: 'credito',
          position: index + 1,
        }
      }
    )

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
          lg={renderedProducts.length > 1 ? 6 : 12}
          xs={12}
        >
          <BannerTips bgImage={product.image}>
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
