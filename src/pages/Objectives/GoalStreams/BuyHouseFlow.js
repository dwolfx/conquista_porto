import React from 'react'
import { WizardFlow } from 'pages/Objectives/GoalStreams/Components/Wizard'
import Header from 'pages/Objectives/GoalStreams/Components/Header'

import { Container } from 'pages/Objectives/GoalStreams/Components/styles'

const BuyHouseFlow = () => {
  const goalType = '6'
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
      ruleText: 'Máximo de 20 caracteres',
    },
    {
      question: 'Quando você quer comprar seu imóvel?',
      name: 'targetDate',
      type: 'date',
      ruleText: 'Mínimo de 6 meses',
    },
    {
      question: 'Essa data para você é:',
      name: 'targetDateFlexible',
      type: 'bool',
      options: [
        { name: 'Flexível', value: 'true' },
        { name: 'Definitiva', value: 'false' },
      ],
    },
    {
      question: 'Qual o valor do imóvel que você quer?',
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
    {
      question:
        'Qual destes comportamentos você tem quando tenta guardar dinheiro?',
      name: 'easyToSavePlannedAmount',
      type: 'bool',
      options: [
        { name: 'Consigo guardar', value: 'true' },
        { name: 'Tenho dificuldade', value: 'false' },
      ],
    },
    {
      question:
        'Gostaria de tentar receber antes do prazo final (ex: por sorteio)?',
      name: 'wouldLikeToReceiveBeforeFinalDate',
      type: 'bool',
      options: [
        { name: 'Sim', value: 'true' },
        { name: 'Não', value: 'false' },
      ],
    },
  ]
  return (
    <Container>
      <Header />
      <WizardFlow data={data} objective={goalType} />
    </Container>
  )
}

export default BuyHouseFlow
