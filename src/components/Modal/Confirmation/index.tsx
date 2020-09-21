import React, { ReactNode } from 'react'
import Button from 'components/Button'
import { ButtonContainerModal, ModalStyled } from './styles'
import { themeColors } from 'styles/theme'

interface IProps {
  isOpen: boolean
  title: string
  children: ReactNode
  loading?: boolean
  loadingColor?: keyof typeof themeColors
  buttonTextCancel?: string
  buttonTextConfirm?: string
  onConfirmation: () => void
  onClose: () => void
  onCloseHeaderButton?: () => void
}

const ConfirmationModal: React.FC<IProps> = ({
  isOpen,
  title,
  children,
  loading,
  loadingColor = 'blue4',
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
        {children}
        <ButtonContainerModal>
          <Button outline onClick={onClose}>
            {buttonTextCancel}
          </Button>
          <Button
            loading={loading}
            loadingColor={loadingColor}
            onClick={onConfirmation}
          >
            {buttonTextConfirm}
          </Button>
        </ButtonContainerModal>
      </ModalStyled>
    </>
  )
}

export default ConfirmationModal
