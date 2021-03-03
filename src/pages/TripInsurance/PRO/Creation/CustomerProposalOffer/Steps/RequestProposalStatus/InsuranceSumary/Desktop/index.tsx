import React from 'react'
import { useSelector } from 'react-redux'

import Card from 'components/Card'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { ITripInsuranceProposal } from 'store/modules/TripInsurance/Proposal/types'
import { IForm } from 'pages/TripInsurance/PRO/types'

import { getTotal } from '../utils'
import * as S from '../../styles'

const InsuranceSumaryDesktop = () => {
  const { form } = useFormFluxManagement<IForm>()

  const { tripInsuranceProposal } = useSelector(
    (state: { tripInsuranceProposal: ITripInsuranceProposal }) => ({
      tripInsuranceProposal: state.tripInsuranceProposal.data,
    })
  )

  return (
    <Card data-testid="hire-card-sumary-desktop">
      <S.HeaderWrapper>
        <Text type="heading4" bold color="gray6">
          Resumo
        </Text>
      </S.HeaderWrapper>
      <Divisor />
      <S.SumaryTextWrapper>
        <S.TextTitle>plano</S.TextTitle>
        <S.TextValue>{form.nomeDoPlano}</S.TextValue>
      </S.SumaryTextWrapper>
      <Divisor />

      <S.SumaryTextWrapper>
        <S.TextTitle>
          {form.pagamento?.isCartaoPorto ? `total com desconto` : `total`}
        </S.TextTitle>
        <S.TextValue>
          {getTotal(form.pagamento?.isCartaoPorto ?? false, form)}
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
    </Card>
  )
}

export default InsuranceSumaryDesktop
