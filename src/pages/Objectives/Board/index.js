import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import { GetSuitabilityRequestAndRedirect } from 'store/modules/Suitability/action'

import dataObjective from 'pages/Objectives/GoalStreams/dataObjective'
import { CardWrapper, CardTitle, IconWrapper } from './styles'

const Board = () => {
  const cpf = useSelector(state => state.auth.cpf)
  const isLoading = useSelector(state => state.suitability.isLoading)
  const [loadingButton, setLoadingButton] = useState('')
  const dispatch = useDispatch()

  const match = useRouteMatch()
  const history = useHistory()

  return (
    <Container>
      <Row justifyContent="center">
        {dataObjective.map(card => (
          <Col key={card.goal_type} lg={3} md={4} sm={6} xs={12}>
            <CardWrapper key={card.goal_type}>
              <IconWrapper>
                <Icon name={card.icon} color="blue4" width="56px" />
              </IconWrapper>
              <CardTitle>{card.label}</CardTitle>
              {card.route && (
                <Button
                  data-gtm-subname={`card ${card.label}`}
                  data-gtm-name="escolher"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  outline
                  loading={isLoading && loadingButton === card.goal_type}
                  onClick={() => {
                    setLoadingButton(card.goal_type)
                    dispatch(
                      GetSuitabilityRequestAndRedirect({
                        cpf,
                        link: `${match.path}${card.route}`,
                        history,
                        errorLink: '/objetivos',
                      })
                    )
                  }}
                >
                  escolher
                </Button>
              )}
            </CardWrapper>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Board
