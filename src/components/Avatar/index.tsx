import React from 'react'

import Icon from 'components/IconExporter'

import { AvatarWrapper } from './styles'

interface IProps {
  avatarUrl: string
}

const Avatar: React.FC<IProps> = ({ avatarUrl, ...rest }) => {
  return (
    <AvatarWrapper
      data-gtm-type="click"
      data-gtm-clicktype="link"
      data-gtm-name="Header - Avatar"
      hasAvatar={!!avatarUrl}
      {...rest}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="user pic" />
      ) : (
        <Icon data-testid="icon-user" name="user" />
      )}
    </AvatarWrapper>
  )
}

export default Avatar
