import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'
import { GetBankDataRequest } from 'store/modules/BankData/action'
import useFetchBankData from 'hooks/BankData/useFetchBankData'
import Text from 'components/Text'

import AccountBalance from './AccountBalance'
import FormWithdraw from './FormWithdraw'

import * as s from './styles'

type IFormData = {
  withdrawValue: string
}

interface IWithdrawCard {
  step: number
  setStep: (step: number) => void
}
const WithdrawCard = ({ step, setStep }: IWithdrawCard) => {
  const [isInputValueValid, setIsInputValueValid] = useState(false)
  const [formData, setFormData] = useState<IFormData>({ withdrawValue: '' })

  const isMobile = useMedia('xs')

  useFetchBankData()
  const dispatch = useDispatch()
  const { bankData, auth } = useSelector((state: any) => ({
    bankData: state.bankData,
    auth: state.auth,
  }))

  const handleAccountBalanceReloadClick = () => {
    dispatch(GetBankDataRequest(auth.cpf))
  }

  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }

  const handleChangeFormData = (newFormData: IFormData) => {
    setFormData(prevState => ({ ...prevState, ...newFormData }))
  }

  const cardBody = () => (
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
          O valor será creditado na sua conta de investimento.
        </Text>
      </s.TextContainer>
    </s.BodyWrapper>
  )

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
        disabled={!isInputValueValid}
      >
        Próximo
      </s.Button>
    </s.ButtonWrapper>
  )

  return isMobile ? (
    <s.Card
      headerIconInfo
      headerIconInfoClick={() => {}}
      headerTitle="Informações"
      footer={cardFooter()}
    >
      {cardBody()}
    </s.Card>
  ) : (
    <s.Card footer={cardFooter()}>{cardBody()}</s.Card>
  )
}

export default WithdrawCard
