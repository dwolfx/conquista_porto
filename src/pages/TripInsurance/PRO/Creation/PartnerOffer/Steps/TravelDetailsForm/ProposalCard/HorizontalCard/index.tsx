import React from 'react'
import 'styled-components/macro'

import ButtonLink from 'components/Button/Link'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'
import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { formatMoney } from 'helpers'

import * as S from '../styles'

interface IProps {
  proposal: IPlan
  recommendedPaymentWay: string
  handleOpenDetailsModal: () => void
  onSelectPlan: () => void
}

const ProposalHorizontalCard = ({ proposal, handleOpenDetailsModal, recommendedPaymentWay, onSelectPlan }: IProps) => (
  <S.ProposalCard>
    <S.FlexContainer>
      <S.ProposalHorizontalCardHeader>
        <VerticalList
          marginBetweenElements={11}
          noSpacing
          css={`
            width: 196px;
          `}
          elements={[
            <Text type="heading4" color="gray6" bold>
              {proposal.nomePlano}
            </Text>,
            <Text type="captionUppercase" color="gray5" bold>
              {recommendedPaymentWay}
            </Text>,
            <Text type="heading4" color="gray6" bold>
              {formatMoney(proposal.valorTotal)} à vista
            </Text>,
          ]}
        />
      </S.ProposalHorizontalCardHeader>
      <S.Divisor vertical />
      <S.ProposalCoverageList>
        <Text type="subheading" color="gray5" bold css={`margin-bottom: 28px;`}>
          PRINCIPAIS COBERTURAS
        </Text>
        <HorizontalList
          noPadding
          size="medium"
          startItems={[
            <Text color="gray5" bold type="captionUppercase" css={`max-width: 255px;`}>
              {proposal.ViagemCobertura.coberturas[0].descricao}
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold type="body">
              {proposal.ViagemCobertura.coberturas[0].valor}
            </Text>,
          ]}
        />
        <HorizontalList
          noPadding
          size="medium"
          startItems={[
            <Text color="gray5" bold type="captionUppercase">
              {proposal.ViagemCobertura.coberturas[1].descricao}
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold type="body">
              {proposal.ViagemCobertura.coberturas[1].valor}
            </Text>,
          ]}
        />
        <HorizontalList
          noPadding
          size="medium"
          startItems={[
            <Text color="gray5" bold type="captionUppercase">
              {proposal.ViagemCobertura.coberturas[2].descricao}
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold type="body">
              {proposal.ViagemCobertura.coberturas[2].valor}
            </Text>,
          ]}
        />
        <HorizontalList
          noPadding
          size="medium"
          startItems={[
            <ButtonLink noIcon onClick={handleOpenDetailsModal}>
              lista completa
            </ButtonLink>,
          ]}
        />
      </S.ProposalCoverageList>
    </S.FlexContainer>
    <S.SelectPlanButton 
      color="secondary"
      onClick={onSelectPlan}
    >
      selecionar plano
    </S.SelectPlanButton>
  </S.ProposalCard>
)

export default ProposalHorizontalCard
