import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import objectiveTypes from 'components/Card/Objectives/types'
import BannerTips from 'components/Banner/Tip'
import Text from 'components/Text'
import { GetObjectiveDataRequest } from 'store/modules/Objective/action'
import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'
import useMedia from 'hooks/useMedia'

import CardHeaderState from './commons/CardHeaderState'
import { tipsBanner } from './bannerData'
import {
  SectionCol,
  FullHeightCardObjectives,
  TipBannerContainer,
  ObjectivesContainer,
  ProductsCol,
  HomeObjectivesCard,
} from './styles'
import ObjectivesList from './ObjectivesList'

export default function SectionTwo({ onRedirect }) {
  const history = useHistory()
  const isTablet = useMedia('lg')
  const isTabletVertical = useMedia('md')
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()

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

  useEffect(() => {
    setTipBannerIndex(Math.floor(Math.random() * (tipsBanner.length - 1)))
    setObjectiveCardIndex(
      Math.floor(Math.random() * (objectiveTypes.length - 1))
    )
  }, [])

  useEffect(() => {
    setMaxObjectiveCards(isMobile ? 3 : 2)
  }, [isMobile])

  const getBannerHeight = () => {
    if (isMobile) {
      return '278px'
    }
    if (isTablet || isTabletVertical) {
      return '253px'
    }
    return '280px'
  }

  const renderObjectiveCards = () =>
    objectiveTypes
      .slice(objectiveCardIndex, objectiveCardIndex + maxObjectiveCards)
      .map(item => (
        <SectionCol md="6" xs="12" lg="4" sm="4" key={`type-${item.icon}`}>
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

  return (
    <>
      <ProductsCol sm="12" md="6" mdOffset="0" lg="5" lgOffset="1">
        <HomeObjectivesCard
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
          <ObjectivesList
            hasError={hasErrorObjectives}
            isLoading={isLoadingObjectives}
            objectives={objectives}
            onRedirect={onRedirect}
          />
        </HomeObjectivesCard>
      </ProductsCol>

      <SectionCol md="6" sm="12" lg="6">
        <ObjectivesContainer>
          {(isTablet && !isTabletVertical) || isMobile
            ? renderObjectiveCards()[0]
            : renderObjectiveCards()}
          <SectionCol sm="4" md="6" xs="12" lg="4">
            <FullHeightCardObjectives
              icon="add"
              title="Criar objetivo"
              onClick={() => history.push('/objetivos')}
            />
          </SectionCol>
        </ObjectivesContainer>

        <TipBannerContainer>
          <SectionCol md="12" sm="12">
            <BannerTips
              height={getBannerHeight()}
              title={tipsBanner[tipBannerIndex].title}
              caption={tipsBanner[tipBannerIndex].caption}
              image={tipsBanner[tipBannerIndex].image}
            >
              <Text bold type="headline">
                {tipsBanner[tipBannerIndex].text}
              </Text>
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
