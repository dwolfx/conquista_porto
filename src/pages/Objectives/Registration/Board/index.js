import React from 'react'

import CardObjective from 'components/CardObjective'
import { Container, BoardContainer, BoardTitle } from './styles'

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

  return (
    <Container>
      <BoardTitle>Criar objetivo</BoardTitle>
      <BoardContainer>
        {boardData.map(card => (
          <CardObjective
            key={card.cardTitle}
            cardIcon={card.cardIcon}
            cardTitle={card.cardTitle}
            cardPath={card.cardPath}
          />
        ))}
      </BoardContainer>
    </Container>
  )
}

export default Board
