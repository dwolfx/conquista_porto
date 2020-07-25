import styled from 'styled-components'

export const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${props => `${props.theme.spacing(13)}px`};
  margin-bottom: ${props => `${props.theme.spacing(3)}px`};
`

export const SimulationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) =>
    `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`};
`

export const DateWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
`

export const CalculationWrapper = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const WrapperAccountInfoLink = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
`

export const AccountInfoLink = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue4};

  &:hover {
    text-decoration: underline;
  }
`
