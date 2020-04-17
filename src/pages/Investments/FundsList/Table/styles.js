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
    props.isBold &&
    css`
      font-weight: 600;
      color: ${props.theme.colors.gray6};
    `}
`

export const InfoTableContent = styled.tr`
  margin: auto;
  width: 428px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 0 35px;
  white-space: pre-line;
  text-align: center;
`

export const TableWrapper = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  height: auto;
`

export const Table = styled.table`
  border-collapse: collapse;
  height: 69vh;
`

export const Thead = styled.thead`
  width: 1238px;
`
export const TheadTr = styled.tr`
  display: block;
  padding: 0px 6px;
  height: 56px;
  background-color: ${props => props.theme.colors.gray1};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid ${props => props.theme.colors.gray2};
`

export const TheadTh = styled.th`
  cursor: ${props => (props.canSort ? 'pointer' : 'default')};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 15px;
  position: relative;
  height: 100%;
  margin-left: 21px;
  padding-right: 14px
  &:last-child {
    margin-right: 21px;
  }
`

export const TheadContent = styled.div`
  white-space: pre-wrap;
  height: inherit;
  display: flex;
  justify-content: ${props => props.justifyHeader || 'center'};
  align-items: center;
  ${props =>
    props.isTbody &&
    css`
      height: 99px;
      padding: 30px 0;
    `};
`

const getArrowPosition = isSortedDesc =>
  isSortedDesc ? 'right -8px' : 'right 8px'

const getArrowTop = isSortedDesc => (isSortedDesc ? '23px' : '16px')

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
    position: absolute;
    margin-left: 10px;
    top: ${props =>
      props.isSorted ? getArrowTop(props.isSortedDesc) : '19px'};
    width: 10px;
    height: 17px;
  }
`

export const TheadColumn = styled.div`
  display: inline-block;
  width: ${props => props.width};
`

export const Tbody = styled.tbody`
  border: 1px solid ${props => props.theme.colors.gray2};
  width: 1238px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: block;
`

export const TbodyTr = styled.tr`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  color: ${props => props.theme.colors.gray5};
  font-weight: normal;
  cursor: pointer;
  padding: 3px 0 3px 3px;
  display: block;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`

export const TbodyTd = styled.td`
  display: inline-block;
  font-size: 14px;
  padding: 0;
  text-align: center;
  margin-left: 21px;
  text-align: ${props => props.align || 'center'};

  &:last-child {
    margin-right: 21px;
  }
  &:first-child {
    margin-left: 0px;
  }
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
  height: 25px;
  width: 25px;
`

export const CustomPopover = styled(Popover)`
  width: 28px;
  display: flex;
  margin: 0 auto;
  z-index: 20;
`
