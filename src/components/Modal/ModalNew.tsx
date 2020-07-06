import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { ThemeContext } from 'styled-components'

import Icon, { dict } from '../IconExporter'
import Text from 'components/Text'

import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  Divisor,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
  TitleWrapper,
  ChildrenWrapper,
} from './stylesNew'

interface IProps {
  headerIcon?: keyof typeof dict
  modalTitle?: string
  modalSubtitle?: string
  handleClose: () => void
  isOpen: boolean
  alignItems?: string
}

const Modal: React.FC<IProps> = ({
  headerIcon = null,
  modalTitle = '',
  modalSubtitle = '',
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
      body!.style.overflow = 'unset'
      html!.style.overflowY = 'unset'
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
      <ModalContainer>
        <ModalHeader>
          {headerIcon && (
            <Icon
              width="28"
              fill={themeContext.colors.blue4}
              name={headerIcon}
            />
          )}
          {!!modalSubtitle ? (
            <TitleWrapper>
              <ModalTitle>{modalTitle}</ModalTitle>
              <Text bold color="gray4">
                {modalSubtitle}
              </Text>
            </TitleWrapper>
          ) : (
            <ModalTitle>{modalTitle}</ModalTitle>
          )}
          <CloseButton
            data-gtm-subname={`modal ${modalTitle}`}
            data-gtm-name="botao fechar"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={handleClose}
            name="close"
            color="gray4"
            width={28}
            height={28}
          />
        </ModalHeader>
        <Divisor />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector('#root') as HTMLInputElement
  )
}

export default Modal
