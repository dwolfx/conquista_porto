import styled from 'styled-components'
import { Container as ContainerBootstrap, Row } from 'styled-bootstrap-grid'

import CardCmp from 'components/Card'
import { CardBody } from 'components/Card/styles'
import MoneyInputCmp from 'components/Inputs/Money'
import TableComp from 'components/Table'
import Text from 'components/Text'
import PercentualInfosCmp from 'pages/Objectives/Recommendation/components/PercentualInfo'

export const Container = styled(ContainerBootstrap)<{ isFirst?: boolean }>`
  padding: ${({ theme, isFirst }) =>
    isFirst
      ? `0 ${theme.spacing(2)}px ${theme.spacing(9)}px`
      : `0 ${theme.spacing(2)}px`};
  padding-top: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding-left: 0;
    padding-right: 0;
  }
`

export const InformativeRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const CardTable = styled(CardCmp)`
  height: calc(100vh - 289px);

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
`

export const Table = styled(TableComp)`
  height: calc(100% - 77px);
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
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

export const MoneyInput = styled(MoneyInputCmp)`
  height: 35px;
  ${({ theme }) => theme.fontTypes.body};
`

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  bottom: 0;
  left: 0;
  padding: ${({ theme }) => theme.spacing(1)}px 0;
  position: fixed;
  width: 100vw;

  button {
    &:last-of-type {
      margin-left: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const CompositionRow = styled(Row)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column-reverse;
  }
`
