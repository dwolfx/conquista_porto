import styled from 'styled-components'

interface IAnchorProps {
  disabled: boolean
  noIconPadding: boolean
}
export const Link = styled.a<IAnchorProps>`
  align-items: center;
  color: ${props =>
    props.disabled ? props.theme.colors.gray4 : props.theme.colors.blue4};
  cursor: pointer;
  display: inline-flex;
  ${props => props.theme.fontTypes.button}

  svg {
    height: 21px;
    margin-left: ${({ noIconPadding, theme }) =>
      noIconPadding ? 0 : theme.spacing(2)}px;
    path {
      fill: currentColor;
    }
  }
`
