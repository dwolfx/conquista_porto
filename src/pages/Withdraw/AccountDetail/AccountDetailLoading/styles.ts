import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  @media ${props => props.theme.mediaQueries.smUp} {
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    height: calc(100vh - 275px);
  }
`
