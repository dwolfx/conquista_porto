import styled from 'styled-components'

export const KeyWrapper = styled.div`
  width: 30%;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const ValueWrapper = styled.div`
  flex: 1;
`
export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
`
