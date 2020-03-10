import styled, { keyframes } from 'styled-components'

import Text from 'components/Text'

export const loop = keyframes`
  from {
    -ms-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  to {
    -ms-transform: translateX(300%);
    -moz-transform: translateX(300%);
    -webkit-transform: translateX(300%);
    -o-transform: translateX(300%);
    transform: translateX(300%);
  }
`

export const ComponentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export const LoadingContainer = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 4px;
  height: 7px;
  overflow: hidden;
  width: 100%;
`

export const LoadingBar = styled.div`
  animation: ${loop} 2s linear infinite;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: inherit;
  height: 100%;
  width: calc(100% / 3);
`

export const LegendText = styled(Text)`
  margin-bottom: ${props => (props.placement === 'top' ? '21px' : 0)};
  margin-top: ${props => (props.placement === 'bottom' ? '21px' : 0)};
  order: ${props => (props.placement === 'top' ? 0 : 2)};
`
