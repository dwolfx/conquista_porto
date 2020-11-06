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
    path {
      fill: currentColor;
    }
  }
`

export const BadgeNotification = styled.span`
  padding: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.magenta2};
  margin-left: 3px;
  margin-bottom: 6px;
`
