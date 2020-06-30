import React, { useState } from 'react'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from 'components/Wizard/Header'

import Board from './Board'
import GoalStreams from './GoalStreams'
import Recommendation from './Recommendation'

import { IData } from './GoalStreams/types'
import { Container, RegistrationWrapper, BoartTitle } from './styles'

const Objectives = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const [totalSteps, setTotalSteps] = useState(0)
  const [
    isEditingRecommendationWallet,
    setIsEditingRecommendationWallet,
  ] = useState<boolean>(false)
  const [
    isEditingRecommendationSuggestion,
    setIsEditingRecommendationSuggestion,
  ] = useState<boolean>(false)

  const { data: objectiveData } = useSelector<any, any>(
    state => state.objective
  )
  const dontHaveRecommendation = Boolean(
    !objectiveData || Object.keys(objectiveData).length === 0
  )

  // Use only for tests with recomendation
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(PostObjectiveDataRequest({}))
  // }, [dispatch])

  const handleSteps = (data: IData[] | undefined) => {
    setTotalSteps((data || []).length)
  }

  return (
    <Switch>
      <Route path={`${match.path}/:objectiveId`}>
        <GoalStreams handleSteps={handleSteps} />
      </Route>
      <Route path={match.path}>
        <Container>
          <Header
            onClose={() => {
              if (isEditingRecommendationSuggestion) {
                setIsEditingRecommendationSuggestion(false)
              } else if (isEditingRecommendationWallet) {
                setIsEditingRecommendationWallet(false)
              } else {
                history.push('/')
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
              }
            }}
          />
          {dontHaveRecommendation ? (
            <RegistrationWrapper>
              <BoartTitle type="heading3">Criar objetivo</BoartTitle>
              <Board />
            </RegistrationWrapper>
          ) : (
            <Recommendation
              data={objectiveData}
              totalSteps={totalSteps + 1}
              isEditingSuggestion={isEditingRecommendationSuggestion}
              isEditingWallet={isEditingRecommendationWallet}
              setIsEditingSuggestion={setIsEditingRecommendationSuggestion}
              setIsEditingWallet={setIsEditingRecommendationWallet}
            />
          )}
        </Container>
      </Route>
    </Switch>
  )
}

export default Objectives
