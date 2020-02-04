import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

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

const ModalContent = ({ items, text }) => (
  <ProductBannerContent>
    <Text
      type="headline"
      color="gray6"
      css={`
        margin-bottom: 10px;
      `}
    >
      {text}
    </Text>
    <ProductBannerItemsContainer>
      {items &&
        items.map(item => (
          <ProductBannerItem md="4">
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
  const renderedProducts = Object.entries(additional)
    .filter(value => value[1] === true)
    .map(item => products[item[0]])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const [modalItems, setModalItems] = useState([])

  return (
    <>
      <GridRow>
        {renderedProducts.map(product => (
          <Col
            key={product.title}
            lg={renderedProducts.length === 2 ? '6' : '12'}
            xs={12}
          >
            <BannerTips lg={12} image={product.image}>
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
                    setModalTitle(product.modalInfos.title)
                    setModalText(product.modalInfos.text)
                    setModalItems(product.modalInfos.items)
                    setIsModalOpen(true)
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
        modalTitle={modalTitle}
        alignItems="center"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <ModalContent items={modalItems} text={modalText} />
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
}

ModalContent.defaultProps = {
  text: '',
  items: [
    {
      icon: 'creditcard',
      text: '',
    },
  ],
}

export default SectionThree
