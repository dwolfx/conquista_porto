import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import { formatMoneyDecimal, formatMoney } from 'helpers'

import Text from 'components/Text'
import Icon from 'components/IconExporter'
import InputText from 'components/NewInput'

import { IAnswer } from 'store/modules/Objective/types'

import {
  ValidateInitialInvestment,
  ValidateMonthlyInvestment,
  ValidateNickname,
  ValidateTargetDate,
} from './validations'

import * as s from './styles'

interface IProps {
  isDrawerOpen: boolean
  onClose: () => void
  onConfirmation: () => void
  formData: Omit<IAnswer, 'uf' | 'goal_type'>
  setFormData: (newValue: Omit<IAnswer, 'uf' | 'goal_type'>) => void
}

export default function EditDrawer({
  isDrawerOpen,
  onClose,
  onConfirmation,
  formData,
  setFormData,
}: IProps) {
  const [invalidInput, setInvalidInput] = useState({
    nickname: false,
    initial_value: false,
    monthly_value: false,
    target_date: false,
  })
  const [blurredInputs, setBlurredInputs] = useState<string[]>([])

  const isLoading = useSelector<any, any>(state => state.objective.isLoading)

  const moneyMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
  }

  const formatDateMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue
    if (strippedValue.length < 5) {
      newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
    } else {
      newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = newValue
  }

  const renderErrorMessage = (message: string) => (
    <s.ErrorMessageContainer>
      <Icon name="information" color="magenta2" width={21} />
      <Text type="body" color="magenta2">
        {message}
      </Text>
    </s.ErrorMessageContainer>
  )

  const validator = (value: string | number, name: string) => {
    if (!blurredInputs.includes(name)) {
      setBlurredInputs([...blurredInputs, name])
    }

    switch (name) {
      case 'nickname':
        if (ValidateNickname(value.toString())[0]) {
          if (invalidInput.nickname)
            setInvalidInput({ ...invalidInput, nickname: false })
          break
        }

        if (!invalidInput.nickname)
          setInvalidInput({ ...invalidInput, nickname: true })
        break

      case 'initial_value':
        if (ValidateInitialInvestment(+value)[0]) {
          if (invalidInput.initial_value)
            setInvalidInput({ ...invalidInput, initial_value: false })
          break
        }

        if (!invalidInput.initial_value)
          setInvalidInput({ ...invalidInput, initial_value: true })
        break
      case 'monthly_value':
        if (ValidateMonthlyInvestment(+value)[0]) {
          if (invalidInput.monthly_value)
            setInvalidInput({ ...invalidInput, monthly_value: false })
          break
        }
        if (!invalidInput.monthly_value)
          setInvalidInput({ ...invalidInput, monthly_value: true })
        break
      case 'target_date':
        if (ValidateTargetDate(value.toString())[0]) {
          if (invalidInput.target_date)
            setInvalidInput({ ...invalidInput, target_date: false })
          break
        }
        if (!invalidInput.target_date)
          setInvalidInput({ ...invalidInput, target_date: true })
        break
      default:
        break
    }
  }

  const handleSingleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target

    if (blurredInputs.indexOf(name) >= 0) {
      validator(event.target.value, name)
    }

    if (
      name === 'initial_value' ||
      name === 'monthly_value' ||
      name === 'target_value'
    ) {
      moneyMask(event)
    }
    if (name === 'target_date') {
      formatDateMask(event)
    }
    setFormData({ ...formData, [name]: event.target.value })
  }

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={onConfirmation}
      disabled={
        invalidInput.nickname ||
        invalidInput.initial_value ||
        invalidInput.monthly_value ||
        invalidInput.target_date ||
        isLoading
      }
      loading={isLoading}
    >
      Confirmar e recalcular
    </s.ButtonSubmit>
  )

  return (
    <s.DrawerForm
      drawerTitle="Resumo"
      isOpen={isDrawerOpen}
      handleClose={onClose}
      footer={footerDrawer()}
    >
      <s.FormWrapper data-gtm-type="form" data-gtm-name="resumo">
        <s.ColInput>
          <InputText
            data-gtm-form="input"
            data-gtm-name="apelido"
            name="nickname"
            error={invalidInput.nickname}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              validator(e.target.value, 'nickname')
            }
            label="Apelido"
            onChange={handleSingleValue}
            value={formData!.nickname}
          />
          {invalidInput.nickname &&
            renderErrorMessage(
              ValidateNickname(formData.nickname)[1].toString()
            )}
        </s.ColInput>
        <s.ColInput error={invalidInput.nickname}>
          <InputText
            data-gtm-form="input"
            data-gtm-name="investimento inicial"
            name="initial_value"
            error={invalidInput.initial_value}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              validator(e.target.value, 'initial_value')
            }
            prefix="R$"
            label="Investimento inicial"
            onChange={handleSingleValue}
            value={formatMoney(formData!.initial_value)}
            maxLength={14}
          />
          {invalidInput.initial_value &&
            renderErrorMessage(
              ValidateInitialInvestment(formData!.initial_value)[1].toString()
            )}
        </s.ColInput>
        <s.ColInput error={invalidInput.initial_value}>
          <InputText
            data-gtm-form="input"
            data-gtm-name="investimento mensal"
            name="monthly_value"
            error={invalidInput.monthly_value}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              validator(e.target.value, 'monthly_value')
            }
            prefix="R$"
            label="Investimento mensal"
            onChange={handleSingleValue}
            value={formatMoney(formData!.monthly_value)}
            maxLength={14}
          />
          {invalidInput.monthly_value &&
            renderErrorMessage(
              ValidateMonthlyInvestment(formData!.monthly_value)[1].toString()
            )}
        </s.ColInput>
        <s.ColInput error={invalidInput.monthly_value}>
          <InputText
            data-gtm-form="input"
            data-gtm-name="meta financeira"
            name="target_value"
            prefix="R$"
            label="Meta financeira"
            onChange={handleSingleValue}
            value={formatMoney(formData!.target_value)}
            maxLength={14}
          />
        </s.ColInput>
        <s.ColInput>
          <InputText
            data-gtm-form="input"
            data-gtm-name="data-alvo"
            name="target_date"
            error={invalidInput.target_date}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              validator(e.target.value, 'target_date')
            }
            label="Data-alvo"
            onChange={handleSingleValue}
            value={formData!.target_date}
          />
          {invalidInput.target_date &&
            renderErrorMessage(
              ValidateTargetDate(formData!.target_date)[1].toString()
            )}
        </s.ColInput>
      </s.FormWrapper>
    </s.DrawerForm>
  )
}
