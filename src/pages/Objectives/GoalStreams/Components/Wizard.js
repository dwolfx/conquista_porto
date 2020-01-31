import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Col } from 'styled-bootstrap-grid'
import { formatMoneyDecimal, formatDateMask } from 'helpers'
import { PostObjectiveDataRequest } from 'store/modules/Objective/action'
import TopBar from './TopBar'
import QuestionFlow from './QuestionFlow'

import { BodyWizard, ButtonAction, RowFull, Wizard, WizardStep } from './styles'

export const WizardFlow = ({ data, objective }) => {
  const dispatch = useDispatch()
  const [currentStep, setStepIndex] = useState(0)
  const [formData, setFormData] = useState({})
  const [isActive, setIsActive] = useState(false)
  const computedState = {
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === data.length - 1,
  }
  const { isFirstStep, isLastStep } = computedState
  const increment = () => setStepIndex(currentStep + 1)
  const decrement = () => setStepIndex(currentStep - 1)

  useEffect(() => {
    setIsActive(!!formData[data[currentStep].name])
  }, [formData, data, currentStep])

  const postFlow = () => dispatch(PostObjectiveDataRequest(objectiveData))

  const moneyMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
  }

  const handleSingleValue = event => {
    if (data[currentStep].type === 'number') moneyMask(event)
    if (data[currentStep].type === 'date') formatDateMask(event)
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const objectiveData = {
    goalType: objective,
    ...formData,
  }

  const WizardContainer = () => (
    <WizardStep>
      <QuestionFlow
        formData={formData}
        onChangeFormData={handleSingleValue}
        {...data[currentStep]}
      />
    </WizardStep>
  )

  const WizardButtom = () => (
    <RowFull>
      {!isFirstStep && (
        <Col lg="6" xs="12">
          <ButtonAction outline onClick={decrement}>
            Anterior
          </ButtonAction>
        </Col>
      )}
      {!isLastStep && (
        <Col lg={isFirstStep ? '12' : '6'} xs="12">
          <ButtonAction onClick={increment} disabled={!isActive}>
            Próximo
          </ButtonAction>
        </Col>
      )}
      {isLastStep && (
        <Col lg="6" xs="12">
          <ButtonAction onClick={postFlow} disabled={!isActive}>
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
        numberSteps={data.length}
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
  data: PropTypes.array,
  objective: PropTypes.string,
}
