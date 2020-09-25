import styled from 'styled-components'

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;
  margin: ${({ theme }) => `0 ${theme.spacing(5)}px`};
`