import styled from 'styled-components'
import Text from 'components/Text'
import ButtonComponent from 'components/Button'
import MoneyInput from 'components/Inputs/Money'

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 128px);
  height: auto;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 418px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px;
  }

  ${({ theme }) =>
    `@media ${theme.mediaQueries.smUp} and ${theme.mediaQueries.md}`} {
    margin: ${({ theme }) => theme.spacing(20)}px;
  }
`

export const QuestionText = styled(Text)`
  margin: ${({ theme }) => theme.spacing(2)}px 0
    ${({ theme }) => theme.spacing(5)}px;
`

export const StyledButton = styled(ButtonComponent)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

export const InputMoney = styled(MoneyInput)`
  margin-bottom: ${({ error, theme }) => !!error && theme.spacing(7)}px;
`
