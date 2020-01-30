import React from 'react'
import { WizardFlow } from 'pages/Objectives/GoalStreams/Components/Wizard'
import Header from 'pages/Objectives/GoalStreams/Components/Header'

import { Container } from 'pages/Objectives/GoalStreams/Components/styles'

const EventFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
      ruleText: 'Máximo de 20 caracteres',
    },
    {
      question: 'Quando vai acontecer o evento?',
      name: 'targetDate',
      type: 'date',
      ruleText: 'Mínimo de 6 meses',
    },
    {
      question: 'Quanto vai custar o seu evento?',
      name: 'targetValue',
      type: 'number',
      minimumValue: '1000',
      ruleText: 'Mínimo de R$ 1.000,00',
    },
    {
      question: 'Quanto você quer investir inicialmente?',
      name: 'initialValue',
      type: 'number',
      minimumValue: '1000',
      ruleText: 'Mínimo de R$ 1.000,00',
    },
    {
      question: 'Quanto você pretende investir por mês?',
      name: 'monthlyValue',
      type: 'number',
      minimumValue: '100',
      ruleText: 'Mínimo de R$ 100,00',
    },
  ]
  return (
    <Container>
      <Header />
      <WizardFlow data={data} />
    </Container>
  )
}

export default EventFlow
