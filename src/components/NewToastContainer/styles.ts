import styled from 'styled-components'

import { Container as ToastContainer } from './Toast/styles'

export const Container = styled.div`
  position: fixed;
  right: 0;
  overflow: hidden;
  z-index: 100;

  ${ToastContainer}:nth-child(n) {
    margin: 14px;
  }

  ${ToastContainer}:first-child {
    margin-top: 28px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
  }
`
