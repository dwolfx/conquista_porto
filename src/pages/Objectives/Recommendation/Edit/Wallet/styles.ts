import styled from 'styled-components'
import {
  Container as ContainerBootstrap,
  Row as RowCmp,
  Col as ColCmp,
} from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import CardCmp from 'components/Card'
import { CardBody } from 'components/Card/styles'
import MoneyInputCmp from 'components/Inputs/Money'
import PercentualInfosCmp from 'components/Objective/PercentualInfo'
import TableComp from 'components/Table'
import Text from 'components/Text'
import TableLabel from 'pages/Objectives/Recommendation/WalletSection/TableView/TableLabel'
import { LabelRow } from '../../WalletSection/TableView/styles'

export const Container = styled(ContainerBootstrap)<{ isFirst?: boolean }>`
  padding: ${({ theme, isFirst }) =>
    isFirst
      ? `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(9)}px`
      : `0 ${theme.spacing(2)}px`};

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding-left: 0;
    padding-right: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    max-width: unset;
  }
`

export const Row = styled(RowCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Col = styled(ColCmp)`
  margin: 0px 0px ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px 0px 0px;
  }
`

export const CardTable = styled(CardCmp)`
  height: 100%;

  ${CardBody} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

export const TextCompositionWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`

export const PercentualInfos = styled(PercentualInfosCmp)`
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

export const Table = styled(TableComp)``

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px ${theme.spacing(3)}px`};
  width: 100%;
`

export const FundoOutterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`

export const MoneyInput = styled(MoneyInputCmp)<any>`
  height: 35px;
  width: 168px;

  ${({ theme }) => theme.fontTypes.body};

  &:before {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray3 : 'transparent'};
    border-radius: 8px 8px 0 0;
    opacity: 0.4;
  }
`

export const TableLabelWithMargim = styled(TableLabel)`
  ${LabelRow} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  bottom: 0;
  left: 0;
  padding: ${({ theme }) => theme.spacing(1)}px 0;
  position: fixed;
  width: 100vw;
  z-index: 6;

  button {
    &:last-of-type {
      margin-left: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const CompositionRow = styled(RowCmp)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column-reverse;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Button = styled(ButtonComponent)`
  width: 104px;
`

export const TableInfosWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
  flex-direction: column;
`

export const SaveButtonTooltipContent = styled.div`
  max-width: 280px;
`
