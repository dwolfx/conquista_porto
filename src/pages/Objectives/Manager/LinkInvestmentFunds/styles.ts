import styled from 'styled-components'
import Card from 'components/Card'
import Text from 'components/Text'
import InputMoney from 'components/Inputs/Money'
import { Container } from 'styled-bootstrap-grid'
import TableComponent from 'components/Table'
import { Table } from 'components/Table/styles'

export const CustomTable = styled(TableComponent)`
  ${Table} {
    max-height: calc(100vh - 280px);
  }
`

export const LinkInvestmentFunds = styled.div`
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

export const Footer = styled.div`
  background: #fff;
  box-sizing: border-box;
  padding: 14px 0;
`

export const FooterContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  button {
    margin-right: ${({ theme }) => `${theme.spacing(2)}px`};
    &:last-child {
      margin-right: 0;
    }
  }
`

export const Input = styled(InputMoney)`
  height: 35px;
  max-width: 244px;
`

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
