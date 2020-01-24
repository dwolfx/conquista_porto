import React from 'react'
import { WizardFlow } from 'pages/Objectives/GoalStreams/Components/Wizard'
import Header from 'pages/Objectives/GoalStreams/Components/Header'

import { Container } from 'pages/Objectives/GoalStreams/Components/styles'

const BuyCarFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Quando você quer comprar seu carro?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Essa data para você é:',
      name: 'flexibeOrDefiniteDate',
      type: 'bool',
      options: [
        {
          name: 'Flexível',
          value: 'Flexível',
        },
        { name: 'Definitiva', value: 'Definitiva' },
      ],
    },
    {
      question: 'Qual o valor do carro?',
      name: 'targetValue',
      type: 'number',
    },
    {
      question: 'Quanto você quer investir inicialmente?',
      name: 'initialValue',
      type: 'number',
    },
    {
      question: 'Quanto você pretende investir por mês?',
      name: 'monthlyValue',
      type: 'number',
      minimumValue: '500',
    },
    {
      question:
        'Qual destes comportamentos você tem quando tenta guardar dinheiro?',
      name: 'easeOfSavingMoney',
      type: 'bool',
      options: [
        { name: 'Consigo guardar', value: 'Consigo guardar' },
        { name: 'Tenho dificuldade', value: 'Tenho dificuldade' },
      ],
    },
    {
      question:
        'Gostaria de tentar receber antes do prazo final (ex: por sorteio)?',
      name: 'wouldLikeToReceiptEarly',
      type: 'bool',
      options: [
        { name: 'Sim', value: 'Sim' },
        { name: 'Não', value: 'Não' },
      ],
    },
  ]
  return (
    <Container>
      <Header />
      <WizardFlow data={data} />
    </Container>
  )
}

export default BuyCarFlow
