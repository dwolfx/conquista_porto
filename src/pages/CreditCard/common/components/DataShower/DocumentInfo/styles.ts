import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0;
  }
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: ${({ theme }) => theme.spacing(1)}px;

    @media ${({ theme }) => theme.mediaQueries.sm} {
      margin-top: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(2)}px 0;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

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
