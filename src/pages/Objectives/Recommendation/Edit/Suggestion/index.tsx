import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import {
  PostObjectiveDataRequestBySimulate,
  PostObjectiveDataRequest,
} from 'store/modules/Objective/action'
import { IAnswer, ISuggestion } from 'store/modules/Objective/types'

import AccordionView from './AccordionView'
import CardsView from './CardsView'

import * as s from './styles'

interface IProps {
  answer: IAnswer
  suggestionData: ISuggestion
  formData: Omit<IAnswer, 'uf' | 'goal_type'>
  setFormData: (newValue: Omit<IAnswer, 'uf' | 'goal_type'>) => void
  onClose: () => void
}

export default function EditSuggestion({
  answer,
  formData,
  setFormData,
  suggestionData,
  onClose,
}: IProps) {
  const { addToast } = useToast()
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const isTabletVertical = useMedia('md')

  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
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

  const { isLoading, isLoadingBySimulate, suitabilityData } = useSelector(
    (state: any) => ({
      isLoading: state.objective.isLoading,
      isLoadingBySimulate: state.objective.isLoadingBySimulate,
      suitabilityData: state.suitability.data,
    })
  )

  useEffect(() => {
    setEditValues(formData)
  }, [formData])

  const buttons = {
    recalculate: (
      <s.FooterButton
        loading={isLoading && activeButton === 'recalculate'}
        disabled={error || isLoading || isLoadingBySimulate}
        onClick={() => {
          setActiveButton('recalculate')
          dispatch(
            PostObjectiveDataRequest({
              data: {
                ...editValues,
                initial_value: editValues!.initial_value,
                monthly_value: editValues!.monthly_value,
                target_value: editValues!.target_value,
                profile: +suitabilityData.idperfilinvest,
              },
              onErrorToast: addToast,
              onSuccess: () => {
                setFormData(editValues)
                onClose()
              },
            })
          )
        }}
      >
        Confirmar e recalcular
      </s.FooterButton>
    ),
    monthly_value: (
      <s.FooterButton
        outline
        loading={isLoadingBySimulate && activeButton === 'monthly_value'}
        disabled={isLoading || isLoadingBySimulate}
        onClick={() => {
          setActiveButton('monthly_value')
          dispatch(
            PostObjectiveDataRequestBySimulate({
              data: {
                ...answer,
                monthly_value: suggestionData.suggestion_monthly_value,
                profile: +suitabilityData.idperfilinvest,
              },
              isMobile,
              onSuccess: onClose,
              onErrorToast: addToast,
            })
          )
        }}
      >
        Aceitar sugestão
      </s.FooterButton>
    ),
    target_date: (
      <s.FooterButton
        outline
        loading={isLoadingBySimulate && activeButton === 'target_date'}
        disabled={isLoading || isLoadingBySimulate}
        onClick={() => {
          setActiveButton('target_date')
          dispatch(
            PostObjectiveDataRequestBySimulate({
              data: {
                ...answer,
                target_date: suggestionData.suggestion_target_date,
                profile: +suitabilityData.idperfilinvest,
              },
              isMobile,
              onSuccess: onClose,
              onErrorToast: addToast,
            })
          )
        }}
      >
        Aceitar sugestão
      </s.FooterButton>
    ),
  }

  return (
    <s.Container>
      <Row>
        <s.SectionTitleCol>
          <Text type="heading4" color="gray6" textAlign="center">
            Você pode editar os valores ou escolher uma de nossas sugestões.
          </Text>
        </s.SectionTitleCol>
      </Row>

      {!isMobile && !isTabletVertical ? (
        <CardsView
          editValues={editValues}
          setEditValues={setEditValues}
          answer={answer}
          suggestionData={suggestionData}
          buttons={buttons}
          setError={setError}
        />
      ) : (
        <AccordionView
          editValues={editValues}
          setEditValues={setEditValues}
          answer={answer}
          suggestionData={suggestionData}
          buttons={buttons}
          setError={setError}
        />
      )}
    </s.Container>
  )
}
