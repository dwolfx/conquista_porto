import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  right: 0;
  padding: 28px;
  overflow: hidden;
  z-index: 100;

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
  }
`
