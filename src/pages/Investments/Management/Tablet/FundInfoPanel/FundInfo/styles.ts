import styled from 'styled-components'
import { fundRiskColors } from 'styles/theme'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import AccordionNewComponent from 'components/AccordionNew'
import { Row } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import IconExporter from 'components/IconExporter'
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
  padding: ${({ theme }) => theme.spacing(1)}px;
  min-height: 77px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const CaroselContent = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px 0px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`

export const ColContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 260px;
  @media ${props => props.theme.mediaQueries.md} {
    min-width: 200px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    min-width: 190px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    min-width: 180px;
  }

  @media (max-width: 390px) {
    min-width: 155px;
  }

  @media (max-width: 322px) {
    min-width: 130px;
  }
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

export const RowWithoutPadding = styled(Row)`
  padding: 0;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  align-items: center;
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

  @media ${props => props.theme.mediaQueries.xs} {
    min-width: calc(50% - 14px);
  }
`

export const ButtonClosed = styled(Button).attrs(() => ({
  color: 'primary',
  outline: true,
  disabled: true,
  loading: false,
}))`
  min-width: 169px;
  margin: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(1)}px;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    min-width: calc(50% - 14px);
  }
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${({ theme }) => theme.colors.gray3};
  height: 21px;
  width: 21px;

  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const CustomPopover = styled(Popover)`
  display: flex;
  align-items: center;
  height: 30px;
`
