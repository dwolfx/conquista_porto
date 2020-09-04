import styled from 'styled-components'
import { Container as ContainerBootstrap, Row } from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import CardCmp from 'components/Card'
import { CardBody } from 'components/Card/styles'
import MoneyInputCmp from 'components/Inputs/Money'
import TableComp from 'components/Table'
import Text from 'components/Text'
import PercentualInfosCmp from 'pages/Objectives/Recommendation/components/PercentualInfo'

export const Container = styled(ContainerBootstrap)<{ isFirst?: boolean }>`
  padding: ${({ theme, isFirst }) =>
    isFirst
      ? `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(9)}px`
      : `0 ${theme.spacing(2)}px`};

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
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px ${theme.spacing(2)}px`};
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
  z-index: 1;

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

export const TotalAmountDistributed = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(4)}px`};
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 127px;
  margin-right: ${({ theme }) => `${theme.spacing(30)}px`};

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const InitialAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 168px;
  margin-right: ${({ theme }) => `${theme.spacing(10)}px`};

  & > p:first-child,
  & > p:first-child + p {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const MonthlyAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 168px;

  & > p:first-child,
  & > p:first-child + p {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  }

  p + p {
    margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  }
`

export const ToDistributeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};

  p + p {
    margin-left: ${({ theme }) => `${theme.spacing(1)}px`};
    margin-top: 0;
  }
`

export const Button = styled(ButtonComponent)`
  width: 104px;
`
