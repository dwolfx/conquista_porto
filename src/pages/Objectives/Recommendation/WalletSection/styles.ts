import styled, { css } from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import DivisorComponent from 'components/Divisor'
import ArrowSortable from 'assets/icons/arrow-sortable.svg'
import IconExporter from 'components/IconExporter'
import Text from 'components/Text'
import TableComp from 'components/TableNew'

import { fundRiskColors } from 'styles/theme'

export const Table = styled(TableComp)`
  table {
    height: 442px;
  }
`

export const ContainerFunds = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const ResponsiveTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  & > p {
    margin: 0 0 14px 14px;
  }
`

export const TableCard = styled.div`
  padding: 7px 0;

  p {
    margin-bottom: 7px;
  }
`

export const TableDivisor = styled(DivisorComponent)`
  margin: 21px 0;
`

export const ResponsiveTableButton = styled(Button)`
  width: 100%;
  align-self: center;
`

interface IWrapper {
  lineHeight?: string
  isThead?: boolean
  isTbody?: boolean
  isBold?: boolean
}

export const WrapperContent = styled.div<IWrapper>`
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
  width: 100%;
`

export const Thead = styled.thead`
  width: 100%;
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

interface ITheadTh {
  canSort: boolean
}

export const TheadTh = styled.th<ITheadTh>`
  cursor: ${props => (props.canSort ? 'pointer' : 'default')};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 15px;
  position: relative;
  height: 100%;
  margin-left: 21px;
  padding-right: 14px;

  &:last-child {
    margin-right: 21px;
  }
`

interface ITheadContent {
  justifyHeader: string
  isTbody: boolean
}

export const TheadContent = styled.div<ITheadContent>`
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

const getArrowPosition = (isSortedDesc: boolean) =>
  isSortedDesc ? 'right -8px' : 'right 8px'

const getArrowTop = (isSortedDesc: boolean) => (isSortedDesc ? '23px' : '16px')

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

interface ITheadText {
  isSorted: boolean
  isSortedDesc: boolean
}

export const TheadText = styled.span<ITheadText>`
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

interface ITheadColumn {
  width: string
}

export const TheadColumn = styled.div<ITheadColumn>`
  display: inline-block;
  width: ${props => props.width};
`

export const Tbody = styled.tbody`
  border: 1px solid ${props => props.theme.colors.gray2};
  width: 100%;
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

interface ITbodyTd {
  align: string
}

export const TbodyTd = styled.td<ITbodyTd>`
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

const riskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

interface IRiskColorTag {
  borderRisk: 1 | 2 | 3 | 4 | 5
}

export const RiskColorTag = styled.div<IRiskColorTag>`
  width: 5px;
  background-color: ${props => riskColorsMap[props.borderRisk]};
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

interface ILogoImg {
  bg: string
}

export const LogoImg = styled.div<ILogoImg>`
  background-image: ${props => `url(${props.bg})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left, left;
  width: 75px;
`

export const InformationIcon = styled(IconExporter)`
  cursor: pointer;
  fill: ${props => props.theme.colors.blue4};
  height: 25px;
  margin-left: auto;
  min-width: 25px;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`

export const InfoContent = styled.div`
  margin: 22px 0;
`

export const InfoRow = styled(Row)`
  display: flex;
  margin-top: ${props => props.theme.spacing(3)}px;
  padding: 0 ${props => props.theme.spacing(4)}px;
`

export const PercentualInfosContainer = styled(Row)`
  display: flex;
  margin-bottom: ${props => props.theme.spacing(2.5)}px;
  margin-top: ${props => props.theme.spacing(6)}px;
  padding: 0 ${props => props.theme.spacing(4)}px;
`
