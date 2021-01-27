import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { ITripInsuranceQuotation } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IForm } from 'pages/TripInsurance/Creation/types'

import CreditCardNumberInput from './CreditCardNumberInput'
import { applyValidityMask, formatOption, validityError } from './utils'
import { IParcelOptionState, TFlagName, IOption } from '../types'

import * as S from '../styles'

const CreditCard = ({
  portoCreditCardIsNotSelected,
  selectedCreditCardIndex,
  parcelOptionState,
  cardNumberState,
  isNumberValidState,
  flagNameState,
  setName,
  validityDateState,
  validityHasErrorState,
  cvcState,
}: {
  portoCreditCardIsNotSelected: boolean
  selectedCreditCardIndex: number
  parcelOptionState: [
    IParcelOptionState,
    React.Dispatch<React.SetStateAction<IParcelOptionState>>
  ]
  cardNumberState: [string, React.Dispatch<React.SetStateAction<string>>]
  isNumberValidState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  flagNameState: [TFlagName, React.Dispatch<React.SetStateAction<TFlagName>>]
  setName: React.Dispatch<React.SetStateAction<string>>
  validityDateState: [string, React.Dispatch<React.SetStateAction<string>>]
  validityHasErrorState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
  cvcState: [string, React.Dispatch<React.SetStateAction<string>>]
}) => {
  const { form } = useFormFluxManagement<IForm>()
  const [validityHasError, setValidityHasError] = validityHasErrorState
  const [isOnBlurValidity, setIsOnBlurValidity] = useState<boolean>(false)
  const [options, setOptions] = useState<IOption[]>([])
  const [cvcHasError, setCvcHasError] = useState<boolean>(false)

  const { tripInsuranceQuotations } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
    })
  )

  useEffect(() => {
    const choosenPlan = tripInsuranceQuotations?.filter(
      plan => plan.codigoPlano === form.pacoteEscolhido
    )

    if (choosenPlan?.length) {
      setOptions(
        portoCreditCardIsNotSelected
          ? choosenPlan[0]?.formasPagamento.listaParcelamentoCartao.map(item =>
              formatOption(item, parcelOptionState[1])
            )
          : choosenPlan[0]?.formasPagamento.listaParcelamentoCartaoPorto.map(
              item => formatOption(item, parcelOptionState[1])
            )
      )
    }
  }, [
    form.pacoteEscolhido,
    portoCreditCardIsNotSelected,
    parcelOptionState,
    tripInsuranceQuotations,
  ])

  // 'validity' input error
  useEffect(() => {
    if (
      validityDateState[0].length >= 2 &&
      +validityDateState[0].slice(0, 2) > 12
    ) {
      setValidityHasError(true)
      return
    }

    if (
      validityDateState[0].length >= 7 &&
      !moment(validityDateState[0], 'MM/YYYY').isBetween(
        moment().subtract(1, 'months'),
        '2100-01-01'
      )
    ) {
      setValidityHasError(true)
      return
    }

    if (
      isOnBlurValidity &&
      validityDateState[0].length >= 1 &&
      validityDateState[0].length < 7
    ) {
      setValidityHasError(true)
      return
    }

    setIsOnBlurValidity(false)
    setValidityHasError(false)
  }, [validityDateState, setValidityHasError, isOnBlurValidity])

  return (
    <>
      <S.StyledCard
        overflow="visible"
        headerTitle={
          <S.HeaderInfo bold type="subheading" color="gray5">
            CARTÃO DE CRÉDITO
          </S.HeaderInfo>
        }
      >
        <S.InputsWrapper>
          <S.StyledSelect
            selected={parcelOptionState[0]}
            label="Número de parcelas"
            options={options}
            optionBoxDirection="top"
            testId="parcelas"
          />

          <CreditCardNumberInput
            cardNumberState={cardNumberState}
            selectedCreditCardIndex={selectedCreditCardIndex}
            isNumberValidState={isNumberValidState}
            flagNameState={flagNameState}
          />
          <S.BigInput
            label="Nome completo"
            placeholder="Digite"
            onChange={e => setName(e.target.value)}
          />
          <S.SmallText color="gray5" bold type="body">
            Assim como está impresso no cartão
          </S.SmallText>
          <S.FlexWrapper hasMargin>
            <S.ValidityInput
              label="Validade"
              placeholder="Digite"
              error={validityHasError && validityError}
              onBlur={() => setIsOnBlurValidity(true)}
              onChange={e => applyValidityMask(e, validityDateState[1])}
              maxLength={7}
            />
            <S.CVCInput
              label="CVC"
              placeholder="Digite"
              error={cvcHasError}
              onChange={e => {
                e.target.value = e.target.value.replace(/\D/g, '')
                cvcState[1](e.target.value)
                if (cvcState[0].length < 3) {
                  setCvcHasError(false)
                }
              }}
              onBlur={() => {
                if (cvcState[0].length < 3) {
                  setCvcHasError(true)
                } else {
                  setCvcHasError(false)
                }
              }}
              maxLength={3}
            />
          </S.FlexWrapper>
        </S.InputsWrapper>
      </S.StyledCard>
    </>
  )
}

export default CreditCard
