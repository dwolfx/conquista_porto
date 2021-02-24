import styled, { css } from 'styled-components'
import SelectComponent from 'components/Inputs/Select'
import MoneyInput from 'components/Inputs/Money'

const placeholderColor = css`
  & #prefix {
    color: ${({ theme }) => theme.colors.gray6};
  }
`

export const WrapperFinancialCard = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(2)}`}px;
  }
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
  ${({ value }) => !!value && placeholderColor}

  @media ${({ theme }) => theme.mediaQueries.sm} {
    & > span {
      margin-top: ${({ theme }) => theme.spacing(1)}px;

      svg {
        width: 24px;
        margin-right: ${({ theme }) => theme.spacing(2)}px;
      }
    }
  }
`
