import React from 'react'
import { WizardFlow } from 'pages/Objectives/Wizard'
import WizardStep from 'pages/Objectives/Wizard/WizardStep'
import QuestionFlow from 'pages/Objectives/Wizard/QuestionFlow'

const GoalStreams = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Qual a data da sua viagem?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Quanto vai custar sua viagem?',
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
  return (
    <WizardFlow>
      {data.map(item => (
        <WizardStep key={item.name}>
          <QuestionFlow
            question={item.question}
            name={item.name}
            type={item.type}
            minimumValue={item.minimumValue}
          />
        </WizardStep>
      ))}
    </WizardFlow>
  )
}

export default GoalStreams
