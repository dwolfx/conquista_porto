import React from 'react'
import { uuid } from 'uuidv4'
import { ThemeContext } from 'styled-components'

import IconExporter from 'components/IconExporter'
import Text from 'components/Text'

import { ICreditCard } from 'store/modules/TripInsurance/CreditCard/types'

import { ICreditCardForm } from '../types'
import * as S from '../styles'

const PaymentMethod = ({
  selectedCreditCardState,
  setCreditCardFormValue,
  creditCards,
}: {
  selectedCreditCardState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ]
  setCreditCardFormValue: React.Dispatch<React.SetStateAction<ICreditCardForm>>
  creditCards?: ICreditCard[]
}) => {
  const theme = React.useContext(ThemeContext)
  const [selectedCreditCard, setSelectedCreditCard] = selectedCreditCardState

  const creditCardFormInitialValue = {
    parcelOption: {
      id: 0,
      name: '',
    },
    cardNumber: '',
    name: '',
    validity: '',
    cvc: '',
  }

  const capitalizeString = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  return (
    <>
      <S.StyledCard
        headerTitle={
          <Text bold type="subheading" color="gray5">
            FORMA DE PAGAMENTO
          </Text>
        }
      >
        <Text type="headline" bold color="black">
          Escolha como deseja fazer o pagamento do Seguro Viagem
        </Text>

        <S.MarginTopStyledText type="headline" bold color="gray4">
          5% de desconto no Cartão Porto Seguro
        </S.MarginTopStyledText>

        {creditCards?.length
          ? creditCards?.map((creditCard, index) => (
              <S.CreditCardWrapper
                key={uuid()}
                cardIsSelected={index === selectedCreditCard}
              >
                <S.StyledRadio
                  id="cartao-porto"
                  name="cartao-porto"
                  value=""
                  checked={index === selectedCreditCard}
                  handleChange={() => {
                    setSelectedCreditCard(index)
                    setCreditCardFormValue(creditCardFormInitialValue)
                  }}
                />
                <IconExporter
                  name="creditcard"
                  width={28}
                  fill={
                    index === selectedCreditCard
                      ? theme.colors.blue4
                      : theme.colors.gray4
                  }
                />
                <S.TextWrapper>
                  <Text type="title" bold color="gray6">
                    {`Porto Seguro ${capitalizeString(creditCard.Tipo)} **** ${
                      creditCard.UltimosDigitos
                    }
              `}
                  </Text>
                  <S.OtherFlexWrapper>
                    <Text type="caption" bold color="gray5">
                      Não utiliza limite do cartão
                    </Text>
                    <S.StyledPopover
                      content={
                        <S.PopoverText>
                          Ao utilizar o cartão Porto, você não compromete o seu
                          limite total, como em uma compra comum no crédito. Usa
                          apenas o valor necessário para pagar a parcela mensal
                          do financiamento.
                        </S.PopoverText>
                      }
                    >
                      <IconExporter
                        data-testid="limit-credit-card"
                        name="information"
                        role="button"
                        aria-label="info-credit-card"
                        fill={theme.colors.blue4}
                        width={14}
                      />
                    </S.StyledPopover>
                  </S.OtherFlexWrapper>
                </S.TextWrapper>
              </S.CreditCardWrapper>
            ))
          : null}

        {creditCards ? (
          <S.CreditCardWrapper
            cardIsSelected={selectedCreditCard + 1 > creditCards.length}
          >
            <S.StyledRadio
              id="cartao-outro"
              name="cartao-outro"
              value=""
              checked={selectedCreditCard + 1 > creditCards.length}
              handleChange={() => {
                setSelectedCreditCard(creditCards ? creditCards.length + 1 : 0)
                setCreditCardFormValue(creditCardFormInitialValue)
              }}
            />
            <IconExporter
              name="creditcard"
              width={28}
              fill={
                selectedCreditCard + 1 > creditCards.length
                  ? theme.colors.blue4
                  : theme.colors.gray4
              }
            />
            <S.TextWrapper>
              <Text type="title" bold color="gray6">
                Outro cartão
              </Text>
            </S.TextWrapper>
          </S.CreditCardWrapper>
        ) : null}
      </S.StyledCard>
    </>
  )
}

export default PaymentMethod
