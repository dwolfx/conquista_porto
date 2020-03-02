import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Close, Icon, Message, NotificationWrapper } from './styles'

const Notification = ({
  handleClose,
  iconName,
  iconColor,
  isOpen,
  message,
  ...rest
}) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        handleClose()
      }, 4000)
    }
  }, [handleClose, isOpen])

  return (
    <NotificationWrapper isOpen={isOpen} {...rest}>
      {iconName && <Icon name={iconName} color={iconColor} />}
      <Message>{message}</Message>
      <Close name="close" color="gray5" onClick={handleClose} />
    </NotificationWrapper>
  )
}

export default Notification

Notification.defaultProps = {
  iconColor: 'white',
  iconName: '',
}

Notification.propTypes = {
  handleClose: PropTypes.func.isRequired,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}
