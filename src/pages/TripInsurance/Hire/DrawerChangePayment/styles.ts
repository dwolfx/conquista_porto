import styled, { css } from 'styled-components'
import SelectComponent from 'components/Inputs/Select'
import ButtonComponent from 'components/Button'
import NewInput from 'components/NewInput'
import { CreditCardInput } from '../PaymentStep/CreditCard/CreditCardNumberInput/styles'

export const SelectWrapper = styled.div`
  width: 100%;
`
export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`

export const Form = styled.form``

export const Select = styled(SelectComponent)`
  margin: ${({ theme }) => `0 0 ${theme.spacing(4)}`}px;
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`

export const InputsWrapper = styled.div``

export const inputCard = styled(CreditCardInput)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  ${({ error, theme }) =>
    error &&
    css`
      margin-bottom: ${theme.spacing(7)}px;
    `}
`

export const InputsDrawerPayment = styled(NewInput)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  &&& {
    margin-top: 0;
  }

  ${({ error, theme }) =>
    error &&
    css`
      margin-bottom: ${theme.spacing(7)}px;
    `}
`
