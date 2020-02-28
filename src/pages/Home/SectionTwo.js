import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import objectiveTypes from 'components/Card/Objectives/types'
import { GetObjectiveDataRequest } from 'store/modules/Objective/action'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import ObjectivesListContent from './ObjectiveListContent'
import { tipsBanner } from './bannerData'
import {
  EmptyBody,
  EmptyText,
  EmptyButton,
  SectionCol,
  BannerTips,
  FullHeightCard,
  FullHeightCardObjectives,
  TipBannerContainer,
  ObjectivesContainer,
  BannerTipTitle,
  ObjectivesListContainer,
} from './styles'

export default function SectionTwo({ onRedirect }) {
  const isMobile = useMedia('sm')
  const [tipBannerIndex, setTipBannerIndex] = useState(0)
  const [objectiveCardIndex, setObjectiveCardIndex] = useState(0)
  const [maxObjectiveCards, setMaxObjectiveCards] = useState(2)
  const objectives = useSelector(state => state.objective.objectives)
  const hasObjectives = Boolean(objectives && objectives.length)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetObjectiveDataRequest())
  }, [dispatch])

  useEffect(() => {
    setTipBannerIndex(Math.floor(Math.random() * (tipsBanner.length - 1)))
    setObjectiveCardIndex(
      Math.floor(Math.random() * (objectiveTypes.length - 1))
    )
  }, [])

  useEffect(() => {
    setMaxObjectiveCards(isMobile ? 3 : 2)
  }, [isMobile])

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText bold>
        Com os Objetivos, fica mais fácil alcançar suas metas. Definindo-os,
        você receberá planos de investimentos personalizados.
      </EmptyText>
      <EmptyButton
        data-gtm-subname="card objetivos"
        data-gtm-name="criar objetivo"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        color="secondary"
        onClick={() => onRedirect('/objetivos/')}
      >
        CRIAR OBJETIVO
      </EmptyButton>
    </EmptyBody>
  )

  const renderObjectiveCards = () =>
    objectiveTypes
      .slice(objectiveCardIndex, objectiveCardIndex + maxObjectiveCards)
      .map(item => (
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
        <FullHeightCard headerIcon="target" headerTitle="Objetivos">
          {hasObjectives ? (
            <ObjectivesListContainer>
              <ObjectivesListContent objectives={objectives} />
            </ObjectivesListContainer>
          ) : (
            renderEmptyState()
          )}
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
            <BannerTips
              label={tipsBanner[tipBannerIndex].caption}
              image={tipsBanner[tipBannerIndex].image}
            >
              <BannerTipTitle bold>
                {tipsBanner[tipBannerIndex].title}
              </BannerTipTitle>
              <Text>{tipsBanner[tipBannerIndex].text}</Text>
            </BannerTips>
          </SectionCol>
        </TipBannerContainer>
      </SectionCol>
    </>
  )
}

SectionTwo.propTypes = {
  onRedirect: PropTypes.func.isRequired,
}
