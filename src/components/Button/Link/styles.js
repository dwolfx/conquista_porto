import styled from 'styled-components'

export const Link = styled.a`
  align-items: center;
  color: ${props => props.theme.colors.blue4};
  cursor: pointer;
  display: inline-flex;

  svg {
    fill: currentColor;
    height: 11px;
    margin-left: 8px;
  }
`
