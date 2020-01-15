import React from 'react'
import { WizardFlow } from 'pages/Objectives/Wizard'

const BuyHouseFlow = () => {
  const data = [
    {
      question:
        'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
      name: 'nickname',
      type: 'text',
    },
    {
      question: 'Quando você quer comprar seu imóvel?',
      name: 'targetDate',
      type: 'date',
    },
    {
      question: 'Essa data para você é:',
      name: 'flexibeOrDefiniteDate',
      type: 'bool',
      options: ['Flexível', 'Definitiva'],
    },
    {
      question: 'Qual o valor do imóvel que você quer?',
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
      options: ['Consigo guardar', 'Tenho dificuldade'],
    },
    {
      question:
        'Gostaria de tentar receber antes do prazo final (ex: por sorteio)?',
      name: 'wouldLikeToReceiptEarly',
      type: 'bool',
      options: ['Sim', 'Não'],
    },
  ]
  return <WizardFlow data={data} />
}

export default BuyHouseFlow
