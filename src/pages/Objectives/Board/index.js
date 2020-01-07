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
      cardTitle: 'Fazer uma viagem',
      cardPath: '/objetivos/viagem',
    },
    {
      cardIcon: 'time',
      cardTitle: 'Aposentar',
      cardPath: '/objetivos/aposentar',
    },
    {
      cardIcon: 'car2',
      cardTitle: 'Comprar um carro',
      cardPath: '/objetivos/carro',
    },
    {
      cardIcon: 'student',
      cardTitle: 'Fazer um curso',
      cardPath: '/objetivos/curso',
    },
    {
      cardIcon: 'drink',
      cardTitle: 'Fazer um evento',
      cardPath: '/objetivos/evento',
    },
    {
      cardIcon: 'homewithwindow',
      cardTitle: 'Comprar uma casa',
      cardPath: '/objetivos/casa',
    },
    {
      cardIcon: 'financial',
      cardTitle: 'Multiplicar dinheiro',
      cardPath: '/objetivos/dinheiro',
    },
    {
      cardIcon: 'money',
      cardTitle: 'Reservar para emergências',
      cardPath: '/objetivos/reserva',
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
      <Row>
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
