import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import UnsavedChangedPrompt from 'components/Modal/Prompt'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'

import { CleanObjectiveData } from 'store/modules/Objective/action'
import { IRecommendations, IAnswer } from 'store/modules/Objective/types'
import { CleanObjectiveManagementData } from 'store/modules/ObjectiveManagement/action'

import EditSuggestion from './Edit/Suggestion'
import EditDrawer from './Edit/Drawer'
import BottomBar from './BottomBar'
import WalletSection from './WalletSection'
import ProductBannerSection from './ProductBanner'
import RecommendationMessage from './RecommendationMessage'
import SuggestedPlanDetail from './SuggestedPlanDetail'
import CardEstimatedResults from './CardEstimatedResults'
import InformativeHeader from './InformativeHeader'

import * as s from './styles'

interface IProps {
  data: IRecommendations
  totalSteps: number
  isEditing: boolean
  setIsEditing: (state: boolean) => void
}

const Recommendation = ({
  data,
  totalSteps,
  isEditing,
  setIsEditing,
}: IProps) => {
  const {
    answer,
    income,
    funds,
    credit_product,
    additional,
    suggestion_goal,
  } = data
  const dispatch = useDispatch()
  const {
    isLoading: isLoadingManagement,
    data: objectiveManagementData,
    suitabilityData,
  } = useSelector<any, any>(state => ({
    ...state.objectiveManagement,
    isLoadingBySimulate: state.objective.isLoadingBySimulate,
    suitabilityData: state.suitability.data,
  }))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [formData, setFormData] = useState<Omit<IAnswer, 'uf' | 'goal_type'>>({
    nickname: '',
    target_date: '',
    target_value: 0,
    initial_value: 0,
    monthly_value: 0,
    profile: 0,
  })

  useEffect(() => {
    if (
      objectiveManagementData &&
      Object.entries(objectiveManagementData).length !== 0
    ) {
      dispatch(CleanObjectiveManagementData())
    }
  }, [dispatch, objectiveManagementData])

  useEffect(() => {
    setFormData({
      ...answer,
      profile: +suitabilityData.idperfilinvest,
      initial_value: answer.initial_value,
      monthly_value: answer.monthly_value,
      target_value: answer.target_value,
    })
  }, [answer, suitabilityData])

  if (isEditing && suggestion_goal) {
    return (
      <s.GridRecommendation>
        <TopBar
          nickname={answer.nickname}
          currentStep={totalSteps}
          numberSteps={totalSteps}
        />
        <EditSuggestion
          answer={answer}
          formData={formData}
          setFormData={setFormData}
          suggestionData={suggestion_goal}
          onClose={() => setIsEditing(false)}
        />
      </s.GridRecommendation>
    )
  }

  return (
    <s.GridRecommendation>
      <EditDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
      <TopBar
        nickname={answer.nickname}
        currentStep={totalSteps}
        numberSteps={totalSteps}
      />
      <s.SectionsRecommendation>
        <Container>
          <InformativeHeader
            answer={answer}
            openEdit={() => {
              if (suggestion_goal) {
                setIsEditing(true)
              } else {
                setIsDrawerOpen(true)
              }
            }}
          />

          <RecommendationMessage suggestion_goal={suggestion_goal} />

          <CardEstimatedResults
            answerTargetValue={answer.target_value}
            income={income}
          />

          <SuggestedPlanDetail
            creditProduct={credit_product}
            incomeMedianValue={income.median}
            answerTargetValue={answer.target_value}
          />

          <WalletSection
            funds={funds}
            creditProduct={credit_product}
            isUnmetGoal={!!suggestion_goal}
          />

          <ProductBannerSection additional={additional} />
        </Container>
      </s.SectionsRecommendation>

      <BottomBar recommendationData={data} />

      <UnsavedChangedPrompt
        title="Alterações não salvas"
        description="As alterações não salvas serão perdidas. Tem certeza que deseja
      continuar?"
        hasUnsavedChanges={
          !objectiveManagementData ||
          (objectiveManagementData &&
            Object.entries(objectiveManagementData).length === 0 &&
            !isLoadingManagement)
        }
        onConfirmation={() => dispatch(CleanObjectiveData())}
      />
    </s.GridRecommendation>
  )
}

export default Recommendation
