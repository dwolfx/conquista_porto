import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
  width: 240px;

  @media ${props => props.theme.mediaQueries.lg} {
    padding: ${({ theme }) => theme.spacing(4)}px;
    width: 85%;
  }
`
