import React, { useState, useEffect } from 'react'

import Text from 'components/Text'
import StepBar from 'components/StepBar'
import Loading from 'components/Loading'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { formatLocaleStringToNumber, formatMoneyDecimal } from 'helpers'

import { useSelector, useDispatch } from 'react-redux'
import { GetContemplatedIntervalDataRequest } from 'store/modules/ConsortiumBuilding/Contemplated/action'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { StepComponent } from 'hooks/FluxManagement/types'
import * as s from './styles'
import { IContemplatedState } from './types'
import { IFormConsortiumBuilding } from '../types'

const ContemplatedValue: StepComponent = () => {
  const { updateForm, form } = useFormFluxManagement<IFormConsortiumBuilding>()
  const [contemplateValue, setContemplateValue] = useState({
    touched: false,
    value: '',
  })
  const [isValid, setIsValid] = useState(false)
  const dispatch = useDispatch()
  const { data, isLoading, status } = useSelector(
    (state: IContemplatedState) => ({
      data: state.contemplated.data,
      isLoading: state.contemplated.isLoading,
      status: state.contemplated.status,
    })
  )

  const { creation, page, buttons } = texts(
    `${data && data.valor_minimo_credito / 1000} e ${data &&
      data.valor_maximo_credito / 1000} mil reais`
  )
  const { coveredValue } = ErrorForm(
    `R$ ${data &&
      formatMoneyDecimal(data.valor_minimo_credito * 100)} e R$ ${data &&
      formatMoneyDecimal(data.valor_maximo_credito * 100)}`
  )

  useEffect(() => {
    dispatch(GetContemplatedIntervalDataRequest())
  }, [dispatch])

  const validateInput = (value: string) => {
    setContemplateValue({ touched: true, value })
    const minimal = data ? data.valor_minimo_credito : 0
    const maximum = data ? data.valor_maximo_credito : 0
    if (
      formatLocaleStringToNumber(value.replace(/\./g, '')) < minimal ||
      formatLocaleStringToNumber(value.replace(/\./g, '')) > maximum
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleButtonClick = () => {
    if (isValid && contemplateValue.value) {
      updateForm({
        ...form,
        valorCredito: Number(contemplateValue.value),
      })
    }
  }

  return (
    <>
      <StepBar
        title={creation.title}
        type={page}
        actualStep={2}
        totalNumberOfSteps={creation.stepMax}
      />
      <s.ContentWrapper>
        <s.ContentContainer>
          <Text type="headline" color="gray6" textAlign="center">
            {creation.steps.value.title}
          </Text>
          <s.QuestionText type="title" color="gray5" textAlign="center">
            {status !== '' ? (
              creation.steps.value.description
            ) : (
              <Loading type="spinner" />
            )}
          </s.QuestionText>
          <s.InputMoney
            data-testid="financial-application-money-input"
            data-gtm-form="input"
            data-gtm-name="quanto investir"
            value={contemplateValue.value}
            placeholder={creation.steps.value.inputLabel}
            disabled={isLoading}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              validateInput(target.value)
            }
            error={contemplateValue.touched && !isValid && coveredValue}
          />
          <s.StyledButton
            data-gtm-name="Simular"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={handleButtonClick}
            disabled={!isValid}
          >
            {buttons.simulate}
          </s.StyledButton>
        </s.ContentContainer>
      </s.ContentWrapper>
    </>
  )
}

export default ContemplatedValue
