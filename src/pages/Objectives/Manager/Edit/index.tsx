import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'
import AnswerForm from 'pages/Objectives/Manager/Edit/commons/AnswerForm'
import {
  UpdateObjectiveNicknameRequest,
  DeleteObjectiveRequest,
} from 'store/modules/ObjectiveManagement/action'
import { IAnswer } from 'store/modules/Objective/types'

import * as s from './styles'
import * as t from './types'

interface IProps {
  objectiveId: string
  isDrawerOpen: boolean
  onClose: () => void
  formData: Pick<
    IAnswer,
    | 'nickname'
    | 'target_date'
    | 'target_value'
    | 'initial_value'
    | 'monthly_value'
  >
  setFormData: (
    newValue: Pick<
      IAnswer,
      | 'nickname'
      | 'target_date'
      | 'target_value'
      | 'initial_value'
      | 'monthly_value'
    >
  ) => void
}

export default function EditDrawer({
  isDrawerOpen,
  onClose,
  formData,
  setFormData,
  objectiveId,
}: IProps) {
  const { addToast } = useToast()
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()
  const history = useHistory()
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [inputCounter, setInputCounter] = useState<number>(0)
  const [editValues, setEditValues] = useState<
    Pick<
      IAnswer,
      | 'nickname'
      | 'target_date'
      | 'target_value'
      | 'initial_value'
      | 'monthly_value'
    >
  >({
    nickname: '',
    target_date: '',
    target_value: 0,
    initial_value: 0,
    monthly_value: 0,
  })

  const { isLoadingDelete } = useSelector(
    (state: t.IState) => state.objectiveManagement
  )

  useEffect(() => {
    setEditValues(formData)
  }, [formData])

  useEffect(() => {
    if (editValues.nickname) {
      setInputCounter(editValues.nickname.length)
    }
  }, [editValues.nickname])

  const isLoading = useSelector<any, any>(state => state.objective.isLoading)

  function handleDeleteGoal(id: number) {
    dispatch(DeleteObjectiveRequest(id, () => history.push('/'), addToast))
  }

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() => {
        debugger
        dispatch(
          UpdateObjectiveNicknameRequest({
            id: objectiveId,
            nickname: editValues.nickname,
            addToast,
            onSuccess: () => {
              onClose()
            },
          })
        )
      }}
      disabled={
        hasError ||
        isLoading ||
        inputCounter > 20 ||
        editValues.nickname === formData.nickname
      }
      loading={isLoading}
    >
      Confirmar
    </s.ButtonSubmit>
  )

  const renderContent = () => (
    <>
      <AnswerForm
        values={editValues}
        updateValues={setEditValues}
        setHasError={setHasError}
      />
      <ButtonLink
        data-gtm-type="click"
        data-gtm-clicktype="link"
        data-gtm-name="Excluir objetivo"
        noIcon={false}
        noIconPadding
        onClick={() => {
          setIsModalDeleteOpen(true)
          onClose()
        }}
      >
        Excluir objetivo
      </ButtonLink>
      <Modal
        isOpen={isModalDeleteOpen}
        handleClose={() => {
          setIsModalDeleteOpen(false)
        }}
        modalTitle="Excluir"
      >
        <Text type="headline" color="gray6">
          Seu objetivo será excluído e os valores associados à ele voltarão a
          ficar disponíveis.
        </Text>
        <s.ButtonContainerModal>
          <s.ButtonDeleteObjectiveModal
            outline
            onClick={() => {
              setIsModalDeleteOpen(false)
            }}
          >
            SAIR
          </s.ButtonDeleteObjectiveModal>
          <s.ButtonDeleteObjectiveModal
            loading={isLoadingDelete}
            loadingColor="white"
            onClick={() => {
              handleDeleteGoal(+objectiveId)
            }}
          >
            CONTINUAR SOLICITAÇÃO
          </s.ButtonDeleteObjectiveModal>
        </s.ButtonContainerModal>
      </Modal>
    </>
  )

  if (isMobile) {
    return (
      <Modal
        modalTitle="Edite os dados preenchidos"
        isOpen={isDrawerOpen}
        handleClose={onClose}
        footer={footerDrawer()}
      >
        {renderContent()}
      </Modal>
    )
  }
  return (
    <s.DrawerForm
      drawerTitle="Edite os dados preenchidos"
      isOpen={isDrawerOpen}
      handleClose={onClose}
      footer={footerDrawer()}
      size="sm"
    >
      {renderContent()}
    </s.DrawerForm>
  )
}
