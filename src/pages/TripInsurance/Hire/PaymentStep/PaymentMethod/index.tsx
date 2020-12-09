import React from 'react'

import { ThemeContext } from 'styled-components'

import Text from 'components/Text'

import * as S from '../styles'
import IconExporter from 'components/IconExporter'

const PaymentMethod = ({ portoCreditCardState }: { portoCreditCardState: [boolean, React.Dispatch<React.SetStateAction<boolean>>] }) => {
  const theme = React.useContext(ThemeContext)
  const [portoCreditCardIsSelected, setPortoCreditCardIsSelected] = portoCreditCardState

  return (
    <>
      <S.StyledCard
        headerTitle={<Text bold type="subheading" color="gray5">FORMA DE PAGAMENTO</Text>}>

          <Text
            type="headline"
            bold
            color="black"
          >
            Escolha como deseja fazer o pagamento do Seguro Viagem
          </Text>

          <S.MarginTopStyledText
            type="headline"
            bold
            color="gray4"
          >
            5% de desconto no Cartão Porto Seguro
          </S.MarginTopStyledText>

          <S.CreditCardWrapper cardIsSelected={portoCreditCardIsSelected}>
            <S.StyledRadio
              id="cartao-porto"
              name="cartao-porto"
              value=''
              checked={portoCreditCardIsSelected}
              handleChange={() => setPortoCreditCardIsSelected(true)}
            />
            <IconExporter name="creditcard" width={28} fill={portoCreditCardIsSelected ? theme.colors.blue4 : theme.colors.gray4}/>
            <S.TextWrapper>
              <Text type="title" bold color="gray6">Porto Seguro Black **** 8899</Text>
              <S.OtherFlexWrapper>
                <Text type="caption" bold color="gray5">Não utiliza limite do cartão</Text>
                <S.StyledPopover
                  tooltip
                  content={() => (
                    <Text bold type="body" color="gray5">
                      Ao utilizar o cartão Porto, você não compromete o seu limite total, como em uma compra comum no crédito. Usa apenas o valor necessário para pagar a parcela mensal do financiamento.
                    </Text>
                  )}
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

          <S.CreditCardWrapper cardIsSelected={!portoCreditCardIsSelected}>
            <S.StyledRadio
              id="cartao-outro"
              name="cartao-outro"
              value=''
              checked={!portoCreditCardIsSelected}
              handleChange={() => setPortoCreditCardIsSelected(false)}
            />
            <IconExporter name="creditcard" width={28} fill={!portoCreditCardIsSelected ? theme.colors.blue4 : theme.colors.gray4}/>
            <S.TextWrapper>
              <Text type="title" bold color="gray6">Outro cartão</Text>
            </S.TextWrapper>
          </S.CreditCardWrapper>
      </S.StyledCard>
    </>
  )
}

export default PaymentMethod
