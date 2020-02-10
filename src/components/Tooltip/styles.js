import styled from 'styled-components'

export const TooltipContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.gray2};
  padding: 14px;
  z-index: 1;
`

export const Arrow = styled.div`
  top: 0;
  left: 0;
  margin-top: -0.95em;
  margin-left: 4px;
  margin-right: 4px;
  width: 2em;
  height: 1em;

  &:before {
    content: '';
    position: absolute;
    border-width: 0 1em 1em 1em;
    border-color: transparent transparent currentcolor transparent;
  }
`
