import styled, { keyframes } from 'styled-components'

import Text from 'components/Text'

export const loop = keyframes`
  from {
    -ms-transform: translateX(-147px);
    -moz-transform: translateX(-147px);
    -webkit-transform: translateX(-147px);
    -o-transform: translateX(-147px);
    transform: translateX(-147px);
  }
  to {
    -ms-transform: translateX(428px);
    -moz-transform: translateX(428px);
    -webkit-transform: translateX(428px);
    -o-transform: translateX(428px);
    transform: translateX(428px);
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
  width: 428px;
`

export const LoadingBar = styled.div`
  animation: ${loop} 2s linear infinite;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: inherit;
  height: 100%;
  width: 147px;
`

export const LegendText = styled(Text)`
  margin-bottom: ${props => (props.placement === 'top' ? '21px' : 0)};
  margin-top: ${props => (props.placement === 'bottom' ? '21px' : 0)};
  order: ${props => (props.placement === 'top' ? 0 : 2)};
`
