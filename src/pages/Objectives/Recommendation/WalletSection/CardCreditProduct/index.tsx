import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { productCard } from './dataCardCredit'
import * as s from './styles'

interface IObjectCredit {
  name: string
  values: IObjectItem[]
}

interface IObjectItem {
  name: string
  value: string
  info?: boolean
  checked?: boolean
}

interface ICardProps {
  creditProduct: IObjectCredit
}

const singleInfo = (item: IObjectItem, index: number) => (
  <s.InfoItem key={index} lg={12} md={12} sm={4} xs={12}>
    <Text type="captionUppercase" color="gray5">
      {item.name}
    </Text>
    <s.TextValue type="headline" color="gray6">
      {item.value}
      {item.info && (
        <Popover content="A taxa varia de acordo com a quantidade de parcelas contratada.">
          <Icon width={21} name="information" color="gray4" />
        </Popover>
      )}
    </s.TextValue>
  </s.InfoItem>
)

const CardCreditProduct = ({ creditProduct }: ICardProps) => {
  const currentProduct =
    productCard[creditProduct.name] ||
    productCard[creditProduct.name.split(' ')[0]]

  if (!currentProduct) {
    return null
  }

  return (
    <Col lg={3} md={3} sm={12} xs={12}>
      <s.FullHeightCard
        headerIcon={currentProduct.icon}
        headerTitle={creditProduct.name.split(' ')[0]}
      >
        <s.CardContainer>
          <Text type="headline" color="gray6">
            {currentProduct.message}
          </Text>
          {creditProduct.values && creditProduct.values.map((item: IObjectItem, index: number) =>
            singleInfo(item, index)
          )}
          {currentProduct.items.map((item: IObjectItem, index: number) =>
            singleInfo(item, index)
          )}
        </s.CardContainer>
      </s.FullHeightCard>
    </Col>
  )
}

export default CardCreditProduct
