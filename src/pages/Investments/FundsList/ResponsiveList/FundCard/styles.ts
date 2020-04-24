import styled from 'styled-components'

import { Col } from 'styled-bootstrap-grid'
import IconComponent from 'components/IconExporter'
import TextComponent from 'components/Text/index'
import DivisorComponent from 'components/Divisor'
import ButtonComponent from 'components/Button'

enum activeRiskColors {
  baixo = 'lowRisk',
  'medio-baixo' = 'lowMediumRisk',
  medio = 'mediumRisk',
  'medio-alto' = 'mediumHighRisk',
  alto = 'highRisk',
}

interface IRiskLineProps {
  riskColor: keyof typeof activeRiskColors
}

export const ArrowDown = styled(IconComponent).attrs(() => ({
  name: 'arrowdown',
}))`
  height: 21px;
  fill: ${props => props.theme.colors.gray6};
`

export const ArrowUp = styled(IconComponent).attrs(() => ({ name: 'arrowup' }))`
  width: 12px;
  fill: ${props => props.theme.colors.gray6};
`

export const Button = styled(ButtonComponent)`
  width: calc(100% - 28px);
  margin: 0 14px 7px;
`

export const CardCol = styled(Col)`
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 0;
  margin-bottom: 7px;
`

export const CardContent = styled.div`
  width: 100%;
`

export const CardTitle = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))``

export const CategoryName = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${props => props.theme.colors.gray5};
`

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.gray2};
`

export const FirstDivisor = styled(DivisorComponent).attrs(() => ({
  customSize: 'calc(100% - 34px)',
}))`
  margin-left: 13px;
  margin-right: 21px;
`

export const FundInfo = styled.div`
  margin: 14px 14px 14px 6px;
`

export const HeaderContent = styled.div`
  cursor: pointer;
  margin: 19px 21px 21px 20px;
`

export const InfoTitle = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${props => props.theme.colors.gray5};
`

export const InfoValue = styled(TextComponent).attrs(() => ({
  type: 'title',
  bold: true,
}))`
  color: ${props => props.theme.colors.gray6};
`

export const RiskLine = styled.div<IRiskLineProps>`
  width: 4px;
  border-radius: 4px;
  background-color: ${props =>
    props.theme.fundRiskColors[activeRiskColors[props.riskColor]]};
  margin: 4px 0 4px 4px;
`

export const SecondDivisor = styled(DivisorComponent).attrs(() => ({
  customSize: 'calc(100% - 14px)',
}))`
  margin: 14px 7px 21px;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`
