import React from 'react'
import { uuid } from 'uuidv4'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import ButtonLink from 'components/Button/Link'

import * as s from './styles'
import * as t from '../types'

const VerticalCard = ({
  planInformation,
  selectedCard,
  setSelectedCard,
}: {
  planInformation: t.IPlan
  selectedCard: string
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <s.Card isCardSelected={planInformation.planName === selectedCard}>
      <s.CardContent>
        <s.RadioOption
          id={uuid()}
          name="card-plan"
          value=""
          checked={planInformation.planName === selectedCard}
          handleChange={() => setSelectedCard(planInformation.planName)}
        />
        <s.TitleWrapper>
          {planInformation.preSelected ? (
            <s.TitleText bold type="caption" color="blue4">
              Pré-selecionado pelo seu parceiro
            </s.TitleText>
          ) : null}
          <s.TitleText bold type="heading4">
            {planInformation.planName}
          </s.TitleText>
          <s.TitleText bold type="captionUppercase">
            {planInformation.installmentsAmount}
          </s.TitleText>
          <Text bold type="heading4">
            {planInformation.upfrontAmount}
          </Text>
        </s.TitleWrapper>
        <Divisor vertical customSize="100%" />
        <s.CoverageItemsWrapper>
          <s.TextWrapper>
            <Text bold type="subheading" color="gray5" textAlign="left">
              PRINCIPAIS COBERTURAS
            </Text>
          </s.TextWrapper>
          <HorizontalList
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
                {planInformation.firstCoverageAmount}
              </Text>,
            ]}
          />
          <HorizontalList
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
                {planInformation.secondCoverageAmount}
              </Text>,
            ]}
          />
          <HorizontalList
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
                {planInformation.thridCoverageAmount}
              </Text>,
            ]}
          />
          <s.TextWrapper>
            <ButtonLink noIcon>
              <Text bold type="button" color="blue4">
                LISTA COMPLETA
              </Text>
            </ButtonLink>
          </s.TextWrapper>
        </s.CoverageItemsWrapper>
      </s.CardContent>
    </s.Card>
  )
}

export default VerticalCard
