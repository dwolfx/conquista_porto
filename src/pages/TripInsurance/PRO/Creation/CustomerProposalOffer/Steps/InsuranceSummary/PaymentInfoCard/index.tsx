import React from 'react'

import ButtonLink from 'components/Button/Link'
import DataRow from 'pages/TripInsurance/commons/DataRow'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { capitalize, formatMoney } from 'helpers'
import { getFlagName } from 'pages/TripInsurance/Hire/PaymentStep/utils'

// mock temporário
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

import { IForm } from 'pages/TripInsurance/PRO/types'
import { IPayment } from 'pages/TripInsurance/Creation/types'

import * as s from '../styles'

// mock temporário
const tripInsuranceQuotations = tripInsuranceQuotationMock.ViagemPacote.pacotes

const PaymentInfoCard: React.FC = () => {
  const { form } = useFormFluxManagement<IForm>()

  const checkEmptyPaymentFields = (
    paymentData: IPayment | undefined
  ): boolean => {
    return paymentData
      ? !paymentData.codigoBandeira ||
          !getFlagName(
            !!paymentData.isCartaoPorto,
            paymentData.codigoBandeira ?? 0
          ) ||
          !paymentData.primeiroNumero ||
          !paymentData.segundoNumero ||
          !paymentData.terceiroNumero ||
          !paymentData.quartoNumero ||
          !paymentData.mesValidade ||
          !paymentData.anoValidade ||
          !paymentData.quantidadeParcelas ||
          !paymentData.nomeTitular
      : true
  }

  const getInstallment = (): string => {
    if (form?.pagamento?.quantidadeParcelas) {
      const value = form.pagamento.isCartaoPorto
        ? `${formatMoney(
            tripInsuranceQuotations.filter(
              plan => plan.nomePlano === form.nomeDoPlano
            )[0]?.formasPagamento.listaParcelamentoCartaoPorto[
              form.pagamento.quantidadeParcelas - 1
            ].valor
          )}`
        : `${formatMoney(
            tripInsuranceQuotations.filter(
              plan => plan.nomePlano === form.nomeDoPlano
            )[0]?.formasPagamento.listaParcelamentoCartao[
              form.pagamento.quantidadeParcelas - 1
            ].valor
          )}`

      return form.pagamento.quantidadeParcelas === 1
        ? `${value} à vista`
        : `${form.pagamento.quantidadeParcelas}x de ${value}`
    }

    return ''
  }

  return (
    <s.Card>
      <s.CardContentWrapper>
        <s.CardTitleWrapper>
          <Text type="subheading" bold color="gray5">
            FORMA DE PAGAMENTO
          </Text>
          <ButtonLink hasNotification={checkEmptyPaymentFields(form.pagamento)}>
            ALTERAR
          </ButtonLink>
        </s.CardTitleWrapper>
        <DataRow
          label="Modelo"
          value={`${
            form.pagamento?.isCartaoPorto ? 'Cartão Porto Seguro ' : 'Cartão '
          }${capitalize(
            getFlagName(
              !!form.pagamento?.isCartaoPorto,
              form.pagamento?.codigoBandeira ?? 0
            )
          )}`}
          error={
            !form.pagamento?.codigoBandeira ||
            !getFlagName(
              !!form.pagamento?.isCartaoPorto,
              form.pagamento?.codigoBandeira ?? 0
            )
          }
        />
        <Divisor />
        <DataRow
          label="Número"
          value={`**** **** **** ${form.pagamento?.quartoNumero}`}
          error={
            !form.pagamento?.primeiroNumero ||
            !form.pagamento?.segundoNumero ||
            !form.pagamento?.terceiroNumero ||
            !form.pagamento?.quartoNumero
          }
        />
        <Divisor />
        <DataRow
          label="Vencimento"
          value={`${form.pagamento?.mesValidade}/${form.pagamento?.anoValidade}`}
          error={!form.pagamento?.mesValidade || !form.pagamento?.anoValidade}
        />
        <Divisor />
        <DataRow
          label="Número de parcelas"
          value={getInstallment()}
          error={!form.pagamento?.quantidadeParcelas}
        />
      </s.CardContentWrapper>
    </s.Card>
  )
}

export default PaymentInfoCard
