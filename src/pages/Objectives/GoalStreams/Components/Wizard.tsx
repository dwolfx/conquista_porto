import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'styled-bootstrap-grid'

import useValidator from 'pages/Objectives/GoalStreams/useValidator'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import useMedia from 'hooks/useMedia'

import { IData } from '../types'
import TopBar from './TopBar'
import QuestionInput from './QuestionInput'
import {
  BodyWizard,
  ButtonAction,
  RowFull,
  Wizard,
  WizardStep,
  Form,
} from './styles'

interface IProps {
  data: IData[]
  objective: string | number
  category: string
  currentStep: number
  handleChildClick: (step: 'increment' | 'decrement') => void
}

const getFormEntries = (data: IData[]) =>
  data.reduce((acc, cur) => ({ ...acc, [cur.name]: '' }), {})

export const WizardFlow = ({
  data,
  objective,
  category,
  currentStep,
  handleChildClick,
}: IProps) => {
  const history = useHistory()
  const inputRef = useRef() as React.RefObject<HTMLInputElement>
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const [valueNickname, setValueNickname] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    getFormEntries(data)
  )
  const [isActive, setIsActive] = useState(false)
  const [error, invalid] = useValidator(data, currentStep, formData, inputRef)
  const { isLoading, data: objectiveData, suitabilityData } = useSelector(
    (state: any) => ({
      ...state.objective,
      suitabilityData: state.suitability.data,
    })
  )

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === data.length - 1

  const increment = () => {
    setValueNickname(true)
    handleStep('increment')
  }

  const handleStep = (step: 'increment' | 'decrement') => {
    handleChildClick(step)
  }

  const postFlow = () => {
    dispatch(
      PostObjectiveDataRequest({
        data: {
          goal_type: objective,
          profile: +suitabilityData.idperfilinvest,
          ...formData,
        },
        isMobile,
      })
    )
  }

  const handleSingleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event

    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    if (valueNickname && !formData.nickname) {
      setFormData({ ...formData, nickname: category })
    }
  }, [formData, category, valueNickname])

  useEffect(() => {
    if (objectiveData && Object.keys(objectiveData).length && !isLoading) {
      history.push('/objetivos')
    }
  }, [history, isLoading, objectiveData])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentStep, inputRef])

  // useEffect to determine isActive
  useEffect(() => {
    const { name } = data[currentStep]
    const hasValue = formData[name].toString().trim().length > 0
    setIsActive((isFirstStep && !hasValue) || (!invalid && hasValue))
  }, [setIsActive, formData, data, currentStep, invalid, isFirstStep])

  function onFormSubmit(e: any) {
    e.preventDefault()
    if (isLastStep) {
      postFlow()
    }
  }

  const WizardButton = (
    <RowFull>
      {!isLastStep && (
        <Col lg={12} sm={12} xs={12}>
          <ButtonAction
            type="submit"
            data-gtm-form="submit"
            data-gtm-name="proximo"
            disabled={!isActive}
            onClick={increment}
          >
            Próximo
          </ButtonAction>
        </Col>
      )}
      {isLastStep && (
        <Col lg={6} sm={6} xs={6}>
          <ButtonAction
            type="submit"
            data-gtm-form="submit"
            data-gtm-name="proximo"
            disabled={!isActive || isLoading}
            loading={isLoading}
            loadingColor="white"
          >
            Próximo
          </ButtonAction>
        </Col>
      )}
    </RowFull>
  )

  const WizardContainer = () =>
    inputRef ? (
      <WizardStep>
        <QuestionInput
          valueNickname={valueNickname}
          category={category}
          formData={formData}
          onChangeFormData={handleSingleValue}
          error={error || false}
          ref={inputRef}
          button={WizardButton}
          {...data[currentStep]}
        />
      </WizardStep>
    ) : null

  return (
    <Wizard>
      <TopBar
        currentStep={currentStep + 1}
        numberSteps={data.length + 1}
        nickname={formData.nickname}
      />
      <BodyWizard>
        <Form onSubmit={onFormSubmit}>
          <RowFull>{WizardContainer()}</RowFull>
        </Form>
      </BodyWizard>
    </Wizard>
  )
}
