import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetObjectiveDataRequest } from 'store/modules/Objective/action'

import Objective from './Objective'
import { IObjectivesListProps } from './types'
import LoadingState from '../commons/LoadingState'
import ErrorState from '../commons/ErrorState'

import {
  EmptyBody,
  EmptyText,
  EmptyButton,
  ObjectivesListContainer
} from './styles'

const ObjectivesList = ({ objectives, isLoading, hasError, onRedirect }: IObjectivesListProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetObjectiveDataRequest())
  }, [dispatch])

  const EmptyState = () => (
    <EmptyBody>
      <EmptyText bold>
        Com os Objetivos, fica mais fácil alcançar suas metas. Definindo-os,
        você receberá planos de investimentos personalizados.
      </EmptyText>
      <EmptyButton
        data-gtm-subname="card objetivos"
        data-gtm-name="criar objetivo"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="secondary"
        onClick={() => onRedirect('/objetivos/')}
      >
        CRIAR OBJETIVO
      </EmptyButton>
    </EmptyBody>
  )

  const hasObjectives = Boolean(objectives && objectives.length)

  if (isLoading && !hasObjectives) {
    return <LoadingState />
  }

  if (hasError && !hasObjectives) {
    return <ErrorState onRetry={() => dispatch(GetObjectiveDataRequest())} />
  }

  return hasObjectives ? (
    <ObjectivesListContainer>
      {objectives && objectives.map((objective: any) => (
        <Objective key={objective.id} objective={objective} />
      ))}
    </ObjectivesListContainer>
  ) : (
    <EmptyState />
  )
}

export default ObjectivesList
