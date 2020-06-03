import React from 'react'

import Text from 'components/Text'
import Icon, { dict } from 'components/IconExporter'

import * as s from './styles'

interface IProps {
  items: {
    icon: keyof typeof dict
    text: string
  }[]
  text: string
  isMobile: boolean
}

const ModalContent = ({ items, text, isMobile }: IProps) => (
  <s.ProductBannerContent>
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
    <s.ProductBannerItemsContainer>
      {items &&
        items.map(item => (
          <s.ProductBannerItem md={4} key={`product-item-${item.icon}`}>
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
          </s.ProductBannerItem>
        ))}
    </s.ProductBannerItemsContainer>
  </s.ProductBannerContent>
)

export default ModalContent