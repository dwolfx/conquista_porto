import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Text from 'components/Text'
import { ThemeContext } from 'styled-components'
import { ItemColor, RiskCaptionWrapper, ColorBox } from './styles'

export default function NewRiskCaption({ profile }) {
  const themeContext = useContext(ThemeContext)
  const colorsProfile = [
    {
      color: 'lowRisk',
      profile: 'Nenhum Risco',
    },
    {
      color: 'lowMediumRisk',
      profile: 'Risco Baixo',
    },
    {
      color: 'mediumRisk',
      profile: 'Risco Médio',
    },
    {
      color: 'mediumHighRisk',
      profile: 'Risco Alto',
    },
    {
      color: 'highRisk',
      profile: 'Total Risco',
    },
  ]
  return (
    <RiskCaptionWrapper>
      {colorsProfile.map((item, index) => (
        <ItemColor key={item.color}>
          <ColorBox
            className={profile === index + 1 ? 'active' : ''}
            backgroundColor={themeContext.fundRiskColorsNew[item.color]}
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
