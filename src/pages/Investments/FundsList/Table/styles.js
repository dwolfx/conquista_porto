import styled from 'styled-components'
import IconExporter from 'components/IconExporter'
import ConquistaButton from 'components/Button'
import { fundRiskColors } from 'styles/theme'
import TabCmp from 'components/Tab'

const riskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

export const TableWrapper = styled.div`
  display: block;
  overflow-x: auto;
  white-space: nowrap;
`

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: 3rem;
  width: 100%;
`

export const Thead = styled.thead`
  &.sticky {
    position: fixed;
    top: 170px;
    z-index: 1;
  }
`

export const TheadTr = styled.tr`
  background-color: ${props => props.theme.colors.gray4};
  display: block;
`

export const TheadTh = styled.th`
  color: ${props => props.theme.colors.gray6};
  border: 1px solid ${props => props.theme.colors.gray3};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 14px;
  padding: 20px 10px;
  height: 70px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
`

export const TheadThWithColumns = styled(TheadTh)`
  padding-left: 0;
  padding-right: 0;
`

export const TheadColumn = styled.div`
  display: inline-block;
  width: ${props => props.width};
`

export const Tbody = styled.tbody``

export const TbodyTr = styled.tr`
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  display: block;
  margin-top: 1rem;
  width: 100%;
`

export const TBodyTd = styled.td`
  display: inline-block;
  font-size: 14px;
  padding: 30px 0;
  text-align: center;

  &:not(:first-of-type) {
    border-left: 1px solid ${props => props.theme.colors.gray3};
  }

  :first-of-type {
    border-left: 10px solid
      ${props => riskColorsMap[parseInt(props.borderRisk, 10)]};
    border-radius: 4px;
  }
`

export const FundoWrapper = styled.div`
  display: flex;
  line-height: 22px;
  padding: 0 25px;
`

export const LogoImg = styled.img`
  margin-right: 1rem;
  height: auto;
  width: 70px;
`

export const AlertIcon = styled(IconExporter).attrs({ name: 'alertrounded' })`
  cursor: pointer;
  fill: ${props => props.theme.colors.blue4};
  height: 25px;
  margin-left: auto;
  min-width: 25px;
`

export const FundoNameWrapper = styled.p`
  text-align: left;
  max-width: 220px;
`

export const InvestButton = styled(ConquistaButton)`
  width: 80px;
  min-width: 0;
  margin: 0;
  padding: 0;
  height: 40px;
`

export const LockIcon = styled(IconExporter).attrs({ name: 'lock' })`
  fill: ${props => props.theme.colors.gray4};
  width: 28px;
`

export const WrapperContent = styled.div`
  line-height: ${props => (props.lineHeight ? props.lineHeight : '36px')};
  height: 39px;
  white-space: pre-wrap;
`

export const TabsWrapper = styled.div`
  display: flex;
`
export const Tabs = styled(TabCmp)``
