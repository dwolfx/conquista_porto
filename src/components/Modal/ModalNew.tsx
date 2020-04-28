import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContext } from 'styled-components'

import Icon, { dict } from '../IconExporter'

import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  ChildrenWrapper,
} from './stylesNew'

interface IProps {
  headerIcon?: keyof typeof dict
  modalTitle?: string
  handleClose: () => void
  isOpen: boolean
  alignItems?: string
}

const Modal: React.FC<IProps> = ({
  headerIcon = null,
  modalTitle = '',
  handleClose,
  isOpen,
  alignItems = '',
  children,
  ...rest
}) => {
  const themeContext = useContext(ThemeContext)
  useEffect(() => {
    const body = document.querySelector<HTMLInputElement>('body')
    const html = document.querySelector<HTMLInputElement>('html')
    if (isOpen) {
      body!.style.overflow = 'hidden'
      html!.style.overflowY = 'hidden'
    }

    function handleOverflow() {
      body!.style.overflow = 'visible'
      html!.style.overflowY = 'visible'
    }
    return () => handleOverflow()
  }, [isOpen])

  useEffect(() => {
    const handler = function handleEscClose(event: KeyboardEvent) {
      if (isOpen && event.keyCode === 27) {
        handleClose()
      }
    }

    window.addEventListener('keyup', handler)

    return () => window.removeEventListener('keyup', handler)
  }, [handleClose, isOpen])

  return ReactDOM.createPortal(
    <ModalWrapper isOpen={isOpen} alignItems={alignItems} {...rest}>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalContainer lg={4} md={6} sm={6} xs={12}>
        <ModalHeader>
          {headerIcon && (
            <Icon
              width="28"
              fill={themeContext.colors.blue4}
              name={headerIcon}
            />
          )}
          <ModalTitle>{modalTitle}</ModalTitle>
          <CloseButton
            data-gtm-subname={`modal ${modalTitle}`}
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={handleClose}
          />
        </ModalHeader>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector('#root') as HTMLInputElement
  )
}

export default Modal
