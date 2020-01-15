import React from 'react'
import { WizardFlow } from 'pages/Objectives/Wizard'

const EventFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Quando vai acontecer o evento?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Quanto vai custar o seu evento?',
      name: 'targetValue',
      type: 'number',
    },
    {
      question: 'Quanto você quer investir inicialmente?',
      name: 'initialValue',
      type: 'number',
      minimumValue: '500',
    },
    {
      question: 'Quanto você pretende investir por mês?',
      name: 'monthlyValue',
      type: 'number',
    },
  ]
  return <WizardFlow data={data} />
}

export default EventFlow
