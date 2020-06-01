import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CardBackground from 'components/CardBackground'
import { Row } from 'styled-bootstrap-grid'

import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

import dataObjective from 'pages/Objectives/GoalStreams/dataObjective'
import * as s from './styles'

const Board = () => {
  const { cpf, isLoading } = useSelector<any, any>(state => ({
    cpf: state.auth.cpf,
    isLoading: state.suitability.isLoading,
  }))

  const [loadingButton, setLoadingButton] = useState<string>('')
  const dispatch = useDispatch()

  const match = useRouteMatch()
  const history = useHistory()

  return (
    <s.BoardWrapper>
      <Row justifyContent="center">
        {dataObjective?.map(card => (
          <s.ColCard key={card.goal_type} lg={3} md={3} sm={3} xs={12}>
            <CardBackground
              key={card.goal_type}
              background={card.image}
              icon={card.icon}
              title={card.label}
              isLoading={isLoading && loadingButton === card.goal_type}
              data-gtm-subname={`card ${card.label}`}
              data-gtm-name="escolher"
              data-gtm-type="click"
              data-gtm-clicktype="card"
              onClick={() => {
                setLoadingButton(card.goal_type)
                dispatch(
                  GetSuitabilityRequestAndRedirect({
                    cpf,
                    link: `${match.path}${card.route}`,
                    history,
                    errorPath: '/objetivos',
                    goalType: card.goal_type,
                  })
                )
              }}
            />
          </s.ColCard>
        ))}
      </Row>
    </s.BoardWrapper>
  )
}

export default Board
