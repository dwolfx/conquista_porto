import styled from 'styled-components'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import Button from 'components/Button'

export const Title = styled(Text)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  padding-top: ${({ theme }) => theme.spacing(6)}px;
`

export const NextStepButton = styled(Button)`
  width: 100%;
`

export const CustomDivisor = styled(Divisor)`
  position: relative;
  margin: ${({ theme }) => theme.spacing(4)}px 0;
  left: -${({ theme }) => theme.spacing(2)}px;
  width: calc(100% + ${({ theme }) => theme.spacing(4)}px);
`

export const FooterText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const FieldForm = styled.div<{ error?: boolean }>`
  margin-bottom: ${({ theme, error }) => theme.spacing(error ? 7 : 4)}px;
`
export const FormWrapper = styled.div`
  margin: ${({ theme }) => `0 ${theme.spacing(2)}px`};
`
