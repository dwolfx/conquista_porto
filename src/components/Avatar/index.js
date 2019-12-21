import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { AvatarWrapper } from './styles'

export default function Avatar({ avatarUrl, ...rest }) {
  return (
    <AvatarWrapper hasAvatar={!!avatarUrl} {...rest}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="user pic" />
      ) : (
        <Icon name="user" />
      )}
    </AvatarWrapper>
  )
}

Avatar.defaultProps = {
  avatarUrl: '',
}

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
}
