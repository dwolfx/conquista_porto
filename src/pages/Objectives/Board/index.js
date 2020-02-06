import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import dataObjective from 'pages/Objectives/GoalStreams/dataObjective'
import { CardWrapper, CardTitle, IconWrapper } from './styles'

const Board = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const handleFlowRedirect = path => {
    history.push(path)
  }

  return (
    <Container>
      <Row justifyContent="center">
        {dataObjective.map(card => (
          <Col key={card.goalType} lg={3} md={4} sm={6} xs={12}>
            <CardWrapper key={card.goalType}>
              <IconWrapper>
                <Icon name={card.icon} color="blue4" width="56px" />
              </IconWrapper>
              <CardTitle>{card.label}</CardTitle>
              {card.route && (
                <Button
                  outline
                  onClick={() =>
                    handleFlowRedirect(`${match.path}${card.route}`)
                  }
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
