import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import Icon from 'components/IconExporter'

import Button from 'components/Button'
import { CardWrapper, CardIcon, CardTitle } from './styles'

export default function CardObjective({
  cardIcon,
  cardPath,
  cardTitle,
  ...rest
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <CardWrapper {...rest}>
      <CardIcon>
        <Icon
          name={cardIcon}
          fill={themeContext.fundRiskColors.lowMediumRisk}
        />
      </CardIcon>
      <CardTitle>{cardTitle}</CardTitle>
      <Button path={cardPath}>Escolher</Button>
    </CardWrapper>
  )
}

CardObjective.defaultProps = {
  cardIcon: null,
  cardPath: null,
  cardTitle: null,
}

CardObjective.propTypes = {
  cardIcon: PropTypes.string,
  cardPath: PropTypes.string,
  cardTitle: PropTypes.string,
}
