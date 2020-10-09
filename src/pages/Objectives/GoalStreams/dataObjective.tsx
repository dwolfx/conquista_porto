import React from 'react'

import ImgTipInitial from 'assets/images/pages/Objectives/card-dica-inv-inicial.jpg'
import ImgTipMonthly from 'assets/images/pages/Objectives/card-dica-inv-mensal.jpg'

import * as s from './styles'
import {
  betweenLength,
  minValue,
  validateDate,
  IDateValues,
} from './validators'
import {
  CAR,
  COURSE,
  EVENT,
  HOME,
  RETIREMENT,
  SAVE_MONEY,
  TRAVEL,
  IData,
  IDataObject,
  ISuggestionValues,
} from './types'

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
const HUNDRED_MIN_VALUE = 100
const HUNDRED_MIN_VALUE_TEXT = '100,00'
const THOUSAND_MIN_VALUE = '1.000,00'
const MAX_CHARS_ERROR_TEXT = 'Máximo 20 caracteres'
const MIN_CHARS_ERROR_TEXT = 'Mínimo 3 caracteres'
const DATE_TEXT = 'Mínimo de 6 meses'
const DATE_DESCRIPTION =
  'Pode ser uma estimativa, caso você não tenha uma data exata.'
const HUNDRED_MIN_VALUE_ERROR_TEXT =
  'Insira um valor a partir de R$ 100,00, por favor.'
const THOUSAND_MIN_VALUE_ERROR_TEXT =
  'Insira um valor a partir de R$ 1.000,00, por favor.'
const INITIAL_INVESTMENT_QUESTION = 'De quanto será o seu investimento inicial?'
const MONTHLY_INVESTMENT_QUESTION = 'Quanto você  pretende investir por mês?'
const MONTHLY_INVESTMENT_DESCRIPTION = `Essa é uma ótima forma de aumentar a renda continuamente. 
Sugerimos que você invista pelo menos {{{VALOR}}} para alcançar a meta de {{{VALOR_META}}} em {{{PRAZO}}}.`
const INITIAL_INVESTMENT_DESCRIPTION =
  'Você pode inserir qualquer valor a partir de R$1.000,00.'

const MIN_DATE_VALUES: IDateValues = {
  value: 6,
  type: 'months',
  text: 'meses',
}
const MAX_DATE_VALUES: IDateValues = {
  value: 100,
  type: 'years',
  text: 'anos',
}
const SUGGESTION_DATE_VALUES_TRIP_EVENT_COURSE: ISuggestionValues[] = [
  {
    label: '6 meses',
    value: {
      amount: 6,
      duration: 'months',
    },
  },
  {
    label: '10 meses',
    value: {
      amount: 10,
      duration: 'months',
    },
  },
  {
    label: '1 ano',
    value: {
      amount: 1,
      duration: 'year',
    },
  },
  {
    label: '2 anos',
    value: {
      amount: 2,
      duration: 'years',
    },
  },
]
const SUGGESTION_DATE_VALUES_HOME_SAVE_MONEY: ISuggestionValues[] = [
  {
    label: '6 meses',
    value: {
      amount: 6,
      duration: 'months',
    },
  },
  {
    label: '1 ano',
    value: {
      amount: 1,
      duration: 'year',
    },
  },
  {
    label: '5 anos',
    value: {
      amount: 5,
      duration: 'years',
    },
  },
  {
    label: '10 anos',
    value: {
      amount: 10,
      duration: 'years',
    },
  },
]
const SUGGESTION_DATE_VALUES_CAR: ISuggestionValues[] = [
  {
    label: '6 meses',
    value: {
      amount: 6,
      duration: 'months',
    },
  },
  {
    label: '1 ano',
    value: {
      amount: 1,
      duration: 'year',
    },
  },
  {
    label: '2 anos',
    value: {
      amount: 2,
      duration: 'years',
    },
  },
  {
    label: '3 anos',
    value: {
      amount: 3,
      duration: 'years',
    },
  },
]
const SUGGESTION_DATE_VALUES_RETIREMENT: ISuggestionValues[] = [
  {
    label: `{{{AGE}}} + 5`,
    value: {
      amount: 5,
      duration: 'years',
    },
  },
  {
    label: `{{{AGE}}} + 10`,
    value: {
      amount: 10,
      duration: 'years',
    },
  },
  {
    label: `{{{AGE}}} + 20`,
    value: {
      amount: 20,
      duration: 'years',
    },
  },
  {
    label: `{{{AGE}}} + 30`,
    value: {
      amount: 30,
      duration: 'years',
    },
  },
]

const contentInitialValue = (
  <s.TipContent>
    <s.CardText type="body" color="gray5" bold>
      Chamamos de investimento inicial, a primeira aplicação feita em um fundo.
      Ela funciona como uma "entrada".
    </s.CardText>
  </s.TipContent>
)

const renderSideTipInitialValue = (
  <s.Card headerTitle="Dica" headerIcon="information">
    <s.CardBodyContainer>
      <img src={ImgTipInitial} alt="tip initial investment" />
      {contentInitialValue}
    </s.CardBodyContainer>
  </s.Card>
)

const contentMonthlyValue = (
  <s.TipContent>
    <s.CardText type="body" color="gray5" bold>
      Se achar o valor sugerido alto, não se preocupe: insira uma quantia menor
      e nós criaremos um plano adaptado para você alcançar a meta.
    </s.CardText>
  </s.TipContent>
)

const renderSideTipMonthlyValue = (
  <s.Card headerTitle="Dica" headerIcon="information">
    <s.CardBodyContainer>
      <img src={ImgTipMonthly} alt="tip initial investment" />
      {contentMonthlyValue}
    </s.CardBodyContainer>
  </s.Card>
)

const firstStep: IData = {
  question: 'Olá {{{nome}}}, como você quer chamar o seu novo objetivo?',
  name: NICKNAME_NAME,
  type: TEXT_TYPE,
  validate(value) {
    const isBetweenLength = betweenLength(0, 20, value.toString())
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

const dataObjective: IDataObject[] = [
  {
    goal_type: TRAVEL,
    enable: false,
    icon: 'plane',
    label: 'Viagem',
    route: '/viagem',
    image: require('assets/images/pages/Objectives/GoalStreams/card-viagem.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando você planeja fazer a viagem?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_TRIP_EVENT_COURSE,
      },
      {
        question: 'Quanto custará a viagem?',
        description:
          'Considere os custos de traslado, hospedagem, alimentação e outros que julgar importante.',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
    ],
  },
  {
    goal_type: RETIREMENT,
    enable: false,
    icon: 'time',
    label: 'Aposentar',
    route: '/aposentar',
    image: require('assets/images/pages/Objectives/GoalStreams/card-aposentar.jpg'),
    flow: [
      firstStep,
      {
        question: 'Com quantos anos você planeja se aposentar?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_RETIREMENT,
      },
      {
        question: 'Quanto você quer acumular para a sua aposentadoria?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
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
    goal_type: CAR,
    enable: false,
    icon: 'car2',
    label: 'Carro',
    route: '/carro',
    image: require('assets/images/pages/Objectives/GoalStreams/card-carro.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando você planeja comprar seu carro?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_CAR,
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
        question: 'Qual o valor aproximado do carro?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
      {
        question: 'Como é seu comportamento quando precisa guardar dinheiro?',
        name: 'is_easy_to_save_planned_amount',
        type: 'bool',
        options: [
          { name: 'Guardo o que planejo com facilidade', value: 'true' },
          {
            name: 'Tenho dificuldade para guardar o que planejo',
            value: 'false',
          },
        ],
      },
    ],
  },
  {
    goal_type: HOME,
    enable: false,
    icon: 'homewithwindow',
    label: 'Casa',
    route: '/casa',
    image: require('assets/images/pages/Objectives/GoalStreams/card-casa.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando você planeja comprar seu imóvel?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_HOME_SAVE_MONEY,
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
        question: 'Qual o valor aproximado do imóvel?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
      {
        question: 'Como é seu comportamento quando precisa guardar dinheiro?',
        name: 'is_easy_to_save_planned_amount',
        type: 'bool',
        options: [
          { name: 'Guardo o que planejo com facilidade', value: 'true' },
          {
            name: 'Tenho dificuldade para guardar o que planejo',
            value: 'false',
          },
        ],
      },
    ],
  },
  {
    goal_type: COURSE,
    enable: false,
    icon: 'student',
    label: 'Curso',
    route: '/curso',
    image: require('assets/images/pages/Objectives/GoalStreams/card-curso.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando você planeja fazer o curso?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_TRIP_EVENT_COURSE,
      },
      {
        question: 'Qual o valor aproximado do curso?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        description:
          'Se for em outra cidade, considere os custos de traslado, hospedagem, alimentação e outros que julgar importante.',
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
    ],
  },
  {
    goal_type: EVENT,
    enable: false,
    icon: 'drink',
    label: 'Evento',
    route: '/evento',
    image: require('assets/images/pages/Objectives/GoalStreams/card-evento.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando vai acontecer o evento?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_TRIP_EVENT_COURSE,
      },
      {
        question: 'Qual o valor aproximado do evento?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        description:
          'Se for em outra cidade, considere os custos de traslado, hospedagem, alimentação e outros que julgar importante.',
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
    ],
  },
  {
    goal_type: SAVE_MONEY,
    enable: false,
    icon: 'money',
    label: 'Poupar',
    route: '/poupar',
    image: require('assets/images/pages/Objectives/GoalStreams/card-poupar.jpg'),
    flow: [
      firstStep,
      {
        question: 'Quando você planeja atingir o total?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        description: DATE_DESCRIPTION,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
        suggestionValues: SUGGESTION_DATE_VALUES_HOME_SAVE_MONEY,
      },
      {
        question: 'Qual valor você pretente atingir?',
        name: TARGET_VALUE_NAME,
        type: NUMBER_TYPE,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
      },
      {
        question: INITIAL_INVESTMENT_QUESTION,
        name: INITIAL_VALUE_NAME,
        type: NUMBER_TYPE,
        description: INITIAL_INVESTMENT_DESCRIPTION,
        ruleText: THOUSAND_MIN_VALUE_ERROR_TEXT,
        placeholder: THOUSAND_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), THOUSAND_MIN_VALUE)
          return isValid ? undefined : THOUSAND_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipInitialValue,
        tooltip: contentInitialValue,
      },
      {
        question: MONTHLY_INVESTMENT_QUESTION,
        description: MONTHLY_INVESTMENT_DESCRIPTION,
        name: MONTHLY_NAME,
        type: NUMBER_TYPE,
        ruleText: HUNDRED_MIN_VALUE_ERROR_TEXT,
        placeholder: HUNDRED_MIN_VALUE_TEXT,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE_TEXT)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
        minValue: HUNDRED_MIN_VALUE,
      },
    ],
  },
]

export default dataObjective
