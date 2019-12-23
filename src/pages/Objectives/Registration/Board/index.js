import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import Button from 'components/Button'
import Icon from 'components/IconExporter'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import { CardWrapper, CardTitle } from './styles'

const Board = () => {
  const boardData = [
    {
      cardIcon: 'plane',
      cardTitle: 'Fazer uma viagem',
      cardPath: '/',
    },
    {
      cardIcon: 'time',
      cardTitle: 'Aposentar',
      cardPath: '/',
    },
    {
      cardIcon: 'car2',
      cardTitle: 'Comprar um carro',
      cardPath: '/',
    },
    {
      cardIcon: 'student',
      cardTitle: 'Fazer um curso',
      cardPath: '/',
    },
    {
      cardIcon: 'drink',
      cardTitle: 'Fazer um evento',
      cardPath: '/',
    },
    {
      cardIcon: 'homewithwindow',
      cardTitle: 'Comprar uma casa',
      cardPath: '/',
    },
    {
      cardIcon: 'financial',
      cardTitle: 'Multiplicar dinheiro',
      cardPath: '/',
    },
    {
      cardIcon: 'money',
      cardTitle: 'Reservar para emergências',
      cardPath: '/',
    },
  ]

  const themeContext = useContext(ThemeContext)

  return (
    <Container>
      <Row>
        {boardData.map(card => (
          <Col lg={3} md={4} sm={6} xs={12}>
            <CardWrapper key={card.cardTitle}>
              <Icon
                name={card.cardIcon}
                fill={themeContext.colors.blue4}
                width="56px"
              />
              <CardTitle>{card.cardTitle}</CardTitle>
              {card.cardPath && (
                <Button outline path={card.cardPath}>
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
