import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'
import Icon from 'components/IconExporter'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import { CardWrapper, CardTitle, IconWrapper } from './styles'

const Board = () => {
  const boardData = [
    {
      cardIcon: 'plane',
      cardTitle: 'Viagem',
      cardPath: '/objetivos/viagem',
    },
    {
      cardIcon: 'time',
      cardTitle: 'Aposentadoria',
      cardPath: '/objetivos/aposentadoria',
    },
    {
      cardIcon: 'car2',
      cardTitle: 'Carro',
      cardPath: '/objetivos/carro',
    },
    {
      cardIcon: 'student',
      cardTitle: 'Curso',
      cardPath: '/objetivos/curso',
    },
    {
      cardIcon: 'drink',
      cardTitle: 'Evento',
      cardPath: '/objetivos/evento',
    },
    {
      cardIcon: 'homewithwindow',
      cardTitle: 'Casa',
      cardPath: '/objetivos/casa',
    },
    {
      cardIcon: 'money',
      cardTitle: 'Poupar',
      cardPath: '/objetivos/poupar',
    },
  ]

  const history = useHistory()

  const handleFlowRedirect = path => {
    history.push(path)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const themeContext = useContext(ThemeContext)

  return (
    <Container>
      <Row justifyContent="center">
        {boardData.map(card => (
          <Col key={card.cardTitle} lg={3} md={4} sm={6} xs={12}>
            <CardWrapper key={card.cardTitle}>
              <IconWrapper>
                <Icon
                  name={card.cardIcon}
                  fill={themeContext.colors.blue4}
                  width="56px"
                />
              </IconWrapper>
              <CardTitle>{card.cardTitle}</CardTitle>
              {card.cardPath && (
                <Button
                  outline
                  onClick={() => handleFlowRedirect(card.cardPath)}
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
