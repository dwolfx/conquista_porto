import styled from 'styled-components'

export const ChartContainer = styled.div<{ width: string, height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
`

export const MiddleContent = styled.div`
  width: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
