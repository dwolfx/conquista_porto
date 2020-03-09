import React, { useState, useEffect } from 'react'
import { useHistory, Prompt } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import { ButtonContainerModal } from './styles'

export default function PromptModal({
  hasUnsavedChanges,
  onConfirmation,
  ...rest
}) {
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
        modalTitle="Alterações não salvas"
        {...rest}
      >
        <Text type="headline" color="gray6">
          As alterações não salvas serão perdidas.
        </Text>
        <Text type="headline" color="gray6">
          Tem certeza que deseja continuar?
        </Text>
        <ButtonContainerModal>
          <Button
            outline
            onClick={() => {
              setIsModalUnsavedOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setConfirmedUnsavedChanges(true)
              setIsModalUnsavedOpen(false)
            }}
          >
            Confirmar
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

PromptModal.propTypes = {
  hasUnsavedChanges: PropTypes.bool,
  onConfirmation: PropTypes.func,
}

PromptModal.defaultProps = {
  hasUnsavedChanges: false,
  onConfirmation: null,
}
