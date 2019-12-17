import styled from 'styled-components'

export const ChartContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
`

export const MiddleContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
