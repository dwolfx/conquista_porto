import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatLocaleStringToNumber } from 'helpers'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import { post, baseURLNamespaceInvestAws } from 'services/api'
import { Run2FAInitialRequest } from 'store/modules/2FAToken/action'

import AccountDetail from '../AccountDetail'
import AccountBalance from './AccountBalance'
import FormWithdraw from './FormWithdraw'
import Summary from './Summary'
import MessageCard from './MessageCard'

import { IFormData } from './types'
import * as s from './styles'

interface IProps {
  maxSteps: number
  step: number
  setStep: (step: number) => void
  onError: () => void
}

interface IFooter {
  nextStepAction?: () => void
}

const MainContent = ({ step, setStep, maxSteps, onError }: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasError, setError] = useState(false)
  const [isInputValueValid, setIsInputValueValid] = useState(false)
  const [formData, setFormData] = useState<IFormData>({
    withdrawValue: '',
    bankId: '',
  })

  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()

  useFetchBankData()
  const { withdrawInfos, cpf, id_cotista } = useSelector<any, any>(state => ({
    cpf: state.auth.cpf,
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    withdrawInfos: state.withdraw,
  }))

  const handlePostWithdraw = useCallback(async () => {
    setIsLoading(true)

    await post(`${baseURLNamespaceInvestAws}/cotista/retiradas`, {
      id_cotista,
      cpf_cnpj: cpf,
      data_operacao: moment().format('YYYY-MM-DD'),
      valor_operacao: formData.withdrawValue,
      id_conta_liquidacao: formData.bankId,
    })
      .then(() => setIsSuccess(true))
      .finally(() => setIsLoading(false))
  }, [id_cotista, formData, cpf])

  const nextStep = () => {
    if (step === maxSteps) {
      handlePostWithdraw()
    } else {
      setStep(++step)
    }
  }
  const prevStep = () => {
    setStep(--step)
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  const cardFooter = ({ nextStepAction }: IFooter) => (
    <s.ButtonWrapper>
      {step > 1 && (
        <s.Button
          data-gtm-subname="card de retirada"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="voltar"
          outline
          onClick={prevStep}
          disabled={false}
        >
          Voltar
        </s.Button>
      )}
      <s.Button
        data-gtm-subname="card de retirada"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="proximo"
        color="secondary"
        onClick={() => {
          if (nextStepAction) {
            nextStepAction()
          }
        }}
        disabled={
          !isInputValueValid ||
          isLoading ||
          withdrawInfos.isLoadingDetails ||
          withdrawInfos.isLoadingSummary ||
          withdrawInfos.hasErrorDetails ||
          withdrawInfos.hasErrorSummary
        }
        loading={isLoading}
        loadingColor="white"
      >
        Próximo
      </s.Button>
    </s.ButtonWrapper>
  )

  const stepsContent = [
    <s.Card
      footer={cardFooter({
        nextStepAction: nextStep,
      })}
    >
      <s.BodyWrapper>
        <AccountBalance
          accountBalanceValue={
            withdrawInfos.detailsData?.conta_porto_seguro?.saldo_disponivel
          }
          reloadOnClickFunction={onError}
          hasError={withdrawInfos.hasErrorDetails}
          isLoading={withdrawInfos.isLoadingDetails}
        />
        <s.Divisor />
        <FormWithdraw
          formData={formData}
          onChangeFormData={handleChangeFormData}
          setIsInputValueValid={setIsInputValueValid}
          accountBalanceValue={
            withdrawInfos.detailsData?.conta_porto_seguro?.saldo_disponivel
          }
        />
        <s.Divisor />
        <s.TextContainer>
          <Text bold color="gray5">
            O valor será creditado na sua conta cadastrada.
          </Text>
        </s.TextContainer>
      </s.BodyWrapper>
    </s.Card>,
    <s.Card
      footer={cardFooter({
        nextStepAction: () =>
          dispatch(Run2FAInitialRequest({ addToast, onSuccess: nextStep })),
      })}
    >
      <s.BodyWrapper>
        <AccountBalance
          accountBalanceValue={
            withdrawInfos.detailsData?.conta_porto_seguro?.saldo_disponivel
          }
          reloadOnClickFunction={onError}
          hasError={withdrawInfos.hasErrorDetails}
          isLoading={withdrawInfos.isLoadingDetails}
        />
        <s.Divisor />
        <Summary
          value={formatLocaleStringToNumber(formData.withdrawValue)}
          bankSelected={formData.bankId}
          onBankSelectedChange={bankSelectedId => {
            setFormData({
              ...formData,
              bankId: bankSelectedId,
            })
          }}
        />
      </s.BodyWrapper>
    </s.Card>,
    <s.TokenCard
      onNext={() => setStep(++step)}
      onPrevious={() => setStep(--step)}
    />,
    <s.DigitalSignature
      onConfirm={handlePostWithdraw}
      onError={() => setError(true)}
      onPrevious={() => setStep(--step)}
    />,
  ]

  if (isSuccess || hasError) {
    return <MessageCard type={isSuccess ? 'success' : 'error'} />
  }

  return isMobile ? (
    <>
      <s.Accordion
        titleNode="Informações"
        triggerCloseOnArrow={true}
        openByDefault={false}
      >
        <Divisor />
        <AccountDetail onError={onError} />
      </s.Accordion>
      <s.Card footer={cardFooter({})}>{stepsContent[step - 1]}</s.Card>
    </>
  ) : (
    <>{stepsContent[step - 1]}</>
  )
}

export default MainContent
