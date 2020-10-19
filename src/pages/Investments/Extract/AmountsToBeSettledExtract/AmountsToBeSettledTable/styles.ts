import styled from 'styled-components'
import HorizontalList from 'components/HorizontalList'
import { Container, Col } from 'styled-bootstrap-grid'
import Card from 'components/Card'

import TableComp from 'components/Table'
import Text from 'components/Text'

export const Table = styled(TableComp)`
  height: 100%;
`

export const StyledDate = styled(Text).attrs({
  type: 'body',
  color: 'gray5',
  bold: true,
})`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`};
`

export const StyledHorizontalList = styled(HorizontalList)`
  height: ${({ theme }) => theme.spacing(4)}px;
`

export const StyledCard = styled(Card)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px 0`};
    padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px`};

  button {
    width: 100%;
  }
`

export const FundText = styled(Text).attrs({
  type: 'body',
  color: 'gray5',
  bold: true,
})``

export const BoldTypeText = styled(Text).attrs({
  type: 'title',
  color: 'gray6',
  bold: true,
})`
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  text-transform: capitalize;
`

export const BoldMoneyText = styled(Text).attrs({
  type: 'title',
  color: 'gray6',
  bold: true,
})`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
`

export const StyledErrorOrLoadingCard = styled(Card)`
  height: 358px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
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

export const StyledContainer = styled(Container)`
  overflow: auto;
`

export const StyledCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
