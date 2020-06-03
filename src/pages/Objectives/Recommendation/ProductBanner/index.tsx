import React, { useState } from 'react'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import Button from 'components/Button'
import { dict } from 'components/IconExporter'
import Text from 'components/Text'
import { dataLayerProductSuggestion } from 'GoogleTagManager'

import { IAdditional } from 'pages/Objectives/Recommendation/types'
import {
  Column,
  GridRow,
  ButtonContainer,
} from 'pages/Objectives/Recommendation/styles'

import products, { TAdditionalKey } from './productBannerData'
import ModalContent from './ModalContent'
import * as s from './styles'

interface IModal {
  isOpen: boolean
  title: string
  text: string
  items: {
    icon: keyof typeof dict
    text: string
  }[]
}
interface ILayerProducts {
  name: string
  category: string
  position: number
}
interface IProps {
  additional: IAdditional
}

const ProductBanner = ({ additional }: IProps) => {
  const isMobile = useMedia('sm')
  const isTabletHorizontal = useMedia('lg')
  
  const dataLayerProducts: ILayerProducts[] = []
  let dataLayerReturnType = 'erro'
  let dataLayerDescription = 'Não existem produtos sugeridos'

  const renderedProducts = Object.entries(additional)
    .filter(([, value]) => value === true)
    .map(([key]: TAdditionalKey[]) => products[key])

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

  const [modalState, setModalState] = useState<IModal>({
    isOpen: false,
    title: '',
    text: '',
    items: [
      {
        icon: 'creditcard',
        text: '',
      },
    ],
  })

  return (
    <>
      <GridRow>
        {renderedProducts.map(product => (
          <Column
            key={product.title}
            lg={renderedProducts.length > 1 ? 6 : 12}
            md={renderedProducts.length > 1 ? 6 : 12}
            xs={12}
          >
            <s.ProductBanner
              size={renderedProducts.length > 1 ? 'sm' : 'lg'}
              bgImage={product.image}
            >
              <Text bold type="captionUppercase">
                {product.category}
              </Text>
              <Text
                bold={isMobile}
                type={
                  isMobile || isTabletHorizontal
                    ? 'heading4'
                    : 'heading3'
                }
              >
                {product.title}
              </Text>
              <Text
                css={
                  !(isMobile || isTabletHorizontal)
                    ? `
                      width: ${(10 / 12) * 100}%;
                    `
                    : ''
                }
              >
                {product.text}
              </Text>

              <ButtonContainer>
                <Button
                  data-gtm-subname={`${product.title}`}
                  data-gtm-name="saiba mais"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  color="primary"
                  onClick={() => {
                    setModalState({
                      isOpen: true,
                      title: product.modalInfos.title,
                      text: product.modalInfos.text,
                      items: product.modalInfos.items,
                    })
                  }}
                >
                  Saiba mais
                </Button>
              </ButtonContainer>
            </s.ProductBanner>
          </Column>
        ))}
      </GridRow>
      <s.ProductBannerModal
        modalTitle={modalState.title}
        alignItems="center"
        isOpen={modalState.isOpen}
        handleClose={() =>
          setModalState({
            ...modalState,
            isOpen: false,
          })
        }
      >
        <ModalContent
          items={modalState.items}
          text={modalState.text}
          isMobile={isMobile}
        />
      </s.ProductBannerModal>
    </>
  )
}

export default ProductBanner
