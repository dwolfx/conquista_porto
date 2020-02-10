import { betweenLength, minDate, minValue } from './validators'

const firstStep = {
  question: 'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
  name: 'nickname',
  type: 'text',
  async validate(value) {
    const isBetweenLength = await betweenLength(3, 20, value)
    if (!isBetweenLength.min) {
      return 'Mínimo 3 caracteres'
    }
    if (!isBetweenLength.max) {
      return 'Máximo 20 caracteres'
    }

    return undefined
  },
}

export default [
  {
    goalType: '1',
    enable: false,
    icon: 'plane',
    label: 'Viagem',
    route: '/viagem',
    flow: [
      firstStep,
      {
        question: 'Qual a data da sua viagem?',
        name: 'targetDate',
        type: 'date',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto vai custar sua viagem?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goalType: '2',
    enable: false,
    icon: 'time',
    label: 'Aposentadoria',
    route: '/aposentadoria',
    flow: [
      firstStep,
      {
        question: 'Quando você quer se aposentar?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto você quer atingir ao final desse objetivo?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
      {
        question:
          'Gostaria de ter uma renda mensal determinada na aposentadoria?',
        name: 'wouldLikeToReceiveMonthlyIncome',
        type: 'bool',
        options: [
          { name: 'Sim', value: 'true' },
          { name: 'Não', value: 'false' },
        ],
      },
    ],
  },
  {
    goalType: '3',
    enable: false,
    icon: 'car2',
    label: 'Carro',
    route: '/carro',
    flow: [
      firstStep,
      {
        question: 'Quando você quer comprar seu carro?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
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
        question: 'Qual o valor do carro?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
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
    ],
  },
  {
    goalType: '4',
    enable: false,
    icon: 'student',
    label: 'Curso',
    route: '/curso',
    flow: [
      firstStep,
      {
        question: 'Quando começa o curso que você quer fazer?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Qual o valor do curso?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goalType: '5',
    enable: false,
    icon: 'drink',
    label: 'Evento',
    route: '/evento',
    flow: [
      firstStep,
      {
        question: 'Quando vai acontecer o evento?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto vai custar o seu evento?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goalType: '6',
    enable: false,
    icon: 'homewithwindow',
    label: 'Casa',
    route: '/casa',
    flow: [
      firstStep,
      {
        question: 'Quando você quer comprar seu imóvel?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
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
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
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
    ],
  },
  {
    goalType: '7',
    enable: false,
    icon: 'money',
    label: 'Poupar',
    route: '/poupar',
    flow: [
      firstStep,
      {
        question: 'Quando você quer resgatar se atingir o total?',
        name: 'targetDate',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        async validate(value) {
          const isValid = await minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Qual valor você pretente atingir?',
        name: 'targetValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initialValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        async validate(value) {
          const isValid = await minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthlyValue',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        async validate(value) {
          const isValid = await minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
]
