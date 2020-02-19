import React from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import { ItemColor, RiskCaptionWrapper, ColorBox } from './styles'

export default function NewRiskCaption({ profile }) {
  const colorsProfile = [
    {
      color: 'gray4',
      profile: 'Nenhum Risco',
    },
    {
      color: 'blue4',
      profile: 'Risco Baixo',
    },
    {
      color: 'green3',
      profile: 'Risco Médio',
    },
    {
      color: 'yellow2',
      profile: 'Risco Alto',
    },
    {
      color: 'magenta2',
      profile: 'Total Risco',
    },
  ]
  return (
    <RiskCaptionWrapper>
      {colorsProfile.map((item, index) => (
        <ItemColor key={item.color}>
          <ColorBox
            className={profile === index + 1 ? 'active' : ''}
            backgroundColor={item.color}
          />
          {profile === index + 1 && <Text type="caption">{item.profile}</Text>}
        </ItemColor>
      ))}
    </RiskCaptionWrapper>
  )
}

NewRiskCaption.propTypes = {
  profile: PropTypes.number.isRequired,
}
