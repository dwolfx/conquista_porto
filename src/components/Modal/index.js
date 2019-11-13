import React from 'react'
import Icon from '../IconExporter'
import commonStyles from '../../styles/theme'
import {
  ModalWrapper,
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalTitle,
  ModalBody,
} from './styles'

export default ({ handleClose, isOpen, modalTitle, children, headerIcon }) => (
  <ModalWrapper isOpen={isOpen}>
    <ModalOverlay />
    <ModalContainer>
      <ModalHeader>
        {headerIcon && (
          <Icon
            width="28"
            fill={commonStyles.colors.lightPrimary}
            name={headerIcon}
          />
        )}
        <ModalTitle>{modalTitle}</ModalTitle>
        <CloseButton onClick={handleClose} />
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </ModalContainer>
  </ModalWrapper>
)
