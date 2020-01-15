import React from 'react'
import { WizardFlow } from 'pages/Objectives/Wizard'

const RetirementFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Quando você quer se aposentar?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Quanto você quer atingir ao final desse objetivo?',
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
    {
      question:
        'Gostaria de ter uma renda mensal determinada na aposentadoria?',
      name: 'wouldLikeToReceiveMonthlyIncome',
      type: 'bool',
      options: ['Sim', 'Não'],
    },
  ]
  return <WizardFlow data={data} />
}

export default RetirementFlow
