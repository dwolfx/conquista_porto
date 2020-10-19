import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'
import Card from 'components/Card'
import Text from 'components/Text'
import TableComponent from 'components/Table'
import { Table } from 'components/Table/styles'
import InputMoney from 'components/Inputs/Money'
import LoadingCmp from 'components/Loading'
import { LoadingContainer } from 'components/Loading/styles'
import { TheadTh } from 'components/Table/styles'

export const Loading = styled(LoadingCmp)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(5)}px;
  text-align: center;
  ${LoadingContainer} {
    width: 50%;
  }
`

export const CustomTable = styled(TableComponent)`
  ${Table} {
    max-height: calc(100vh - 280px);
  }

  ${TheadTh} {
    padding-left: 0px;

    &:first-child {
      padding-left: ${({ theme }) => theme.spacing(3)}px;
    }
  }
`

export const ExtractFund = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const CardContainer = styled(Container)`
  flex: 1;
  display: flex;
`

export const CustomCard = styled(Card)`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(3)}px 0;
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
`

export const Input = styled(InputMoney)`
  height: 35px;
  max-width: 244px;
`

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) => `${theme.spacing(3)}px`};
  width: 100%;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`
