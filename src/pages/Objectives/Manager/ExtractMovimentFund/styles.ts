import styled from 'styled-components'
import { Container, Col } from 'styled-bootstrap-grid'
import Card from 'components/Card'
import Text from 'components/Text'
import TableComponent from 'components/Table'
import { Table } from 'components/Table/styles'
import InputMoney from 'components/Inputs/Money'
import LoadingCmp from 'components/Loading'
import { LoadingContainer } from 'components/Loading/styles'
import { TheadTh } from 'components/Table/styles'
import IconButton from 'components/Button/Icon'
import HorizontalList from 'components/HorizontalList'

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

export const FloatButton = styled(IconButton)`
  content: '';
  border-radius: 50%;
  position: fixed;
  bottom: 14px;
  right: 14px;
  z-index: 11;
  border: none;
`

//Mobile/Tablet CSS

export const StyledErrorOrLoadingCard = styled(Card)`
  height: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(6)}px;

  > div {
    flex: unset;
  }

  p {
    width: 75%;
    margin: ${({ theme }) => `0 auto ${theme.spacing(1)}px`};
  }

  button {
    width: 70%;
    margin: 0 auto;
  }
`

export const StyledCard = styled(Card)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    & + & {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
    margin-left: ${({ theme }) => theme.spacing(1)}px;
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  }
`

export const StyledHorizontalList = styled(HorizontalList)`
  height: ${({ theme }) => theme.spacing(4)}px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px`};

  button {
    width: 100%;
  }
`

export const StyledContainer = styled(Container)`
  overflow: auto;
`

export const StyledCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

//Fim do Mobile/Tablet
