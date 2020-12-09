import React from 'react'

import Text from 'components/Text'

import * as S from '../styles'
import { ICreditCardForm } from '../types'

const CreditCard = (
  { portoCreditCardIsSelected, creditCardForm } :
  { portoCreditCardIsSelected: boolean, creditCardForm: [ICreditCardForm, React.Dispatch<React.SetStateAction<ICreditCardForm>>] }
  ) => {
    const [creditCardFormValue, setCreditCardFormValue] = creditCardForm

    const options = [
    {
      id: 1,
      text: '12x de R$310,00',
      onClick: () => setCreditCardFormValue({ ...creditCardFormValue, parcelOption: { id: 1, name: '12x de R$310,00' } })
    },
    {
      id: 2,
      text: '11x de R$310,00',
      onClick: () => setCreditCardFormValue({ ...creditCardFormValue, parcelOption: { id: 2, name: '11x de R$310,00' } })
    },
    {
      id: 3,
      text: '10x de R$310,00',
      onClick: () => setCreditCardFormValue({ ...creditCardFormValue, parcelOption: { id: 3, name: '10x de R$310,00' } })
    },
    {
      id: 4,
      text: '9x de R$310,00',
      onClick: () => setCreditCardFormValue({ ...creditCardFormValue, parcelOption: { id: 4, name: '9x de R$310,00' } })
    },
    {
      id: 5,
      text: '8x de R$310,00',
      onClick: () => setCreditCardFormValue({ ...creditCardFormValue, parcelOption: { id: 5, name: '8x de R$310,00' } })
    },
  ]

  return (
    <>
      <S.StyledCard
        headerTitle={<Text bold type="subheading" color="gray5">CARTÃO DE CRÉDITO</Text>}>


          <S.StyledSelect
          selected={creditCardFormValue.parcelOption}
          label="Número de parcelas"
          options={options}
          optionBoxDirection="top"
          testId="parcelas"
          />

          {!portoCreditCardIsSelected &&
          <>
            <S.BigInput
            label="Número do cartão"
            onChange={e => setCreditCardFormValue({ ...creditCardFormValue, cardNumber: e.target.value })}
            value={creditCardFormValue.cardNumber}
            />
            <S.BigInput
            label="Nome completo"
            onChange={e => setCreditCardFormValue({ ...creditCardFormValue, name: e.target.value })}
            value={creditCardFormValue.name}
            />
            <S.SmallText color="gray5" bold type="body">Assim como está impresso no cartão</S.SmallText>

            <S.FlexWrapper hasMargin>
              <S.SmallInput
              label="Validade"
              onChange={e => setCreditCardFormValue({ ...creditCardFormValue, validity: e.target.value })}
              value={creditCardFormValue.validity}
              />
              <S.SmallInput
              label="CVC"
              onChange={e => setCreditCardFormValue({ ...creditCardFormValue, cvc: e.target.value })}
              value={creditCardFormValue.cvc}
              />
            </S.FlexWrapper>
          </>
          }
      </S.StyledCard>
    </>
  )
}

export default CreditCard
