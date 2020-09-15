import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useValidator from 'pages/Objectives/GoalStreams/useValidator'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

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
import { formatLocaleStringToNumber } from 'helpers'

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
  const dispatch = useDispatch()
  const isMobile = useMedia('sm')
  const { addToast } = useToast()

  const inputRef = useRef() as React.RefObject<HTMLInputElement>

  const [valueNickname, setValueNickname] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    getFormEntries(data)
  )
  const [isActive, setIsActive] = useState(false)
  const [
    generateRecommendationClicked,
    setGenerateRecommendationClicked,
  ] = useState(false)
  const [error, invalid] = useValidator(data, currentStep, formData, inputRef)

  useFetchCustomerProfile()

  const {
    isLoading,
    data: objectiveData,
    suitabilityData,
    customerProfile,
  } = useSelector((state: any) => ({
    ...state.objective,
    suitabilityData: state.suitability.data,
    customerProfile: state.customerProfile.data,
  }))

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === data.length - 1

  const increment = () => {
    setValueNickname(true)
    setGenerateRecommendationClicked(false)
    handleStep('increment')
  }

  const handleStep = (step: 'increment' | 'decrement') => {
    handleChildClick(step)
  }

  const postFlow = () => {
    setGenerateRecommendationClicked(true)

    const formDataFormatted = Object.entries(formData)
      .map(([key, value]) => {
        const type = data.filter(item => item.name === key)[0].type

        if (type === 'number') {
          return [key, formatLocaleStringToNumber(value)]
        }

        return [key, value]
      })
      .reduce(
        (acc: { [key: string]: string | number }, cur: (string | number)[]) => {
          const index = cur[0].toString()
          acc[index] = cur[1]

          return acc
        },
        {}
      )

    dispatch(
      PostObjectiveDataRequest({
        data: {
          ...formDataFormatted,
          goal_type: objective,
          profile: +suitabilityData.idperfilinvest,
          uf: customerProfile.customerState,
        },
        isMobile,
        onErrorToast: addToast,
      })
    )
  }

  const handleSingleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'nickname') {
      setValueNickname(false)
    }

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
        <ButtonAction
          type="submit"
          data-gtm-form="submit"
          data-gtm-name="proximo"
          disabled={!isActive}
          onClick={increment}
        >
          Próximo
        </ButtonAction>
      )}
      {isLastStep && (
        <ButtonAction
          type="submit"
          data-gtm-form="submit"
          data-gtm-name="proximo"
          disabled={(!isActive || isLoading) && generateRecommendationClicked}
          loading={isLoading && generateRecommendationClicked}
          loadingColor="white"
        >
          Próximo
        </ButtonAction>
      )}
    </RowFull>
  )

  const WizardContainer = () =>
    inputRef ? (
      <WizardStep name={data[currentStep].name}>
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
        nickname={formData.nickname.toString()}
      />
      <BodyWizard>
        <Form onSubmit={onFormSubmit}>
          <RowFull>{WizardContainer()}</RowFull>
        </Form>
      </BodyWizard>
    </Wizard>
  )
}
