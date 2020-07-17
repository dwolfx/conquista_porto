import React from 'react'

import Button from 'components/Button'
import Text from 'components/Text'

import { ButtonContainerModal, ModalStyled } from './styles'

interface IProps {
  isOpen: boolean
  title: string
  description: string
  buttonTextCancel?: string
  buttonTextConfirm?: string
  onConfirmation: () => void
  onClose: () => void
  onCloseHeaderButton?: () => void
}

const ConfirmationModal: React.FC<IProps> = ({
  isOpen,
  title,
  description,
  buttonTextCancel = 'Cancelar',
  buttonTextConfirm = 'Confirmar',
  onConfirmation,
  onClose,
  onCloseHeaderButton,
  ...rest
}) => {
  const handleClose = () => {
    onCloseHeaderButton ? onCloseHeaderButton() : onClose()
  }
  return (
    <>
      <ModalStyled
        isOpen={isOpen}
        handleClose={handleClose}
        modalTitle={title}
        {...rest}
      >
        <Text type="headline" color="gray6">
          {description}
        </Text>
        <ButtonContainerModal>
          <Button outline onClick={onClose}>
            {buttonTextCancel}
          </Button>
          <Button onClick={onConfirmation}>{buttonTextConfirm}</Button>
        </ButtonContainerModal>
      </ModalStyled>
    </>
  )
}

export default ConfirmationModal
