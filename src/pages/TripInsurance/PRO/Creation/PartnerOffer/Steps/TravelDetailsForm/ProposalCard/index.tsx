import React from 'react'

import VerticalList from 'components/VerticalList'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import { IForm, PartnerSteps } from 'pages/TripInsurance/PRO/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { formatMoney } from 'helpers'

import ProposalHorizontalCard from './HorizontalCard'

import * as S from './styles'

interface IProps {
  proposal: IPlan
  handleOpenDetailsModal: () => void
  horizontal?: boolean 
}
const ProposalCard = ({ proposal, handleOpenDetailsModal, horizontal = false }: IProps) => {
  const { instantiate } = useStackFluxManagement()
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const getRecommendedPaymentWay = () => {
    const recommendedWay = proposal.formasPagamento.listaParcelamentoCartao.find(parcela => parcela.id === "6")
    return `${recommendedWay?.descricao} SEM JUROS DE ${formatMoney(recommendedWay?.valor || 0)}`
  }

  const handleChoosePlan = () => {
    instantiate(PartnerSteps.CustomerTravelDetailsForm)
    updateForm({
      ...form,
      nomeDoPlano: proposal.nomePlano,
      pacoteEscolhido: proposal.codigoPlano,
      valorSemDesconto: Number(proposal.valorSeguroBruto),
      valorComDesconto: Number(proposal.valorCartaoPortoSeguro),
    })
  }


  return (
    <>
    {horizontal ? (
      <ProposalHorizontalCard
        proposal={proposal}
        recommendedPaymentWay={getRecommendedPaymentWay()} 
        handleOpenDetailsModal={handleOpenDetailsModal} 
        onSelectPlan={handleChoosePlan}      
      />
    ) : (
      <S.ProposalCard>
        <S.ProposalCardHeader>
          <VerticalList
            marginBetweenElements={11}
            noSpacing
            elements={[
              <Text type="heading4" color="gray6" bold>
                {proposal.nomePlano}
              </Text>,
              <Text type="captionUppercase" color="gray5" bold>
                {getRecommendedPaymentWay()}
              </Text>,
              <Text type="heading4" color="gray6" bold>
                {formatMoney(proposal.valorTotal)} à vista
              </Text>,
            ]}
          />
        </S.ProposalCardHeader>
        <S.SelectPlanButton color="secondary" onClick={handleChoosePlan}>selecionar plano</S.SelectPlanButton>
        <Divisor />
        <S.TextSubheading textAlign="center">
          PRINCIPAIS COBERTURAS
        </S.TextSubheading>
        <S.VerticalList
          elements={[
            <Text color="gray5" bold type="captionUppercase">
              {proposal.ViagemCobertura.coberturas[0].descricao}
            </Text>,
            <Text color="gray6" bold type="headline">
              {proposal.ViagemCobertura.coberturas[0].valor}
            </Text>,
          ]}
        />
        <S.Divisor />
        <S.VerticalList
          elements={[
            <Text color="gray5" bold type="captionUppercase">
              {proposal.ViagemCobertura.coberturas[1].descricao}
            </Text>,
            <Text color="gray6" bold type="headline">
              {proposal.ViagemCobertura.coberturas[1].valor}
            </Text>,
          ]}
        />
        <S.Divisor />
        <S.VerticalList
          elements={[
            <Text color="gray5" bold type="captionUppercase">
              {proposal.ViagemCobertura.coberturas[2].descricao}
            </Text>,
            <Text color="gray6" bold type="headline">
              {proposal.ViagemCobertura.coberturas[2].valor}
            </Text>,
          ]}
        />
        <S.DetailsButton onClick={handleOpenDetailsModal}>
          lista completa
        </S.DetailsButton>
      </S.ProposalCard>
    )}
  </>
  )
}

export default ProposalCard
