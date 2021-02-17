import styled from 'styled-components'
import SelectComponent from 'components/Inputs/Select'
import MoneyInput from 'components/Inputs/Money'

export const WrapperFinancialCard = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px 0`};
`

export const DelimiterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}`}px;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 630px;
  }
`

export const Select = styled(SelectComponent)``

export const InputMoney = styled(MoneyInput)`
  margin-bottom: ${({ error, theme }) => !!error && theme.spacing(7)}px;
`
