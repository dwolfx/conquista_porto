import styled from 'styled-components'

export const Link = styled.a`
  align-items: center;
  color: ${props => props.theme.colors.blue4};
  cursor: pointer;
  display: inline-flex;
  ${props => props.theme.fontTypes.button}

  svg {
    fill: currentColor;
    height: 11px;
    margin-left: 8px;
  }
`
