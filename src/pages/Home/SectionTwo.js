import React from 'react'
import PropTypes from 'prop-types'

import TipBannerImg from 'assets/images/pages/Home/banner_objectives.jpg'
import Text from 'components/Text'

import {
  EmptyBody,
  EmptyText,
  EmptyButton,
  GridRow,
  SectionCol,
  BannerTips,
  FullHeightCard,
  FullHeightCardObjectives,
  OfferCardButton,
} from './styles'

export default function SectionTwo({ objectives }) {
  const renderObjectiveCardFooter = () =>
    objectives ? <OfferCardButton>Gerenciar objetivos</OfferCardButton> : null

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText>
        Ao criar objetivos você terá a chance de tornar possível a realização
        dos seus objetivos. Inicie a sua jornada e crie o seu primeiro objetivo!
      </EmptyText>
      <EmptyButton color="secondary">Criar objetivo</EmptyButton>
    </EmptyBody>
  )

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard
          headerIcon="target"
          headerTitle="Objetivos"
          footer={renderObjectiveCardFooter()}
        >
          {objectives ? <Text>Listar objetivos</Text> : renderEmptyState()}
        </FullHeightCard>
      </SectionCol>

      <SectionCol lg="7">
        <GridRow style={{ height: '50%', paddingBottom: 7 }}>
          <SectionCol lg="4">
            <FullHeightCardObjectives
              icon="homewithwindow"
              title="Comprar uma casa"
              link="/"
            />
          </SectionCol>
          <SectionCol lg="4">
            <FullHeightCardObjectives
              icon="car2"
              title="Comprar um carro"
              link="/"
            />
          </SectionCol>
          <SectionCol lg="4">
            <FullHeightCardObjectives
              icon="add"
              title="Criar um objetivo"
              link="/"
            />
          </SectionCol>
        </GridRow>

        <GridRow style={{ height: '50%', paddingTop: 7 }}>
          <SectionCol lg="12">
            <BannerTips label="Dicas para economizar" image={TipBannerImg}>
              <Text type="title3">Registre todas as despesas</Text>
              <Text>
                Como você pretende controlar se não sabe onde ele está? Este é o
                primeiro passo para começar a poupar
              </Text>
            </BannerTips>
          </SectionCol>
        </GridRow>
      </SectionCol>
    </>
  )
}

SectionTwo.defaultProps = {
  objectives: null,
}

SectionTwo.propTypes = {
  objectives: PropTypes.object,
}
