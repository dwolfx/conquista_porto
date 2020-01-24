import React from 'react'
import PropTypes from 'prop-types'

import TipBannerImg from 'assets/images/pages/Home/img_banner_6.png'

import objectiveTypes from 'components/Card/Objectives/types'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import {
  EmptyBody,
  EmptyText,
  EmptyButton,
  SectionCol,
  BannerTips,
  FullHeightCard,
  FullHeightCardObjectives,
  OfferCardButton,
  TipBannerContainer,
  ObjectivesContainer,
  BannerTipTitle,
} from './styles'

export default function SectionTwo({ onRedirect, objectives }) {
  const isMobile = useMedia('sm')
  const maxObjectiveCards = isMobile ? 3 : 2

  const renderObjectiveCardFooter = () =>
    objectives ? <OfferCardButton>Gerenciar objetivos</OfferCardButton> : null

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText>
        Você quer planejar a realização dos seus sonhos? Crie objetivos com o
        Conquista. É só contar o que você deseja e a ferramenta apresentará um
        plano personalizado de como alcançar suas metas. Experimente!
      </EmptyText>
      <EmptyButton color="secondary" onClick={() => onRedirect('/objetivos/')}>
        CRIAR OBJETIVO
      </EmptyButton>
    </EmptyBody>
  )

  const renderObjectiveCards = () =>
    objectiveTypes.slice(0, maxObjectiveCards).map(item => (
      <SectionCol md="4" xs="6" key={`type-${item.icon}`}>
        <FullHeightCardObjectives
          icon={item.icon}
          title={item.title}
          link={item.link}
        />
      </SectionCol>
    ))

  return (
    <>
      <SectionCol md="5">
        <FullHeightCard
          headerIcon="target"
          headerTitle="Objetivos"
          footer={renderObjectiveCardFooter()}
        >
          {objectives ? <Text>Listar objetivos</Text> : renderEmptyState()}
        </FullHeightCard>
      </SectionCol>

      <SectionCol md="7">
        <ObjectivesContainer>
          {renderObjectiveCards()}
          <SectionCol md="4" xs="6">
            <FullHeightCardObjectives
              icon="add"
              title="Criar um objetivo"
              link="/objetivos"
            />
          </SectionCol>
        </ObjectivesContainer>

        <TipBannerContainer>
          <SectionCol md="12">
            <BannerTips label="Dicas para economizar" image={TipBannerImg}>
              <BannerTipTitle bold>Registre todas as despesas</BannerTipTitle>
              <Text>
                Como você pretende controlar se não sabe onde ele está? Este é o
                primeiro passo para começar a poupar
              </Text>
            </BannerTips>
          </SectionCol>
        </TipBannerContainer>
      </SectionCol>
    </>
  )
}

SectionTwo.defaultProps = {
  objectives: null,
}

SectionTwo.propTypes = {
  objectives: PropTypes.object,
  onRedirect: PropTypes.func.isRequired,
}
