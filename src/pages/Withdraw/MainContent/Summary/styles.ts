import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const Container = styled.div``

export const InfosContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`

export const BankCardsContainer = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
  margin-right: 0;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 0;
  }
`

interface IBankCard {
  isChecked: boolean
}

export const BankCard = styled(Card)<IBankCard>`
  box-shadow: ${({ theme, isChecked }) =>
    isChecked ? theme.shadows.blue1 : 'none'};
  border-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.blue2 : theme.colors.gray2};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  ${CardBody} {
    padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(1.5)}px`};
    position: relative;
  }
  p:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const RadioInputContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0%;
`

export const LoadingCol = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const ErrorCol = styled(Col)`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  button {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`
