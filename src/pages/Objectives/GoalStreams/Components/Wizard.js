import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'

import useValidator from 'pages/Objectives/GoalStreams/useValidator'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'

import TopBar from './TopBar'
import QuestionInput from './QuestionInput'
import { BodyWizard, ButtonAction, RowFull, Wizard, WizardStep } from './styles'

const getFormEntries = (data = []) =>
  data.reduce((acc, cur) => ({ ...acc, [cur.name]: '' }), {})

export const WizardFlow = ({ data, objective }) => {
  const history = useHistory()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const [currentStep, setStepIndex] = useState(0)
  const [formData, setFormData] = useState(getFormEntries(data))
  const [isActive, setIsActive] = useState(false)
  const [error, invalid] = useValidator(data, currentStep, formData, inputRef)
  const { isLoading, data: objectiveData } = useSelector(
    state => state.objective
  )

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === data.length - 1

  const increment = () => setStepIndex(currentStep + 1)
  const decrement = () => setStepIndex(currentStep - 1)

  const postFlow = () => {
    dispatch(
      PostObjectiveDataRequest({
        goalType: objective,
        ...formData,
      })
    )
  }

  useEffect(() => {
    if (objectiveData && !isLoading) {
      history.push('/objetivos')
    }
  }, [history, isLoading, objectiveData])

  const handleSingleValue = event => {
    const {
      target: { name, value },
    } = event

    setFormData({ ...formData, [name]: value })
  }

  // useEffect to determine isActive
  useEffect(() => {
    const { name } = data[currentStep]
    const hasValue = formData[name].toString().trim().length > 0
    setIsActive(!invalid && hasValue)
  }, [setIsActive, formData, data, currentStep, invalid])

  const WizardContainer = () => (
    <WizardStep>
      <QuestionInput
        formData={formData}
        onChangeFormData={handleSingleValue}
        error={error}
        ref={inputRef}
        {...data[currentStep]}
      />
    </WizardStep>
  )

  const WizardButtom = () => (
    <RowFull>
      {!isFirstStep && (
        <Col lg="6" xs="12">
          <ButtonAction
            data-gtm-name="anterior"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            outline
            onClick={decrement}
          >
            Anterior
          </ButtonAction>
        </Col>
      )}
      {!isLastStep && (
        <Col lg={isFirstStep ? '12' : '6'} xs="12">
          <ButtonAction
            data-gtm-form="submit"
            data-gtm-name="proximo"
            onClick={increment}
            disabled={!isActive}
          >
            Próximo
          </ButtonAction>
        </Col>
      )}
      {isLastStep && (
        <Col lg="6" xs="12">
          <ButtonAction
            data-gtm-form="submit"
            data-gtm-name="concluir"
            onClick={postFlow}
            disabled={!isActive || isLoading}
            loading={isLoading}
          >
            Concluir
          </ButtonAction>
        </Col>
      )}
    </RowFull>
  )

  return (
    <Wizard>
      <TopBar
        currentStep={currentStep + 1}
        numberSteps={data.length + 1}
        nickname={formData.nickname}
      />
      <BodyWizard>
        <RowFull>
          <Col lg="4" xs="12">
            {WizardContainer()}
            {WizardButtom()}
          </Col>
        </RowFull>
      </BodyWizard>
    </Wizard>
  )
}

WizardFlow.defaultProps = {
  data: [],
  objective: '',
}

WizardFlow.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ),
      validate: PropTypes.func,
    })
  ),
  objective: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
