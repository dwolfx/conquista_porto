import React, { useState } from 'react'
import { uuid } from 'uuidv4'

import { StepComponent } from 'hooks/FluxManagement/types'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import StepBar from '../StepBar'
import HorizontalCard from './HorizontalCard'
import VerticalCard from './VerticalCard'

import useMedia from 'hooks/useMedia'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

import { StepComponentProps } from 'hooks/FluxManagement/types'
import { Steps } from '../types'

import * as s from './styles'
import * as t from './types'

const planos: t.IPlan[] = [
  {
    planName: 'Brasil Terra',
    installmentsAmount: '3x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 659,82 à vista',
    firstCoverageAmount: 'R$ 150.000,00',
    secondCoverageAmount: 'R$ 250.000,00',
    thridCoverageAmount: 'R$ 350.000,00',
    preSelected: false,
  },
  {
    planName: 'Brasil Prata',
    installmentsAmount: '4x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 759,82 à vista',
    firstCoverageAmount: 'R$ 160.000,00',
    secondCoverageAmount: 'R$ 260.000,00',
    thridCoverageAmount: 'R$ 360.000,00',
    preSelected: true,
  },
  {
    planName: 'Brasil Ouro',
    installmentsAmount: '5x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 859,82 à vista',
    firstCoverageAmount: 'R$ 170.000,00',
    secondCoverageAmount: 'R$ 270.000,00',
    thridCoverageAmount: 'R$ 370.000,00',
    preSelected: false,
  },
]

const ChoosePlan: StepComponent = () => {
  const isXs = useMedia('xs')
  const isSmUp = useMedia('smUp')
  const isMd = useMedia('md')
  const IsMdUp = useMedia('mdUp')
  const Islg = useMedia('lg')
  const [selectedCard, setSelectedCard] = useState('Brasil Prata')

  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const renderDesktop = (plans: t.IPlan[]) => {
    if (plans.length === 1) {
      return (
        <HorizontalCard
          planInformation={plans[0]}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )
    }
    return plans.map(plan => (
      <VerticalCard
        planInformation={plan}
        key={uuid()}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    ))
  }

  // eslint-disable-next-line react/no-unused-prop-types
  const renderCards = ({ plans }: { plans: t.IPlan[] }) => {
    switch (true) {
      // mobile
      case isXs:
        return plans.map(plan => (
          <VerticalCard
            planInformation={plan}
            key={uuid()}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))
      // vertical tablet
      case isSmUp && isMd:
        return plans.map(plan => (
          <HorizontalCard
            planInformation={plan}
            key={uuid()}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))
      // vertical tablet
      case IsMdUp && Islg:
        return plans.map(plan => (
          <HorizontalCard
            planInformation={plan}
            key={uuid()}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))
      // desktop
      default:
        return renderDesktop(plans)
    }
  }

  return (
    <>
      <StepBar actualStep={1} totalNumberOfSteps={2} />
      <s.Container>
        <s.Col lg={3} md={3} sm={12}>
          <s.InformationWrapper>
            <s.Text type="heading4" bold>
              Proposta de Seguro Viagem especial para você!
            </s.Text>
            <Text type="headline">
              Se precisar tirar dúvidas fale com seu parceiro.
            </Text>
          </s.InformationWrapper>
        </s.Col>
        <s.Col lg={8} md={9} sm={12}>
          <s.Card>
            <s.CardTitleWrapper>
              <Text bold type="subheading" color="gray5">
                DETALHES DA VIAGEM
              </Text>
              <ButtonLink>
                <Text bold type="button" color="blue4">
                  ALTERAR
                </Text>
              </ButtonLink>
            </s.CardTitleWrapper>
            <s.DataDisplayer label="Origem" value="Brasil" />
            <Divisor />
            <s.DataDisplayer label="Destino" value="Nacional" />
            <Divisor />
            <s.DataDisplayer
              label="Período"
              value="10/10/2020 até 10/11/2020"
            />
            <Divisor />
            <s.DataDisplayer label="Passageiros" value="Até 71 anos: 02" />
            <Divisor />
            <s.DataDisplayer
              label="Coberturas: Esportes"
              value="Não irei praticar"
            />
            <s.DataDisplayer
              label="Coberturas: Motocicleta"
              value="Não irei praticar"
            />
          </s.Card>
          <s.PlansContainer>{renderCards({ plans: planos })}</s.PlansContainer>
        </s.Col>
      </s.Container>
      <s.FooterContainer>
        <s.FooterCol lg={11}>
          <s.NextButton color="primary" outline>
            REJEITAR PROPOSTA
          </s.NextButton>
          <s.NextButton
            color="secondary"
            onClick={() => instantiate(Steps.proposalSummaryForm)}
          >
            AVANÇAR
          </s.NextButton>
        </s.FooterCol>
      </s.FooterContainer>
    </>
  )
}

export default ChoosePlan
