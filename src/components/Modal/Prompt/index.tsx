import React, { useState, useEffect } from 'react'
import { useHistory, Prompt } from 'react-router-dom'

import Button from 'components/Button'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import { ButtonContainerModal } from './styles'

interface IProps {
  hasUnsavedChanges?: boolean
  onConfirmation?: () => void
  title: string
  description: string
  buttonTextCancel?: string
  buttonTextConfirm?: string
}

const PromptModal: React.FC<IProps> = ({
  buttonTextCancel = 'Cancelar',
  buttonTextConfirm = 'Confirmar',
  hasUnsavedChanges = false,
  onConfirmation,
  title,
  description,
  children,
  ...rest
}) => {
  const history = useHistory()

  const [confirmedUnsavedChanges, setConfirmedUnsavedChanges] = useState(false)
  const [isModalUnsavedOpen, setIsModalUnsavedOpen] = useState(false)
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    if (confirmedUnsavedChanges && newLocation) {
      history.push(newLocation)

      if (onConfirmation) {
        onConfirmation()
      }
    }
  }, [confirmedUnsavedChanges, history, newLocation, onConfirmation])

  return (
    <>
      <Modal
        isOpen={isModalUnsavedOpen}
        handleClose={() => {
          setIsModalUnsavedOpen(false)
        }}
        modalTitle={title}
        {...rest}
      >
        <Text type="headline" color="gray6">
          {description}
        </Text>
        {children}
        <ButtonContainerModal>
          <Button
            outline
            data-gtm-subname={`prompt ${title}`}
            data-gtm-name={`botao ${buttonTextCancel}`}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => {
              setIsModalUnsavedOpen(false)
            }}
          >
            {buttonTextCancel}
          </Button>
          <Button
            data-gtm-subname={`prompt ${title}`}
            data-gtm-name={`botao ${buttonTextConfirm}`}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            onClick={() => {
              setConfirmedUnsavedChanges(true)
              setIsModalUnsavedOpen(false)
            }}
          >
            {buttonTextConfirm}
          </Button>
        </ButtonContainerModal>
      </Modal>
      <Prompt
        when={hasUnsavedChanges}
        message={nextLocation => {
          setNewLocation(nextLocation.pathname)

          if (confirmedUnsavedChanges) {
            setIsModalUnsavedOpen(false)
            setConfirmedUnsavedChanges(false)

            return true
          }

          setIsModalUnsavedOpen(true)
          return false
        }}
      />
    </>
  )
}

export default PromptModal
