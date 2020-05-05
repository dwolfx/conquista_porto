import styled from 'styled-components'
import VerticalList from 'components/VerticalList'
import Divisor from 'components/Divisor'
import Loading from 'components/Loading'
import Icon from 'components/IconExporter'
import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const CardStyled = styled(Card)`
  height: 100%;

  ${CardBody} {
    max-width: 1000px;
  }
`

export const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${props => `${props.theme.spacing(13)}px`};
`

export const VerticalListStyled = styled(VerticalList)`
  width: auto;
  padding: 0;
  margin-right: ${props => props.theme.spacing(6)}px;
`

export const DivisorStyled = styled(Divisor)`
  margin: ${props => props.margin};
`

export const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputContainer = styled.div`
  width: 48%;
`

export const LoadingSpinner = styled(Loading)`
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(4)}px;
  width: ${({ theme }) => theme.spacing(4)}px;
`

export const IconRetry = styled(Icon).attrs(() => ({
  name: 'reload',
  color: 'blue4',
}))`
  cursor: pointer;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
`

export const CardFooter = styled.div`
  width: 100%;
  text-align: right;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`
