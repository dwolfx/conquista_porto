import React from 'react'

import ImgTip1 from 'assets/images/pages/Objectives/flow-tip1.png'

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
  TRIP,
  IData,
  IDataObject,
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
const HUNDRED_MIN_VALUE = '100,00'
const THOUSAND_MIN_VALUE = '1.000,00'
const MAX_CHARS_ERROR_TEXT = 'Máximo 20 caracteres'
const MIN_CHARS_ERROR_TEXT = 'Mínimo 3 caracteres'
const DATE_TEXT = 'Mínimo de 6 meses'
const HUNDRED_MIN_VALUE_ERROR_TEXT = 'Mínimo de R$ 100,00'
const THOUSAND_MIN_VALUE_ERROR_TEXT = 'Mínimo de R$ 1.000,00'
const INITIAL_INVESTMENT_QUESTION = 'Quanto você quer investir inicialmente?'
const MONTHLY_INVESTMENT_QUESTION = 'Quanto você pretende investir por mês?'
const MONTHLY_INVESTMENT_DESCRIPTION = `Essa é uma ótima forma de aumentar a renda continuamente. 
Sugerimos que você invista pelo menos {{{VALOR}}} para alcançar a meta de {{{VALOR_META}}} em {{{PRAZO}}}.`
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
      <img src={ImgTip1} alt="tip initial investment" />
      {contentInitialValue}
    </s.CardBodyContainer>
  </s.Card>
)

const contentMonthlyValue = (
  <s.TipContent>
    <s.CardText type="body" color="gray5" bold>
      Se achar o valor sugerido alto, não se preocupe: insira uma quantia menor
      e nós criaremos um plano adaptado para você a alcançar a meta.
    </s.CardText>
  </s.TipContent>
)

const renderSideTipMonthlyValue = (
  <s.Card headerTitle="Dica" headerIcon="information">
    <s.CardBodyContainer>
      <img src={ImgTip1} alt="tip initial investment" />
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

const dataObject: IDataObject[] = [
  {
    goal_type: TRIP,
    enable: false,
    icon: 'plane',
    label: 'Viagem',
    route: '/viagem',
    image: require('assets/images/pages/Objectives/GoalStreams/card-viagem.jpg'),
    flow: [
      firstStep,
      {
        question: 'Qual a data da sua viagem?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
      },
      {
        question: 'Quanto vai custar sua viagem?',
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        question: 'Quando você quer se aposentar?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
      },
      {
        question: 'Quanto você quer atingir ao final desse objetivo?',
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        question: 'Quando você quer comprar seu carro?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        question: 'Quando você quer comprar seu imóvel?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        question: 'Quando começa o curso que você quer fazer?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
      },
      {
        question: 'Qual o valor do curso?',
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
      },
      {
        question: 'Quanto vai custar o seu evento?',
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
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
        question: 'Quando você quer resgatar se atingir o total?',
        name: TARGET_DATE_NAME,
        type: DATE_TYPE,
        maxLength: '10',
        ruleText: DATE_TEXT,
        validate(value) {
          return validateDate(
            value.toString(),
            MIN_DATE_VALUES,
            MAX_DATE_VALUES
          )
        },
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
        placeholder: HUNDRED_MIN_VALUE,
        validate(value) {
          const isValid = minValue(value.toString(), HUNDRED_MIN_VALUE)
          return isValid ? undefined : HUNDRED_MIN_VALUE_ERROR_TEXT
        },
        maxLength: VALUE_INPUT_MAX_LENGTH,
        sideTip: renderSideTipMonthlyValue,
        tooltip: contentMonthlyValue,
      },
    ],
  },
]

export default dataObject
