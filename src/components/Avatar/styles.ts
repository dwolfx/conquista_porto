import styled, { css } from 'styled-components'

const defaultAvatarStyle = css`
  border: 2px solid ${props => props.theme.colors.gray4};
  padding: 3px;

  svg {
    fill: ${props => props.theme.colors.gray4};
  }
`

const hasAvatarStyle = css`
  img {
    width: 100%;
  }
`

interface IAvatarWrapper {
  hasAvatar?: Boolean
}

export const AvatarWrapper = styled.div<IAvatarWrapper>`
  border-radius: 50%;
  height: 35px;
  overflow: hidden;
  width: 35px;
  ${props => (props.hasAvatar ? hasAvatarStyle : defaultAvatarStyle)}
`
