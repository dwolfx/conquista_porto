import styled from 'styled-components'
import { fundRiskColors } from 'styles/theme'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import AccordionNewComponent from 'components/AccordionNew'
import { Row, Col } from 'styled-bootstrap-grid'
import Button from 'components/Button'

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
  flexdirection: row;
  min-width: 260px;
  @media ${props => props.theme.mediaQueries.md} {
    min-width: 200px;
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

export const ButtonsWrapper = styled(Col)`
  margin: ${({ theme }) => theme.spacing(2)}px 0;
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
