import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import PopoverComp from 'components/Popover'
import Text from 'components/Text'
import { fundRiskColors } from 'styles/theme'

const riskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

interface IRiskColorTag {
  borderRisk: 1 | 2 | 3 | 4 | 5
}

export const RiskColorTag = styled.div<IRiskColorTag>`
  width: 5px;
  background-color: ${props => riskColorsMap[props.borderRisk]};
  border-radius: 4px;

  @media ${props => props.theme.mediaQueries.sm} {
    height: calc(100% - 8px);
    left: 4px;
    position: absolute;
    top: 4px;
  }
`

export const InfoContent = styled.div`
  margin: 22px 0;
`

export const InfoRow = styled(Row)`
  display: flex;
  margin-top: ${props => props.theme.spacing(3)}px;
  padding: 0 ${props => props.theme.spacing(4)}px;
`

export const PercentualInfosContainer = styled(Row)`
  display: flex;
  margin-bottom: ${props => props.theme.spacing(2.5)}px;
  margin-top: ${props => props.theme.spacing(6)}px;
  padding: 0 ${props => props.theme.spacing(4)}px;
`

export const PercentualText = styled(Text)`
  &:not(:first-child) {
    border-left: 1px solid ${props => props.theme.colors.gray6};
    padding-left: ${props => props.theme.spacing(2)}px;
    margin-left: ${props => props.theme.spacing(2)}px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    &:not(:first-child) {
      border-left: 0;
      padding-left: 0;
      margin-left: 0;
    }
  }
`

export const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const Popover = styled(PopoverComp)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 ${props => props.theme.spacing(1)}px;
`

export const InlineContentText = styled.span`
  display: inline-flex;
`

export const TextUnderlined = styled(Text)`
  text-decoration: underline;
`

export const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const Popover = styled(PopoverComp)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 ${props=> props.theme.spacing(1)}px;
`

export const TextUnderlined = styled(Text)`
  text-decoration: underline;
`
