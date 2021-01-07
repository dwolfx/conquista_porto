import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { formatMoney } from 'helpers'

import {
  ITripInsuranceQuotation,
  ICreditCardInstallment,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IForm } from 'pages/TripInsurance/Creation/types'

import { ICreditCardForm } from '../types'
import * as S from '../styles'

interface IOption {
  id: number
  text: string
  onClick: () => void
}

const formatText = (installment: ICreditCardInstallment): string =>
  installment.descricao.includes('x')
    ? `${installment.descricao} de ${formatMoney(installment.valor)}`
    : `1x de ${formatMoney(installment.valor)} (${installment.descricao})`

const formatOption = (
  installment: ICreditCardInstallment,
  creditCardFormValue: ICreditCardForm,
  setCreditCardFormValue: React.Dispatch<React.SetStateAction<ICreditCardForm>>
): IOption => {
  return {
    id: +installment.id,
    text: formatText(installment),
    onClick: () =>
      setCreditCardFormValue({
        ...creditCardFormValue,
        parcelOption: {
          id: +installment.id,
          name: formatText(installment),
        },
      }),
  }
}

const CreditCard = ({
  portoCreditCardIsNotSelected,
  creditCardForm,
}: {
  portoCreditCardIsNotSelected: boolean
  creditCardForm: [
    ICreditCardForm,
    React.Dispatch<React.SetStateAction<ICreditCardForm>>
  ]
}) => {
  const [creditCardFormValue, setCreditCardFormValue] = creditCardForm
  const [options, setOptions] = useState<IOption[]>([])
  const { form } = useFormFluxManagement<IForm>()

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
              formatOption(item, creditCardFormValue, setCreditCardFormValue)
            )
          : choosenPlan[0]?.formasPagamento.listaParcelamentoCartaoPorto.map(
              item =>
                formatOption(item, creditCardFormValue, setCreditCardFormValue)
            )
      )
    }
  }, [
    creditCardFormValue,
    form.pacoteEscolhido,
    portoCreditCardIsNotSelected,
    setCreditCardFormValue,
    tripInsuranceQuotations,
  ])

  return (
    <>
      <S.StyledCard
        overflow="visible"
        headerTitle={
          <Text bold type="subheading" color="gray5">
            CARTÃO DE CRÉDITO
          </Text>
        }
      >
        <S.StyledSelect
          selected={creditCardFormValue.parcelOption}
          label="Número de parcelas"
          options={options}
          optionBoxDirection="top"
          testId="parcelas"
        />

        <S.BigInput
          label="Número do cartão"
          onChange={e =>
            setCreditCardFormValue({
              ...creditCardFormValue,
              cardNumber: e.target.value,
            })
          }
          value={creditCardFormValue.cardNumber}
        />
        <S.BigInput
          label="Nome completo"
          onChange={e =>
            setCreditCardFormValue({
              ...creditCardFormValue,
              name: e.target.value,
            })
          }
          value={creditCardFormValue.name}
        />
        <S.SmallText color="gray5" bold type="body">
          Assim como está impresso no cartão
        </S.SmallText>

        <S.FlexWrapper hasMargin>
          <S.SmallInput
            label="Validade"
            onChange={e =>
              setCreditCardFormValue({
                ...creditCardFormValue,
                validity: e.target.value,
              })
            }
            value={creditCardFormValue.validity}
          />
          <S.SmallInput
            label="CVC"
            onChange={e =>
              setCreditCardFormValue({
                ...creditCardFormValue,
                cvc: e.target.value,
              })
            }
            value={creditCardFormValue.cvc}
          />
        </S.FlexWrapper>
      </S.StyledCard>
    </>
  )
}

export default CreditCard
