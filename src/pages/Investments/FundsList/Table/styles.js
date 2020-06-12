import styled, { css } from 'styled-components'
import IconExporter from 'components/IconExporter'
import ConquistaButton from 'components/Button'
import { fundRiskColors } from 'styles/theme'
import ArrowSortable from 'assets/icons/arrow-sortable.svg'
import Popover from 'components/Popover'
import Text from 'components/Text'
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

export const ErrorText = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  width: 357px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const InfoTableContainer = styled.div`
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 4px;
  justify-content: center;
`

export const InfoTableContent = styled.div`
  padding: 0 35px;
  white-space: pre-line;
  text-align: center;
`
export const TableWrapper = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  height: auto;
  width: 100%;
`
export const Table = styled.div`
  border-collapse: collapse;
  height: 69vh;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.gray3};
  &.sticky {
    overflow: auto;
    .header {
      position: sticky;
      z-index: 1;
      width: fit-content;
    }
    .header {
      top: 0;
    }
    .body {
      position: relative;
      z-index: 0;
      height: auto;
      width: fit-content;
    }
    [data-sticky-td] {
      position: sticky;
    }
    [data-sticky-first-right-td] {
      &:before {
        content: '';
        box-shadow: ${props => props.theme.shadows.gray3};
      }
    }
  }
`
export const Thead = styled.div`
  width: 100%;
  position: sticky;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  top: 0;
  z-index: 4;
`
export const TheadTr = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  background-color: ${props => props.theme.colors.gray1};
`
export const TheadTh = styled.div`
  cursor: ${props => (props.canSort ? 'pointer' : 'default')};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 15px;
  background-color: inherit;
  position: relative;
  height: 100%;
  min-width: ${props => {
    if (props.minWidth) {
      return typeof props.minWidth === 'string'
        ? props.minWidth
        : `${props.minWidth}px`
    }
    return 0
  }};
  width: ${props => {
    if (props.width) {
      return typeof props.width === 'string' ? props.width : `${props.width}px`
    }
    return 'auto'
  }};
  &:nth-child(2) {
    padding-right: 0;
  }
  &:last-child {
    padding-right: ${props => props.theme.spacing(3)}px;
  }
`
export const TheadContent = styled.div`
  align-items: center;
  white-space: pre-wrap;
  height: inherit;
  display: flex;
  padding-left: ${props => props.theme.spacing(3)}px;
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
    margin-top: ${props => props.theme.spacing(1)}px;
    span::after {
      top: 45px;
      right: initial;
    }
  }
`
export const TheadText = styled(Text).attrs(() => ({
  type: 'subheading',
  bold: true,
}))`
  user-select: none;
  ${props =>
    props.showSortArrows &&
    `
  &::after {
    content: '';
    background-image: url(${ArrowSortable});
    background-repeat: no-repeat;
    background-position: ${
      props.isSorted ? getArrowPosition(props.isSortedDesc) : 'right center'
    };
    position: absolute;
    margin-left: 10px;
    top: ${props.isSorted ? getArrowTop(props.isSortedDesc) : '19px'};
    width: 10px;
    height: 17px;
  }
  `}
`
export const TheadColumn = styled.div`
  display: inline-block;
  width: ${props => props.width};
`
export const Tbody = styled.div`
  height: calc(100% - 57px);
  overflow: auto;
  display: block;
  @media ${props => props.theme.mediaQueries.lg} {
    border-right: 0;
    overflow: unset;
  }
  @media ${props => props.theme.mediaQueries.md} {
    border-right: 0;
    overflow: unset;
  }
`
export const TbodyTr = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  color: ${props => props.theme.colors.gray5};
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
  &:last-child {
    border: none;
  }
`
export const TbodyTd = styled.div`
  background-color: inherit;
  display: flex;
  justify-content: ${props => props.align};
  font-size: 14px;
  padding-left: ${props => props.theme.spacing(3)}px;
  text-align: center;
  min-width: ${props => {
    if (props.minWidth) {
      return props.minWidth === 'string'
        ? props.minWidth
        : `${props.minWidth}px`
    }
    return 0
  }};
  width: ${props => {
    if (props.width) {
      return typeof props.width === 'string' ? props.width : `${props.width}px`
    }
    return 0
  }};
  &:last-child {
    padding-right: ${props => props.theme.spacing(1)}px;
    padding-left: ${props => props.theme.spacing(2)}px;
  }
  &:first-child {
    padding: 3px 0 3px 3px;
    margin-left: 0px;
  }
`
export const StickyDivisor = styled.div`
  border-left: 1px solid ${props => props.theme.colors.gray6};
  height: calc(100% - 7px);
  opacity: 0.14;
  position: absolute;
  width: 2px;
  z-index: 2;
  ${props =>
    props.side === 'left'
      ? `left: ${props.position}px`
      : `right: ${props.position}px`};
  &:before {
    content: '';
    background-color: ${props => props.theme.colors.gray6};
    filter: blur(2px);
    height: 100%;
    position: absolute;
    top: 0;
    width: 2px;
    ${props => (props.side === 'right' ? `left: -4px` : `right: -1px`)};
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
  justify-content: center;
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
export const FundoNameWrapper = styled(Text).attrs(() => ({ type: 'body' }))`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
  margin-bottom: 4px;
`
export const InvestButton = styled(ConquistaButton)`
  width: 80px;
  min-width: 0;
  margin: 0;
  padding: 0;
  height: 40px;
`
export const SizedInvestButton = styled(ConquistaButton)`
  min-width: 112px;
`
export const LockIcon = styled(IconExporter).attrs(() => ({ name: 'lock2' }))`
  fill: ${props => props.theme.colors.gray6};
  height: 24px;
  width: 24px;
`
export const CustomPopover = styled(Popover)`
  width: 28px;
  display: flex;
  margin: 0 auto;
`
