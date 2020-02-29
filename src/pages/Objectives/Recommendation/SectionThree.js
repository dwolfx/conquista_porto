import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import { dataLayerProductSuggestion } from 'GoogleTagManager'

import useMedia from 'hooks/useMedia'

import products from './productBannerData'
import {
  BannerTips,
  GridRow,
  ButtonContainer,
  ProductBannerModal,
  ProductBannerContent,
  ProductBannerItem,
  ProductBannerItemsContainer,
} from './styles'

const ModalContent = ({ items, text, isMobile }) => (
  <ProductBannerContent>
    <Text
      type="headline"
      color="gray6"
      css={`
        margin-bottom: 10px;
        text-align: ${isMobile ? 'center' : 'unset'};
      `}
    >
      {text}
    </Text>
    <ProductBannerItemsContainer>
      {items &&
        items.map(item => (
          <ProductBannerItem md="4" key={`product-item-${item.icon}`}>
            <Icon
              name={item.icon}
              color="blue4"
              css={`
                max-width: 50px;
                max-height: 50px;
              `}
            />
            <Text
              css={`
                margin-top: 21px;
              `}
            >
              {item.text}
            </Text>
          </ProductBannerItem>
        ))}
    </ProductBannerItemsContainer>
  </ProductBannerContent>
)

const SectionThree = ({ additional }) => {
  const dataLayerProducts = []
  const isMobile = useMedia('sm')
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

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    text: '',
    items: [],
  })

  return (
    <>
      <GridRow>
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
              {isMobile ? (
                <>
                  <Text bold type="captionUppercase">
                    {product.category}
                  </Text>
                  <Text bold type="heading4">
                    {product.title}
                  </Text>
                  <Text>{product.text}</Text>
                </>
              ) : (
                <>
                  <Text type="captionUppercase">{product.category}</Text>
                  <Text type="heading3">{product.title}</Text>
                  <Text
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
            </BannerTips>
          </Col>
        ))}
      </GridRow>
      <ProductBannerModal
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
      </ProductBannerModal>
    </>
  )
}

SectionThree.propTypes = {
  additional: PropTypes.object,
}

SectionThree.defaultProps = {
  additional: {},
}

ModalContent.propTypes = {
  text: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  isMobile: PropTypes.bool,
}

ModalContent.defaultProps = {
  text: '',
  items: [
    {
      icon: 'creditcard',
      text: '',
    },
  ],
  isMobile: false,
}

export default SectionThree
