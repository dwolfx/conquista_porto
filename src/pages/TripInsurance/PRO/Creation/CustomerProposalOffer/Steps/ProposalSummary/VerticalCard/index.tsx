import React from 'react'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatMoney } from 'helpers'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IForm } from 'pages/TripInsurance/PRO/types'

import * as s from './styles'

const VerticalCard = ({
  planInformation,
  comparativeModalSetState,
}: {
  planInformation: IPlan
  comparativeModalSetState: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { form } = useFormFluxManagement<IForm>()

  return (
    <s.Card>
      <s.TitleWrapper>
        <s.TitleText bold type="caption" color="blue4">
          Pré-selecionado pelo seu parceiro
        </s.TitleText>
        <s.TitleText bold type="heading4">
          {planInformation.nomePlano ?? ''}
        </s.TitleText>
        <s.TitleText bold type="captionUppercase" color="gray5">
          {form.pagamento?.isCartaoPorto
            ? planInformation.formasPagamento.listaParcelamentoCartaoPorto[5]
              ? `${
                  planInformation.formasPagamento
                    .listaParcelamentoCartaoPorto[5].descricao
                } SEM JUROS DE ${formatMoney(
                  planInformation.formasPagamento
                    .listaParcelamentoCartaoPorto[5].valor
                )}`
              : ''
            : planInformation.formasPagamento.listaParcelamentoCartao[5]
            ? `${
                planInformation.formasPagamento.listaParcelamentoCartao[5]
                  .descricao
              } SEM JUROS DE ${formatMoney(
                planInformation.formasPagamento.listaParcelamentoCartao[5].valor
              )}`
            : ''}
        </s.TitleText>
        <Text bold type="heading4">
          {form.pagamento?.isCartaoPorto
            ? planInformation.valorCartaoPortoSeguro
              ? `${formatMoney(planInformation.valorCartaoPortoSeguro)} à vista`
              : ''
            : planInformation.valorSeguroBruto
            ? `${formatMoney(planInformation.valorSeguroBruto)} à vista`
            : ''}
        </Text>
      </s.TitleWrapper>
      <Divisor />
      <s.CoveragesTitleWrapper>
        <Text bold type="subheading" color="gray5" textAlign="center">
          PRINCIPAIS COBERTURAS
        </Text>
      </s.CoveragesTitleWrapper>
      <s.CoverageItemsWrapper>
        <s.ItemWrapper>
          <Text bold type="captionUppercase" color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </Text>
          <s.CoverageItemText bold type="headline">
            {planInformation.ViagemCobertura?.coberturas[0]?.valor ?? ''}
          </s.CoverageItemText>
        </s.ItemWrapper>
        <Divisor />
        <s.ItemWrapper>
          <Text bold type="captionUppercase" color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </Text>
          <s.CoverageItemText bold type="headline">
            {planInformation.ViagemCobertura?.coberturas[1]?.valor ?? ''}
          </s.CoverageItemText>
        </s.ItemWrapper>
        <Divisor />
        <s.ItemWrapper>
          <Text bold type="captionUppercase" color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </Text>
          <s.CoverageItemText bold type="headline">
            {planInformation.ViagemCobertura?.coberturas[2]?.valor ?? ''}
          </s.CoverageItemText>
        </s.ItemWrapper>
      </s.CoverageItemsWrapper>
      <s.ButtonLink noIcon onClick={() => comparativeModalSetState(true)}>
        <Text bold type="button" color="blue4">
          LISTA COMPLETA
        </Text>
      </s.ButtonLink>
    </s.Card>
  )
}

export default VerticalCard
