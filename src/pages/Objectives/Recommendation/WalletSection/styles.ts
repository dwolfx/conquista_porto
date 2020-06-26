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
  background-color: ${({ borderRisk }) => riskColorsMap[borderRisk]};
  border-radius: 4px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
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
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
`

export const PercetualInfosWrapper = styled.div`
  flex: 1;
  padding-left: ${({ theme }) => theme.spacing(1)}px;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
`

export const LabelInfosWrapper = styled.div`
  padding-right: ${({ theme }) => theme.spacing(4)}px;
`

export const PercentualInfosContainer = styled(Row)`
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }
`

export const PercentualText = styled(Text)`
  &:nth-child(2n) {
    border-left: 1px solid ${({ theme }) => theme.colors.gray6};
    flex: 1;
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    &:not(:last-child) {
      border-right: 0;
      padding-right: 0;
      margin-right: 0;
    }
  }
`

export const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  & > p {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const Popover = styled(PopoverComp)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const InlineContentText = styled.span`
  display: inline-flex;
`

export const TextUnderlined = styled(Text)`
  text-decoration: underline;
`

export const LabelRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(2.5)}px;
  margin-top: ${({ theme }) => theme.spacing(6)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: ${({ theme }) => theme.spacing(7)}px;
    margin-top: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const IconContainer = styled.div`
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: ${({ theme }) => theme.spacing(6)}px;
    margin-top: ${({ theme }) => theme.spacing(6)}px;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    margin-top: ${({ theme }) => theme.spacing(0)}px;
  }
`

export const DashedText = styled(Text)`
  display: inline;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray4};
  /* margin-right: ${({ theme }) => theme.spacing(1)}px; */
`
