import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import Icon from '../IconExporter'

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
  alignItems,
  ...rest
}) => {
  const themeContext = useContext(ThemeContext)
  useEffect(() => {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'

    function handleOverflow() {
      body.style.overflow = 'visible'
    }
    return () => handleOverflow()
  }, [])

  useEffect(() => {
    const handler = function handleEscClose(event) {
      if (isOpen && event.keyCode === 27) {
        handleClose(isOpen)
      }
    }

    window.addEventListener('keyup', handler)

    return () => window.removeEventListener('keyup', handler)
  }, [handleClose, isOpen])

  return isOpen
    ? ReactDOM.createPortal(
        <ModalWrapper isOpen={isOpen} alignItems={alignItems} {...rest}>
          <ModalOverlay isOpen={isOpen} onClick={handleClose} />
          <ModalContainer>
            <ModalHeader>
              {headerIcon && (
                <Icon
                  width="28"
                  fill={themeContext.colors.blue4}
                  name={headerIcon}
                />
              )}
              <ModalTitle>{modalTitle}</ModalTitle>
              <CloseButton onClick={handleClose} />
            </ModalHeader>
            {children}
          </ModalContainer>
        </ModalWrapper>,
        document.querySelector('#root')
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
  alignItems: PropTypes.string,
}

export default Modal
