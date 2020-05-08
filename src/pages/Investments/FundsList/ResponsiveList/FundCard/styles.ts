import styled from 'styled-components'

import { Col } from 'styled-bootstrap-grid'
import IconExporter from 'components/IconExporter'
import TextComponent from 'components/Text'
import DivisorComponent from 'components/Divisor'
import ButtonComponent from 'components/Button'

export const ArrowDown = styled(IconExporter).attrs(() => ({
  name: 'arrowdown',
}))`
  height: ${props => props.theme.spacing(3)}px;
  fill: ${props => props.theme.colors.gray6};
`

export const ArrowUp = styled(IconExporter).attrs(() => ({ name: 'arrowup' }))`
  width: 12px;
  fill: ${props => props.theme.colors.gray6};
`

export const Button = styled(ButtonComponent)`
  width: calc(100% - 28px);
  margin: 0 14px 7px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing(5)}px;
`

export const CardCol = styled(Col)`
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 0;
  margin-bottom: ${props => props.theme.spacing(1)}px;
`

export const CardContent = styled.div`
  width: 100%;
`

interface ICardHeader {
  noMargin?: boolean
}

export const CardHeader = styled.div<ICardHeader>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props =>
    props.noMargin ? 0 : `${props.theme.spacing(1)}px`};
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
  height: ${props => props.theme.spacing(4)}px;
  width: ${props => props.theme.spacing(4)}px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.gray2};
`

export const CloseButton = styled(ButtonComponent)`
  margin-top: ${props => props.theme.spacing(19)};
`

export const FirstDivisor = styled(DivisorComponent).attrs(() => ({
  customSize: 'calc(100% - 34px)',
}))`
  margin-left: 13px;
  margin-right: ${props => props.theme.spacing(3)}px;
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

export const LockFundWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: ${props => props.theme.spacing(5)}px;
  height: ${props => props.theme.spacing(5)}px;
  margin-right: ${props => props.theme.spacing(1)}px;
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${props => props.theme.colors.gray4};
  height: ${props => props.theme.spacing(3)}px;
  width: ${props => props.theme.spacing(3)}px;
  margin-top: calc(7px / 2);
`

export const ModalText = styled(TextComponent).attrs(() => ({
  type: 'headline',
}))`
  color: ${props => props.theme.colors.gray6};
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(ButtonComponent)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

enum activeRiskColors {
  baixo = 'lowRisk',
  'medio-baixo' = 'lowMediumRisk',
  medio = 'mediumRisk',
  'medio-alto' = 'mediumHighRisk',
  alto = 'highRisk',
}

export const RightContent = styled.div`
  display: flex;
`

interface IRiskLineProps {
  riskColor: keyof typeof activeRiskColors
}

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
  margin-bottom: ${props => props.theme.spacing(1)}px;
`
