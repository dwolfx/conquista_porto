import React from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import Accordion from 'components/AccordionNew'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatMoney } from 'helpers'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { ITripInsuranceQuotation } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { ITripInsuranceProposal } from 'store/modules/TripInsurance/Proposal/types'
import { IForm } from 'pages/TripInsurance/Creation/types'

import * as S from '../../styles'

const InsuranceSumaryTablet = () => {
  const { form } = useFormFluxManagement<IForm>()

  const { tripInsuranceQuotations, tripInsuranceProposal } = useSelector(
    (state: {
      tripInsuranceQuotation: ITripInsuranceQuotation
      tripInsuranceProposal: ITripInsuranceProposal
    }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
      tripInsuranceProposal: state.tripInsuranceProposal.data,
    })
  )

  const getPortoTotal = () => {
    const totalObject = tripInsuranceQuotations?.filter(
      quotation => quotation.codigoPlano === form.pacoteEscolhido
    )[0].formasPagamento.listaParcelamentoCartaoPorto[
      form.pagamento ? form.pagamento.quantidadeParcelas - 1 : 0
    ]

    return totalObject && totalObject.descricao.includes('x')
      ? `${totalObject.descricao} de ${formatMoney(totalObject.valor)}`
      : `1x de ${formatMoney(
          totalObject?.valor ?? ''
        )} (${totalObject?.descricao ?? ''})`
  }

  const getTotal = () => {
    const totalObject = tripInsuranceQuotations?.filter(
      quotation => quotation.codigoPlano === form.pacoteEscolhido
    )[0].formasPagamento.listaParcelamentoCartao[
      form.pagamento ? form.pagamento.quantidadeParcelas - 1 : 0
    ]

    return totalObject && totalObject.descricao.includes('x')
      ? `${totalObject.descricao} de ${formatMoney(totalObject.valor)}`
      : `1x de ${formatMoney(
          totalObject?.valor ?? ''
        )} (${totalObject?.descricao ?? ''})`
  }

  return (
    <S.Card data-testid="hire-card-sumary-tablet">
      <Accordion
        wrapperPadding="0"
        bodyPadding="0"
        triggerCloseOnArrow
        titleNode={
          <>
            <S.HeaderWrapper>
              <Text type="heading4" bold color="gray6">
                Resumo
              </Text>
            </S.HeaderWrapper>
          </>
        }
      >
        <Divisor />
        <S.SumaryTextWrapper>
          <S.TextTitle>plano</S.TextTitle>
          <S.TextValue>
            {
              tripInsuranceQuotations?.filter(
                quotation => quotation.codigoPlano === form.pacoteEscolhido
              )[0].nomePlano
            }
          </S.TextValue>
        </S.SumaryTextWrapper>
        <Divisor />

        <S.SumaryTextWrapper>
          <S.TextTitle>
            {form.pagamento?.isCartaoPorto ? `total com desconto` : `total`}
          </S.TextTitle>
          <S.TextValue>
            {form.pagamento?.isCartaoPorto ? getPortoTotal() : getTotal()}
          </S.TextValue>
        </S.SumaryTextWrapper>

        <Divisor />

        <S.SumaryTextWrapper>
          <S.TextTitle>período</S.TextTitle>
          <S.TextValue>{`${form.dataIda} à ${form.dataVolta}`}</S.TextValue>
        </S.SumaryTextWrapper>

        <Divisor />

        <S.SumaryTextWrapper>
          <S.TextTitle>protocolo</S.TextTitle>
          <S.TextValue>
            {tripInsuranceProposal?.proposta.numeroProposta
              ? tripInsuranceProposal?.proposta.numeroProposta
              : '-'}
          </S.TextValue>
        </S.SumaryTextWrapper>
      </Accordion>
    </S.Card>
  )
}

export default InsuranceSumaryTablet
