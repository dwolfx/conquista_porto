import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import { useToast } from 'hooks/toast'

import AnswerForm from 'pages/Objectives/Recommendation/Edit/commons/AnswerForm'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import { IAnswer } from 'store/modules/Objective/types'

import * as s from './styles'

interface IProps {
  isDrawerOpen: boolean
  onClose: () => void
  formData: Omit<IAnswer, 'uf' | 'goal_type'>
  setFormData: (newValue: Omit<IAnswer, 'uf' | 'goal_type'>) => void
}

export default function EditDrawer({
  isDrawerOpen,
  onClose,
  formData,
  setFormData,
}: IProps) {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const [hasError, setHasError] = useState(false)
  const [editValues, setEditValues] = useState<
    Omit<IAnswer, 'uf' | 'goal_type'>
  >({
    nickname: '',
    target_date: '',
    target_value: 0,
    initial_value: 0,
    monthly_value: 0,
    profile: 0,
  })

  useEffect(() => {
    setEditValues(formData)
  }, [formData])

  const isLoading = useSelector<any, any>(state => state.objective.isLoading)

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() =>
        dispatch(
          PostObjectiveDataRequest({
            data: {
              ...formData,
              initial_value: formData.initial_value,
              monthly_value: formData.monthly_value,
              target_value: formData.target_value,
            },
            onErrorToast: addToast,
            onSuccess: () => {
              setFormData(editValues)
              onClose()
            },
          })
        )
      }
      disabled={hasError || isLoading}
      loading={isLoading}
    >
      Confirmar e recalcular
    </s.ButtonSubmit>
  )

  return (
    <s.DrawerForm
      drawerTitle="Edite os dados preenchidos"
      isOpen={isDrawerOpen}
      handleClose={onClose}
      footer={footerDrawer()}
      size="sm"
    >
      <AnswerForm
        values={editValues}
        updateValues={setEditValues}
        setHasError={setHasError}
      />
    </s.DrawerForm>
  )
}
