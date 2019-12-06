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
  ModalWrapper,
} from './styles'

const Modal = ({
  children,
  headerIcon,
  handleClose,
  isOpen,
  modalTitle,
  ...rest
}) => {
  const handleEscClose = event => {
    if (isOpen && event.keyCode === 27) {
      handleClose()
    }
  }

  window.addEventListener('keyup', handleEscClose)

  return isOpen
    ? ReactDOM.createPortal(
        <ModalWrapper isOpen={isOpen} {...rest}>
          <ModalOverlay onClick={handleClose} />
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
            {children}
          </ModalContainer>
        </ModalWrapper>,
        document.body
      )
    : null
}

Modal.defaultProps = {
  headerIcon: null,
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  headerIcon: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
}

export default Modal
