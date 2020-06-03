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
    height: 21px;
    margin-left: 7px;
    path {
      fill: currentColor;
    }
  }
`
