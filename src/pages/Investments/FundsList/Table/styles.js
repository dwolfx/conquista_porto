import styled, { css } from 'styled-components'
import IconExporter from 'components/IconExporter'
import ConquistaButton from 'components/Button'
import { fundRiskColors } from 'styles/theme'
import TabsCmp from 'components/Tabs'

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
    top: 40px;
    z-index: 1;
  }
`

export const TheadTr = styled.tr`
  background-color: ${props => props.theme.colors.gray.medium};
  display: block;
`

export const TheadTh = styled.th`
  color: ${props => props.theme.colors.linkColor};
  border: 1px solid ${props => props.theme.colors.gray.light};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 14px;
  padding: 20px 10px;
  height: 70px;
  text-align: center;
  text-transform: uppercase;
  position: relative;

  ::before {
    ${props =>
      props.hasBefore &&
      css`
        content: '${props.beforeContent}';
        text-align: center;
        vertical-align: middle;
        position: absolute;
        height: 24px;
        right: 0;
        top: -33px;
        padding-top: 8px;
        background: ${props.theme.colors.gray.medium};
        border-top: 0px;
        border-right: 0px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        width: ${props.beforeWidth};
      `}
  }
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
    border-left: 1px solid ${props => props.theme.colors.gray.light};
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
  max-height: 33px;
  max-width: 70px;
`

export const AlertIcon = styled(IconExporter).attrs({ name: 'alertrounded' })`
  height: 25px;
  fill: ${props => props.theme.colors.linkBlue};
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
  fill: ${props => props.theme.colors.gray.medium};
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
export const Tabs = styled(TabsCmp)``
