import styled, { css } from 'styled-components'
import IconExporter from 'components/IconExporter'
import ConquistaButton from 'components/Button'
import { fundRiskColors } from 'styles/theme'
import ArrowSortable from 'assets/icons/arrow-sortable.svg'
import Popover from 'components/Popover'

const riskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

export const WrapperContent = styled.div`
  line-height: ${props => (props.lineHeight ? props.lineHeight : '36px')};
  white-space: pre-wrap;

  ${props =>
    props.isThead &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}

  ${props =>
    props.isPercent &&
    css`
      font-weight: 600;
      color: ${props.theme.colors.gray6};
    `}
`

export const TableWrapper = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  height: 490px;
`

export const Table = styled.table`
  border-collapse: collapse;
  // margin: 3rem auto 0;
`

export const Thead = styled.thead`
  &.sticky {
    position: fixed;
    top: 73px;
    z-index: 1;
  }
`

export const TheadTr = styled.tr`
  background-color: ${props => props.theme.colors.gray4};
  display: block;
`

const getArrowPosition = isSortedDesc =>
  isSortedDesc ? 'right -5px' : 'right 5px'

export const TheadTh = styled.th`
  border: 1px solid ${props => props.theme.colors.gray3};
  color: ${props => props.theme.colors.gray6};
  cursor: ${props => (props.canSort ? 'pointer' : 'default')};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 14px;
  padding: 0 13px;
  height: 70px;
  position: relative;
`

export const TheadThWithColumns = styled(TheadTh)`
  padding: 12px 0 0;

  ${WrapperContent} {
    border-top: 1px solid ${props => props.theme.colors.gray3};
    display: flex;
    margin-top: 7px;

    span::after {
      top: 45px;
      right: initial;
    }
  }
`

export const TheadText = styled.span`
  user-select: none;

  &::after {
    content: '';
    background-image: url(${ArrowSortable});
    background-repeat: no-repeat;
    background-position: ${props =>
      props.isSorted ? getArrowPosition(props.isSortedDesc) : 'right center'};
    height: 12px;
    position: absolute;
    right: ${props => props.right};
    top: ${props => props.top};
    width: 12px;
  }
`

export const TheadColumn = styled.div`
  display: inline-block;
  width: ${props => props.width};
`

export const Tbody = styled.tbody``

export const TbodyTr = styled.tr`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  color: ${props => props.theme.colors.gray5};
  font-weight: normal;
  padding: 3px 0 3px 3px;
  // border-radius: 4px;
  display: block;
  // margin-top: 1rem;
  width: 100%;
`

export const TbodyTd = styled.td`
  display: inline-block;
  font-size: 14px;
  padding: 0;
  text-align: center;

  // &:not(:first-of-type) {
  //   border-left: 1px solid ${props => props.theme.colors.gray3};
  // }

  // :first-of-type {
  //   border-left: 10px solid
  //     ${props => riskColorsMap[parseInt(props.borderRisk, 10)]};
  // }
`

export const RiskColorTag = styled.div`
  width: 5px;
  background-color: ${props => riskColorsMap[parseInt(props.borderRisk, 10)]};
  border-radius: 4px;
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  max-height: 70px;
  padding: 9px 14px 8px 20px;
  width: 100%;
`

export const FundoOutterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // padding-left: 25px;
`

export const LogoImg = styled.div`
  background-image: ${props => `url(${props.bg})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left, left;
  width: 75px;
`

export const InformationIcon = styled(IconExporter).attrs(() => ({
  name: 'information',
}))`
  cursor: pointer;
  fill: ${props => props.theme.colors.blue4};
  height: 25px;
  margin-left: auto;
  min-width: 25px;
`

export const FundoNameWrapper = styled.p`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`

export const InvestButton = styled(ConquistaButton)`
  width: 80px;
  min-width: 0;
  margin: 0;
  padding: 0;
  height: 40px;
`

export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock' }))`
  fill: ${props => props.theme.colors.gray4};
  width: 28px;
`

export const PopoverCustom = styled(Popover)`
  width: 28px;
  margin: 0 auto;
`
