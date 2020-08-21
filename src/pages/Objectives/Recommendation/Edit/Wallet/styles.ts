import styled from 'styled-components'
import { Container as ContainerBootstrap, Row } from 'styled-bootstrap-grid'

import MoneyInputCmp from 'components/Inputs/Money'
import TableComp from 'components/Table'
import Text from 'components/Text'

export const Container = styled(ContainerBootstrap)<{ isFirst?: boolean }>`
  padding: ${({ theme, isFirst }) =>
    isFirst
      ? `0 ${theme.spacing(2)}px ${theme.spacing(9)}px`
      : `0 ${theme.spacing(2)}px`};

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding-left: 0;
    padding-right: 0;
  }
`

export const Table = styled(TableComp)``

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
  padding: ${({ theme }) => theme.spacing(1.5)}px 0;
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
