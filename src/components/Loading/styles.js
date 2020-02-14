import styled, { keyframes } from 'styled-components'

import SpinWhite from 'assets/images/pages/Objectives/spin-white.png'

export const spin = keyframes`
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

export const IconLoading = styled.div`
  animation: ${spin} 1s linear infinite;
  background: url(${SpinWhite}) center center no-repeat;
  background-size: contain;
  display: inline-block;
  height: 21px;
  margin-left: 15px;
  position: relative;
  width: 21px;
`
