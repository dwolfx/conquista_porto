import React from 'react'
import PropTypes from 'prop-types'

import TipBannerImg from 'assets/images/pages/Home/img_banner_6.png'
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

export default function SectionTwo({ onRedirect, objectives }) {
  const renderObjectiveCardFooter = () =>
    objectives ? <OfferCardButton>Gerenciar objetivos</OfferCardButton> : null

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText>
        Você quer planejar a realização dos seus sonhos? Crie objetivos com o
        Conquista. É só contar o que você deseja e a ferramenta apresentará um
        plano personalizado de como alcançar suas metas. Experimente!
      </EmptyText>
      <EmptyButton
        color="secondary"
        onClick={() => onRedirect('/objetivos/criar')}
      >
        CRIAR OBJETIVO
      </EmptyButton>
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
              <Text type="heading3">Registre todas as despesas</Text>
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
  onRedirect: PropTypes.func.isRequired,
}
