import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import { NotificationWrapper } from './styles'

export default function NotificationBell({ hasNotification, ...rest }) {
  return (
    <NotificationWrapper hasNotification={hasNotification} {...rest}>
      <Icon name="bell" />
    </NotificationWrapper>
  )
}

NotificationBell.defaultProps = {
  hasNotification: false,
}

NotificationBell.propTypes = {
  hasNotification: PropTypes.bool,
}
