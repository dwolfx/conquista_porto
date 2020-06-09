import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import objectiveTypes from 'components/Card/Objectives/types'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import { GetObjectiveDataRequest } from 'store/modules/Objective/action'
import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

import LoadingState from './commons/LoadingState'
import ErrorState from './commons/ErrorState'
import CardHeaderState from './commons/CardHeaderState'

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
  ProductsCol,
} from './styles'

export default function SectionTwo({ onRedirect }) {
  const history = useHistory()
  const isMobile = useMedia('sm')

  const [objectiveTypeClicked, setObjectiveTypeClicked] = useState(null)
  const [tipBannerIndex, setTipBannerIndex] = useState(0)
  const [objectiveCardIndex, setObjectiveCardIndex] = useState(0)
  const [maxObjectiveCards, setMaxObjectiveCards] = useState(2)

  const {
    objectives,
    cpf,
    isLoadingSuitability,
    isLoadingObjectives,
    hasErrorObjectives,
  } = useSelector(state => ({
    objectives: state.objective.objectives,
    isLoadingObjectives: state.objective.isLoadingList,
    hasErrorObjectives: state.objective.hasError,
    isLoadingSuitability: state.suitability.isLoading,
    cpf: state.auth.cpf,
  }))
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

  const EmptyState = () => (
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
            isLoading={isLoadingSuitability && objectiveTypeClicked === item.id}
            onClick={() => {
              setObjectiveTypeClicked(item.id)
              dispatch(
                GetSuitabilityRequestAndRedirect({
                  cpf,
                  link: item.link,
                  history,
                  goalType: item.goalType,
                })
              )
            }}
          />
        </SectionCol>
      ))

  const renderObjectivesBodyCard = () => {
    if (isLoadingObjectives && !hasObjectives) {
      return <LoadingState />
    }

    if (hasErrorObjectives && !hasObjectives) {
      return <ErrorState onRetry={() => dispatch(GetObjectiveDataRequest())} />
    }

    return hasObjectives ? (
      <ObjectivesListContainer>
        <ObjectivesListContent objectives={objectives} />
      </ObjectivesListContainer>
    ) : (
      <EmptyState />
    )
  }

  return (
    <>
      <ProductsCol md="5">
        <FullHeightCard
          headerIcon="target"
          headerTitle="Objetivos"
          headerEndItem={
            <CardHeaderState
              showHeader={Boolean(
                objectives && Object.entries(objectives).length
              )}
              isLoading={isLoadingObjectives}
              hasError={hasErrorObjectives}
              onErrorClick={() => dispatch(GetObjectiveDataRequest())}
            />
          }
        >
          {renderObjectivesBodyCard()}
        </FullHeightCard>
      </ProductsCol>

      <SectionCol md="7">
        <ObjectivesContainer>
          {renderObjectiveCards()}
          <SectionCol md="4" xs="6">
            <FullHeightCardObjectives
              icon="add"
              title="Criar objetivo"
              onClick={() => history.push('/objetivos')}
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
