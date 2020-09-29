import React from 'react'

import ButtonIcon from 'components/Button/Icon'
import Icon, { dict } from 'components/IconExporter'

import { CardObjective, IconWrapper, InfosBox, OfferTitle } from './styles'

export default ({ icon, title, isLoading = false, ...rest }: IProps) => (
  <CardObjective {...rest}>
    <IconWrapper>
      <Icon name={icon} width={72} height={72} color="gray4" />
    </IconWrapper>
    <InfosBox>
      <OfferTitle>{title}</OfferTitle>
      <ButtonIcon
        data-gtm-name={title}
        data-gtm-type="click"
        data-gtm-clicktype="button"
        size="small"
        icon="arrowright"
        isLoading={isLoading}
      />
    </InfosBox>
  </CardObjective>
)

interface IProps {
  icon: keyof typeof dict
  title: string
  isLoading?: boolean
}
