import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import ButtonIcon from 'components/Button/Icon'
import Icon from 'components/IconExporter'

import { CardObjective, IconWrapper, InfosBox, OfferTitle } from './styles'

export default function ObjectivesCard({ icon, title, link, ...rest }) {
  const history = useHistory()

  return (
    <CardObjective
      onClick={() => {
        history.push(link)
      }}
      {...rest}
    >
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
        />
      </InfosBox>
    </CardObjective>
  )
}

ObjectivesCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}
