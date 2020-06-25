import styled, { DefaultTheme } from 'styled-components'

import TextComponent from 'components/Text'

export const RiskProfileWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px 0
    ${({ theme }) => theme.spacing(4)}px 0;

  @media ${props => props.theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px
      ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(3)}px;
  }
`

export const RiskClassification = styled.div`
  display: flex;
  width: 100%;
`

interface IRiskColors {
  [index: string]: {}
}

interface IProps {
  theme: DefaultTheme
}

const activeRiskColors = {
  lowRisk: (props: IProps) => props.theme.colors.darkBlue2,
  lowMediumRisk: (props: IProps) => props.theme.colors.blue4,
  mediumRisk: (props: IProps) => props.theme.colors.green3,
  mediumHighRisk: (props: IProps) => props.theme.colors.yellow2,
  highRisk: (props: IProps) => props.theme.colors.magenta2,
} as IRiskColors

const inactiveRiskColors = {
  lowRisk: (props: IProps) => props.theme.colors.darkBlue1,
  lowMediumRisk: (props: IProps) => props.theme.colors.blue1,
  mediumRisk: (props: IProps) => props.theme.colors.green1,
  mediumHighRisk: (props: IProps) => props.theme.colors.yellow1,
  highRisk: (props: IProps) => props.theme.colors.magenta1,
} as IRiskColors

export interface IBar {
  selected: boolean
  riskColor: string
}

export const Bar = styled.div<IBar>`
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;

  & div {
    background-color: ${(props: IBar) =>
      props.selected
        ? activeRiskColors[props.riskColor]
        : inactiveRiskColors[props.riskColor]};
  }

  & p {
    ${props => !props.selected && 'display: none'};
  }
`

export const RiskColor = styled.div`
  height: ${({ theme }) => theme.spacing(1)}px;
  width: 100%;
`

export const RiskText = styled(TextComponent).attrs(() => ({
  type: 'caption',
}))`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  text-transform: capitalize;

  @media ${props => props.theme.mediaQueries.xs} {
    width: max-content;
  }
`
