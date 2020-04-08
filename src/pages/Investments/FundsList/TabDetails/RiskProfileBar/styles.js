import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import TextComponent from 'components/Text'

export const RiskProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 28px;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  margin-bottom: 21px;
`

export const FlagIcon = styled(ConquistaIcon).attrs(() => ({
  name: 'flag',
}))`
  height: 21px;
`

export const Title = styled(TextComponent)`
  ${props => props.theme.fontTypes.subheading};
  margin-left: 14px;
  text-transform: uppercase;
`

export const RiskClassification = styled.div`
  display: flex;
  width: 100%;
`

const activeRiskColors = {
  lowRisk: props => props.theme.colors.darkBlue2,
  lowMediumRisk: props => props.theme.colors.blue4,
  mediumRisk: props => props.theme.colors.green3,
  mediumHighRisk: props => props.theme.colors.yellow2,
  highRisk: props => props.theme.colors.magenta2,
}

const inactiveRiskColors = {
  lowRisk: props => props.theme.colors.darkBlue1,
  lowMediumRisk: props => props.theme.colors.blue1,
  mediumRisk: props => props.theme.colors.green1,
  mediumHighRisk: props => props.theme.colors.yellow1,
  highRisk: props => props.theme.colors.magenta1,
}

export const Bar = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;

  & div {
    background-color: ${props =>
      props.selected
        ? activeRiskColors[props.riskColor]
        : inactiveRiskColors[props.riskColor]};
  }

  & p {
    ${props => !props.selected && 'display: none'};
  }
`

export const RiskColor = styled.div`
  height: 7px;
  width: 100%;
`

export const RiskText = styled(TextComponent)`
  ${props => props.theme.fontTypes.caption};
  margin-top: 7px;
  text-transform: capitalize;
`

export const GrayLine = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  height: 1px;
  margin: 0 14px;
`
