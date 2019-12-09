import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { RiskCaptionWrapper, ColorBox } from './styles'

export default function RiskCaption({ actives, ...props }) {
  const themeContext = useContext(ThemeContext)
  return (
    <RiskCaptionWrapper {...props}>
      <label>Menor risco</label>
      <ColorBox
        className={actives.indexOf(1) >= 0 && 'active'}
        backgroundColor={themeContext.fundRiskColors.lowRisk}
        marginTop="10px"
      />
      <ColorBox
        className={actives.indexOf(2) >= 0 && 'active'}
        backgroundColor={themeContext.fundRiskColors.lowMediumRisk}
        marginTop="8px"
      />
      <ColorBox
        className={actives.indexOf(3) >= 0 && 'active'}
        backgroundColor={themeContext.fundRiskColors.mediumRisk}
        marginTop="6px"
      />
      <ColorBox
        className={actives.indexOf(4) >= 0 && 'active'}
        backgroundColor={themeContext.fundRiskColors.mediumHighRisk}
        marginTop="4px"
      />
      <ColorBox
        className={actives.indexOf(5) >= 0 && 'active'}
        backgroundColor={themeContext.fundRiskColors.highRisk}
        marginTop="2px"
      />
      <label>Maior risco</label>
    </RiskCaptionWrapper>
  )
}

RiskCaption.propTypes = {
  actives: PropTypes.array,
}

RiskCaption.defaultProps = {
  actives: [],
}
