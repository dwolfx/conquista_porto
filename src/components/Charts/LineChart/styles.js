import styled from 'styled-components'

export const LineChartContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: visible;
  bottom: 20px;
`

export const ToolTipContainer = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 4px;
  padding: 14px;
  width: 240px;
`

export const ReactInfoColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-color: ${props => props.color};
`
