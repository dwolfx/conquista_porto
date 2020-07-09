import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'styled-components/macro'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatLocaleStringToNumber } from 'helpers'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import useMedia from 'hooks/useMedia'

import { post, baseURLNamespaceInvestAws } from 'services/api'
import { GetBankDataRequest } from 'store/modules/BankData/action'

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
}

const MainContent = ({ step, setStep, maxSteps }: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasError, setError] = useState(false)
  const [isInputValueValid, setIsInputValueValid] = useState(false)
  const [formData, setFormData] = useState<IFormData>({
    withdrawValue: '',
    bankId: '',
  })

  const isMobile = useMedia('xs')

  useFetchBankData()
  const dispatch = useDispatch()
  const { bankData, cpf, id_cotista } = useSelector<any, any>(state => ({
    bankData: state.bankData,
    cpf: state.auth.cpf,
    id_cotista: state.suitabilityInfo.data?.id_cotista,
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
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [id_cotista, formData, cpf])

  const handleAccountBalanceReloadClick = () => {
    dispatch(GetBankDataRequest(cpf))
  }

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

  const cardFooter = () => (
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
        onClick={nextStep}
        disabled={!isInputValueValid || isLoading}
        loading={isLoading}
        loadingColor="white"
      >
        Próximo
      </s.Button>
    </s.ButtonWrapper>
  )

  const stepsContent = [
    <s.Card footer={cardFooter()}>
      <s.BodyWrapper>
        <AccountBalance
          accountBalanceValue={
            bankData?.data?.DadosContaPortoSeguro?.saldo_disponivel
          }
          reloadOnClickFunction={handleAccountBalanceReloadClick}
          hasError={bankData.hasError}
          isLoading={bankData.isLoading}
        />
        <s.Divisor />
        <FormWithdraw
          formData={formData}
          onChangeFormData={handleChangeFormData}
          setIsInputValueValid={setIsInputValueValid}
          accountBalanceValue={
            bankData?.data?.DadosContaPortoSeguro?.saldo_disponivel
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
    <s.Card footer={cardFooter()}>
      <s.BodyWrapper>
        <AccountBalance
          accountBalanceValue={
            bankData?.data?.DadosContaPortoSeguro?.saldo_disponivel
          }
          reloadOnClickFunction={handleAccountBalanceReloadClick}
          hasError={bankData.hasError}
          isLoading={bankData.isLoading}
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
      onPrevious={() => setStep(--step)}
      onError={() => null}
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
        <AccountDetail />
      </s.Accordion>
      <s.Card footer={cardFooter()}>{stepsContent[step - 1]}</s.Card>
    </>
  ) : (
    <>{stepsContent[step - 1]}</>
  )
}

export default MainContent
