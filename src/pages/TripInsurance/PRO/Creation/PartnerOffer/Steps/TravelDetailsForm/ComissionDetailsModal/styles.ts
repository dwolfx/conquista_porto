import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`

export const ExampleWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  max-width: 578px;
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray1};
`