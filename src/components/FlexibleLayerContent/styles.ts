import styled from 'styled-components'

export const Content = styled.div`
  overflow: auto;
  flex: 1;
`

export const Flexible = styled.div<{ headerHeight: number }>`
  height: calc(100vh - ${props => props.headerHeight}px);
  display: flex;
  flex-direction: column;
`
