import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Icon from '../IconExporter'
import commonStyles from '../../styles/theme'

import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalWrapper,
} from './styles'

const Modal = ({
  children,
  headerIcon,
  handleClose,
  isOpen,
  modalTitle,
  size,
}) => {
  const handleEscClose = event => {
    if (isOpen && event.keyCode === 27) {
      handleClose()
    }
  }

  window.addEventListener('keyup', handleEscClose)

  return isOpen
    ? ReactDOM.createPortal(
        <ModalWrapper isOpen={isOpen}>
          <ModalOverlay />
          <ModalContainer size={size}>
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
        </ModalWrapper>,
        document.body
      )
    : null
}

Modal.propTypes = {
  children: PropTypes.node,
  headerIcon: PropTypes.string,
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  size: PropTypes.string,
}

export default Modal
