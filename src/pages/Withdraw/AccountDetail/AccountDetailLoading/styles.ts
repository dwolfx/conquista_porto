import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
  width: 240px;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    height: calc(100vh - 275px);
  }
`
