import styled from 'styled-components'
import Text from 'components/Text'

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;
  margin: ${({ theme }) => `0 ${theme.spacing(5)}px`};
`

export const ErrorText = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))`
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
  text-align: center;
`
