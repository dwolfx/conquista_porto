import React from 'react'
import { uuid } from 'uuidv4'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import * as s from './styles'

const VerticalCard = ({
  planInformation,
  selectedCard,
  setSelectedCard,
}: {
  planInformation: any
  selectedCard: string
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <s.Card isCardSelected={planInformation.planName === selectedCard}>
      <s.RadioWrapper>
        <s.RadioOption
          id={uuid()}
          name="card-plan"
          value=""
          checked={planInformation.planName === selectedCard}
          handleChange={() => setSelectedCard(planInformation.planName)}
        />
        {planInformation.preSelected ? (
          <Text bold type="caption" color="blue4">
            Pré-selecionado pelo seu parceiro
          </Text>
        ) : null}
      </s.RadioWrapper>
      <s.TitleWrapper>
        <s.TitleText bold type="heading4">
          {planInformation.planName}
        </s.TitleText>
        <s.TitleText bold type="captionUppercase" color="gray5">
          {planInformation.installmentsAmount}
        </s.TitleText>
        <Text bold type="heading4">
          {planInformation.upfrontAmount}
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
            {planInformation.firstCoverageAmount}
          </s.CoverageItemText>
        </s.ItemWrapper>
        <Divisor />
        <s.ItemWrapper>
          <Text bold type="captionUppercase" color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </Text>
          <s.CoverageItemText bold type="headline">
            {planInformation.secondCoverageAmount}
          </s.CoverageItemText>
        </s.ItemWrapper>
        <Divisor />
        <s.ItemWrapper>
          <Text bold type="captionUppercase" color="gray5">
            Despesas médicas, hospitalares e/ou odontológicas - dmho
          </Text>
          <s.CoverageItemText bold type="headline">
            {planInformation.thridCoverageAmount}
          </s.CoverageItemText>
        </s.ItemWrapper>
      </s.CoverageItemsWrapper>
      <s.ButtonLink noIcon>
        <Text bold type="button" color="blue4">
          LISTA COMPLETA
        </Text>
      </s.ButtonLink>
    </s.Card>
  )
}

export default VerticalCard
