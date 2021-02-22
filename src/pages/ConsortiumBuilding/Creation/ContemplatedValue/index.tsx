import React from 'react'

import Text from 'components/Text'
import StepBar from 'components/StepBar'
import Loading from 'components/Loading'
import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { formatMoneyDecimal } from 'helpers'

import { useDispatch, useSelector } from 'react-redux'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { IContemplatedState } from './types'
import { useToast } from 'hooks/toast'
import { IFormConsortiumBuilding, Steps } from '../types'

import * as s from './styles'
import { validationInputError } from 'pages/CreditCard/Creation/CreditCardStep/validators'
import { dict } from 'components/IconExporter'
import { PostProposalSimulationsRequest } from 'store/modules/ConsortiumBuilding/ProposalSimulations/action'

const ContemplatedValue: StepComponent = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { updateForm, form } = useFormFluxManagement<IFormConsortiumBuilding>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const [contemplateValue, setContemplateValue] = React.useState<string>('')
  const [isTouched, setIsTouched] = React.useState<boolean>(false)

  const { data, isLoading, status } = useSelector(
    (state: IContemplatedState) => ({
      data: state.contemplated.data,
      isLoading: state.contemplated.isLoading,
      status: state.contemplated.status,
    })
  )

  const { creation, page, buttons } = TextsConsortiumBuilding(
    `${data && data.valor_minimo_credito / 1000} e ${data &&
      data.valor_maximo_credito / 1000} mil reais`
  )

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maximum = (data ? data.valor_maximo_credito : 0) * 100
    const value = Number(e.target.value.replace(/\D/g, ''))
    if (maximum < value) {
      e.target.value = formatMoneyDecimal(maximum)
    }
    setContemplateValue(e.target.value)
  }

  const handleButtonClick = React.useCallback(() => {
    updateForm({
      ...form,
      valorCredito: Number(contemplateValue.replace(/\./g, '')),
    })
    dispatch(
      PostProposalSimulationsRequest({
        payload: {
          tipoPessoa: form.tipoPessoa,
          tipoBusca: form.tipoBusca,
          codigoProduto: form.codigoProduto,
          valorCredito: Number(contemplateValue.replace(/\./g, '')),
          uf: form.uf,
          codigoCanal: String(form.codigoCanal),
        },
        onErrorToast: addToast,
        onSuccess: () => null,
      })
    )
    instantiate(Steps.choosePlanStep)
  }, [dispatch, addToast, contemplateValue, form, instantiate, updateForm])

  const isDisabled: boolean =
    !!contemplateValue &&
    !!data &&
    !(
      Number(contemplateValue.replace(/\D/g, '')) <
      data.valor_minimo_credito * 100
    ) &&
    isTouched

  const validationContemplatedValue = ():
    | boolean
    | { icon: keyof typeof dict; message: string } => {
    if (contemplateValue && data && isTouched) {
      const { coveredValue } = ErrorForm(
        `R$ ${data &&
          formatMoneyDecimal(data.valor_minimo_credito * 100)} e R$ ${data &&
          formatMoneyDecimal(data.valor_maximo_credito * 100)}`
      )

      if (
        Number(contemplateValue.replace(/\D/g, '')) <
        data.valor_minimo_credito * 100
      ) {
        return coveredValue
      }
    }

    return validationInputError(contemplateValue, isTouched)
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
          <s.QuestionText type="body" color="gray5" textAlign="center">
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
            value={contemplateValue}
            placeholder={creation.steps.value.inputLabel}
            onBlur={() => setIsTouched(true)}
            disabled={isLoading}
            onChange={handlerChange}
            error={validationContemplatedValue()}
          />
          <s.StyledButton
            data-gtm-name="Simular"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={handleButtonClick}
            disabled={!isDisabled}
          >
            {buttons.simulate}
          </s.StyledButton>
        </s.ContentContainer>
      </s.ContentWrapper>
    </>
  )
}

export default ContemplatedValue
