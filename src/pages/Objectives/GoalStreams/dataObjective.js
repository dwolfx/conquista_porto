import { betweenLength, minDate, minValue } from './validators'

const firstStep = {
  question: 'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
  name: 'nickname',
  type: 'text',
  validate(value) {
    const isBetweenLength = betweenLength(3, 20, value)
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
    goal_type: '1',
    enable: false,
    icon: 'plane',
    label: 'Viagem',
    route: '/viagem',
    flow: [
      firstStep,
      {
        question: 'Qual a data da sua viagem?',
        name: 'target_date',
        type: 'date',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto vai custar sua viagem?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goal_type: '2',
    enable: false,
    icon: 'time',
    label: 'Aposentadoria',
    route: '/aposentadoria',
    flow: [
      firstStep,
      {
        question: 'Quando você quer se aposentar?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto você quer atingir ao final desse objetivo?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
      {
        question:
          'Gostaria de ter uma renda mensal determinada na aposentadoria?',
        name: 'would_like_to_receive_monthly_income',
        type: 'bool',
        options: [
          { name: 'Sim', value: 'true' },
          { name: 'Não', value: 'false' },
        ],
      },
    ],
  },
  {
    goal_type: '3',
    enable: false,
    icon: 'car2',
    label: 'Carro',
    route: '/carro',
    flow: [
      firstStep,
      {
        question: 'Quando você quer comprar seu carro?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Essa data para você é:',
        name: 'is_target_date_flexible',
        type: 'bool',
        options: [
          { name: 'Flexível', value: 'true' },
          { name: 'Definitiva', value: 'false' },
        ],
      },
      {
        question: 'Qual o valor do carro?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
      {
        question:
          'Qual destes comportamentos você tem quando tenta guardar dinheiro?',
        name: 'is_easy_to_save_planned_amount',
        type: 'bool',
        options: [
          { name: 'Consigo guardar', value: 'true' },
          { name: 'Tenho dificuldade', value: 'false' },
        ],
      },
      {
        question:
          'Gostaria de tentar receber antes do prazo final (ex: por sorteio)?',
        name: 'would_like_to_receive_before_final_date',
        type: 'bool',
        options: [
          { name: 'Sim', value: 'true' },
          { name: 'Não', value: 'false' },
        ],
      },
    ],
  },
  {
    goal_type: '4',
    enable: false,
    icon: 'student',
    label: 'Curso',
    route: '/curso',
    flow: [
      firstStep,
      {
        question: 'Quando começa o curso que você quer fazer?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Qual o valor do curso?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goal_type: '5',
    enable: false,
    icon: 'drink',
    label: 'Evento',
    route: '/evento',
    flow: [
      firstStep,
      {
        question: 'Quando vai acontecer o evento?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Quanto vai custar o seu evento?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
  {
    goal_type: '6',
    enable: false,
    icon: 'homewithwindow',
    label: 'Casa',
    route: '/casa',
    flow: [
      firstStep,
      {
        question: 'Quando você quer comprar seu imóvel?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Essa data para você é:',
        name: 'is_target_date_flexible',
        type: 'bool',
        options: [
          { name: 'Flexível', value: 'true' },
          { name: 'Definitiva', value: 'false' },
        ],
      },
      {
        question: 'Qual o valor do imóvel que você quer?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
      {
        question:
          'Qual destes comportamentos você tem quando tenta guardar dinheiro?',
        name: 'is_easy_to_save_planned_amount',
        type: 'bool',
        options: [
          { name: 'Consigo guardar', value: 'true' },
          { name: 'Tenho dificuldade', value: 'false' },
        ],
      },
      {
        question:
          'Gostaria de tentar receber antes do prazo final (ex: por sorteio)?',
        name: 'would_like_to_receive_before_final_date',
        type: 'bool',
        options: [
          { name: 'Sim', value: 'true' },
          { name: 'Não', value: 'false' },
        ],
      },
    ],
  },
  {
    goal_type: '7',
    enable: false,
    icon: 'money',
    label: 'Poupar',
    route: '/poupar',
    flow: [
      firstStep,
      {
        question: 'Quando você quer resgatar se atingir o total?',
        name: 'target_date',
        type: 'date',
        maxLength: '10',
        ruleText: 'Mínimo de 6 meses',
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : 'Mínimo de 6 meses'
        },
      },
      {
        question: 'Qual valor você pretente atingir?',
        name: 'target_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você quer investir inicialmente?',
        name: 'initial_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 1.000,00',
        validate(value) {
          const isValid = minValue(value, '1.000,00')
          return isValid ? undefined : 'Mínimo de R$ 1.000,00'
        },
      },
      {
        question: 'Quanto você pretende investir por mês?',
        name: 'monthly_value',
        type: 'number',
        ruleText: 'Mínimo de R$ 100,00',
        validate(value) {
          const isValid = minValue(value, '100,00')
          return isValid ? undefined : 'Mínimo de R$ 100,00'
        },
      },
    ],
  },
]
