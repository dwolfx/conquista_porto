import React from 'react'
import { uuid } from 'uuidv4'

import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { formatMoney } from 'helpers'
import { ICreditProduct } from 'store/modules/Objective/types'

import { productCard } from './dataCardCredit'
import { PopoverContentContainer } from '../styles'
import * as s from './styles'

interface IObjectItem {
  name: string
  value: string | number
  checked?: boolean
  info?: React.ReactNode
}

interface ICardProps {
  creditProduct: ICreditProduct
}

const singleInfo = (creditCardProductsInfos: IObjectItem[]) =>
  creditCardProductsInfos
    ? creditCardProductsInfos.map(item => (
        <s.InfoItem key={uuid()}>
          <Text type="captionUppercase" color="gray5">
            {item.name}
          </Text>
          <s.TextValue type="headline" color="gray6" bold>
            {isNaN(+item.value) ? item.value : formatMoney(item.value)}
            {item.info && (
              <Popover
                content={
                  <PopoverContentContainer>{item.info}</PopoverContentContainer>
                }
              >
                <Icon width={21} name="information" color="gray4" />
              </Popover>
            )}
          </s.TextValue>
        </s.InfoItem>
      ))
    : null

const CardCreditProduct = ({ creditProduct }: ICardProps) => {
  if (!creditProduct) {
    return null
  }

  const currentProduct =
    productCard[creditProduct.name] ||
    productCard[creditProduct.name.split(' ')[0]]

  if (!currentProduct) {
    return null
  }

  return (
    <s.FullHeightCard
      headerIcon={currentProduct.icon}
      headerTitle={creditProduct.name.split(' ')[0]}
    >
      <s.CardContainer>
        <Text type="headline" color="gray6">
          {currentProduct.message}
        </Text>
        <s.InfoRow justifyContent="between">
          {creditProduct && singleInfo([creditProduct])}
          {singleInfo(currentProduct.items)}
        </s.InfoRow>
      </s.CardContainer>
    </s.FullHeightCard>
  )
}

export default CardCreditProduct
