import styled from 'styled-components'
import { fundRiskColors } from 'styles/theme'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import AccordionNewComponent from 'components/AccordionNew'
import IconExporter from 'components/IconExporter'
import { Row, Col } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import Popover from 'components/Popover'

interface IRiskColorsMap {
  [key: number]: string
}

export const riskColorsMap: IRiskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

export const RowLineInfo = styled(Row)`
  padding: ${({ theme }) => theme.spacing(1)};
  min-height: 77px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const ColContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

interface IBorderRiskProps {
  borderRisk: keyof typeof riskColorsMap
}

export const RiskColorTag = styled.div<IBorderRiskProps>`
  width: 5px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  height: 50px;
  background-color: ${({ borderRisk }) => riskColorsMap[borderRisk]};
  border-radius: 4px;
`
export const VerticalListStyled = styled(VerticalList)`
  padding: 0px;
`

export const AccordionFundInfo = styled(AccordionNewComponent)`
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(1)}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const RowAccordion = styled(Row)`
  padding: 0;
`

export const ColIncome = styled(Col)`
  padding-left: 33px;
`

export const ButtonsWrapper = styled(Col)`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`

export const ColPadding = styled(Col)`
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
`

export const AccordionContent = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: auto;
  border-radius: 8px;
  margin-top: 16px;
`

export const HorizontalListWithLine = styled(HorizontalList)`
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  div {
    padding-right: ${({ theme }) => theme.spacing(1)}px;
  }
  .icon {
    padding-top: 2px;
  }
`

export const DropdownLineContent = styled.div`
  padding: 12px;
  text-align: right;
  width: 100%;
  cursor: pointer;
`

export const ButtonCustom = styled(Button)`
  min-width: 169px;
  margin: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(1)}px;
`

export const LockFundWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${props => props.theme.colors.gray6};
  height: 21px;
  width: 21px;

  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const CustomPopover = styled(Popover)`
  display: flex;
  align-items: center;
`
