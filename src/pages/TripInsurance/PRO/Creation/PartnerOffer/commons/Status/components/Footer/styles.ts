import styled from 'styled-components'

export const Content = styled.div`
  button {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-right: 0;
    }
  }
`
