import React from 'react'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

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
      <s.CardContent>
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
                  planInformation.formasPagamento.listaParcelamentoCartao[5]
                    .valor
                )}`
              : ''}
          </s.TitleText>
          <Text bold type="heading4">
            {form.pagamento?.isCartaoPorto
              ? planInformation.valorCartaoPortoSeguro
                ? `${formatMoney(
                    planInformation?.valorCartaoPortoSeguro
                  )} à vista`
                : ''
              : planInformation?.valorSeguroBruto
              ? `${formatMoney(planInformation.valorSeguroBruto)} à vista`
              : ''}
          </Text>
        </s.TitleWrapper>
        <s.Divisor vertical />
        <s.CoverageItemsWrapper>
          <s.TextWrapper>
            <Text bold type="subheading" color="gray5" textAlign="left">
              PRINCIPAIS COBERTURAS
            </Text>
          </s.TextWrapper>
          <HorizontalList
            size="medium-large"
            startItems={[
              <s.CoverageItemDescription
                bold
                type="captionUppercase"
                color="gray5"
              >
                Despesas médicas, hospitalares e/ou odontológicas - dmho
              </s.CoverageItemDescription>,
            ]}
            endItems={[
              <Text bold type="headline">
                {planInformation.ViagemCobertura?.coberturas[0]?.valor ?? ''}
              </Text>,
            ]}
          />
          <HorizontalList
            size="medium"
            startItems={[
              <s.CoverageItemDescription
                bold
                type="captionUppercase"
                color="gray5"
              >
                Morte acidental
              </s.CoverageItemDescription>,
            ]}
            endItems={[
              <Text bold type="headline">
                {planInformation.ViagemCobertura?.coberturas[1]?.valor ?? ''}
              </Text>,
            ]}
          />
          <HorizontalList
            size="medium"
            startItems={[
              <s.CoverageItemDescription
                bold
                type="captionUppercase"
                color="gray5"
              >
                extravio de bagagem
              </s.CoverageItemDescription>,
            ]}
            endItems={[
              <Text bold type="headline">
                {planInformation.ViagemCobertura?.coberturas[2]?.valor ?? ''}
              </Text>,
            ]}
          />
          <s.ButtonLink noIcon onClick={() => comparativeModalSetState(true)}>
            LISTA COMPLETA
          </s.ButtonLink>
        </s.CoverageItemsWrapper>
      </s.CardContent>
    </s.Card>
  )
}

export default VerticalCard
