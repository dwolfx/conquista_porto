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
    -ms-transform: translateX(${props => props.width});
    -moz-transform: translateX(${props => props.width});
    -webkit-transform: translateX(${props => props.width});
    -o-transform: translateX(${props => props.width});
    transform: translateX(${props => props.width});
  }
`

export const ComponentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export const LoadingBar = styled.div`
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: inherit;
  height: 100%;
  width: 147px;
`

export const LoadingContainer = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 4px;
  height: 7px;
  overflow: hidden;
  width: ${props => props.width};

  ${LoadingBar} {
    animation: ${loop} 2s linear infinite;
  }
`

export const LegendText = styled(Text)`
  margin-bottom: ${props => (props.placement === 'top' ? '21px' : 0)};
  margin-top: ${props => (props.placement === 'bottom' ? '21px' : 0)};
  order: ${props => (props.placement === 'top' ? 0 : 2)};
`
