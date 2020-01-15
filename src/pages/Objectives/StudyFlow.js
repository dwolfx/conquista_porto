import React from 'react'
import { WizardFlow } from 'pages/Objectives/Wizard'

const StudyFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Quando começa o curso que você quer fazer?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Qual o valor do curso?',
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

export default StudyFlow
