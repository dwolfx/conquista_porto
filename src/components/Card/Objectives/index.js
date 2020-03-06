import React from 'react'
import PropTypes from 'prop-types'

import ButtonIcon from 'components/Button/Icon'
import Icon from 'components/IconExporter'

import { CardObjective, IconWrapper, InfosBox, OfferTitle } from './styles'

export default function ObjectivesCard({ icon, title, isLoading, ...rest }) {
  return (
    <CardObjective {...rest}>
      <IconWrapper>
        <Icon name={icon} />
      </IconWrapper>
      <InfosBox>
        <OfferTitle>{title}</OfferTitle>
        <ButtonIcon
          data-gtm-name={title}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          size="small"
          icon="arrowright"
          isLoading={isLoading}
        />
      </InfosBox>
    </CardObjective>
  )
}

ObjectivesCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
}

ObjectivesCard.defaultProps = {
  isLoading: false,
}
