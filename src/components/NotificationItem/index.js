import React from 'react'
import PropTypes from 'prop-types'

import {
  ActionIcon,
  Icon,
  IdentificationIcon,
  Notification,
  Message,
  TextWrapper,
  Title,
} from './styles'

const NotificationItem = ({
  title,
  message,
  identificationIcon,
  actionIcon,
  isRead,
}) => (
  <Notification isRead={isRead}>
    <IdentificationIcon>
      <Icon name={identificationIcon} />
    </IdentificationIcon>
    <TextWrapper>
      <Title type="paragraph">{title}</Title>
      <Message type="paragraph">{message}</Message>
    </TextWrapper>
    <ActionIcon>
      <Icon name={actionIcon} />
    </ActionIcon>
  </Notification>
)
export default NotificationItem

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  identificationIcon: PropTypes.string.isRequired,
  actionIcon: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
}
