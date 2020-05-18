import styled from 'styled-components'

interface IAnchorProps {
  disabled: boolean
}
export const Link = styled.a<IAnchorProps>`
  align-items: center;
  color: ${props =>
    props.disabled ? props.theme.colors.gray4 : props.theme.colors.blue4};
  cursor: pointer;
  display: inline-flex;
  ${props => props.theme.fontTypes.button}

  svg {
    fill: currentColor;
    height: 11px;
    margin-left: 8px;
  }
`
