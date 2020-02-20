import { betweenLength, minDate, minValue } from './validators'

const INITIAL_VALUE_NAME = 'initial_value'
const TARGET_DATE_NAME = 'target_date'
const TARGET_VALUE_NAME = 'target_value'
const NICKNAME_NAME = 'nickname'
const MONTHLY_NAME = 'monthly_value'
const FLEXIBLE_TARGET_DATE_NAME = 'is_target_date_flexible'
const TEXT_TYPE = 'text'
const DATE_TYPE = 'date'
const NUMBER_TYPE = 'number'
const VALUE_INPUT_MAX_LENGTH = 25
const STRING_INPUT_MAX_LENGTH = 20
const HUNDRED_MIN_VALUE = '100,00'
const THOUSAND_MIN_VALUE = '1.000,00'
const MAX_CHARS_ERROR_TEXT = 'Máximo 20 caracteres'
const MIN_CHARS_ERROR_TEXT = 'Mínimo 3 caracteres'
const MIN_DATE_ERROR_TEXT = 'Mínimo de 6 meses'
const HUNDRED_MIN_VALUE_ERROR_TEXT = 'Mínimo de R$ 100,00'
const THOUSAND_MIN_VALUE_ERROR_TEXT = 'Mínimo de R$ 1.000,00'
const INITIAL_INVESTMENT_QUESTION = 'Quanto você quer investir inicialmente?'
const MONTHLY_INVESTMENT_QUESTION = 'Quanto você pretende investir por mês?'

const firstStep = {
  question: 'Oi, qual é o apelido que você quer dar para o seu novo objetivo?',
  name: NICKNAME_NAME,
  type: TEXT_TYPE,
  validate(value) {
    const isBetweenLength = betweenLength(3, 20, value)
    if (!isBetweenLength.min) {
      return MIN_CHARS_ERROR_TEXT
    }
    if (!isBetweenLength.max) {
      return MAX_CHARS_ERROR_TEXT
    }

    return undefined
  },
  maxLength: STRING_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Quanto vai custar sua viagem?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Quanto você quer atingir ao final desse objetivo?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Essa data para você é:',
        name: FLEXIBLE_TARGET_DATE_NAME,
        type: 'bool',
        options: [
          { name: 'Flexível', value: 'true' },
          { name: 'Definitiva', value: 'false' },
        ],
      },
      {
        question: 'Qual o valor do carro?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Qual o valor do curso?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Quanto vai custar o seu evento?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Essa data para você é:',
        name: FLEXIBLE_TARGET_DATE_NAME,
        type: 'bool',
        options: [
          { name: 'Flexível', value: 'true' },
          { name: 'Definitiva', value: 'false' },
        ],
      },
      {
        question: 'Qual o valor do imóvel que você quer?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
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
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: MIN_DATE_ERROR_TEXT,
        validate(value) {
          const isValid = minDate(value, 180)
          return isValid ? undefined : MIN_DATE_ERROR_TEXT
        },
      },
      {
        question: 'Qual valor você pretente atingir?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        validate(value) {
          const isValid = minValue(value, HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
    ],
  },
]
