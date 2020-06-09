import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import { formatMoneyDecimal } from 'helpers'

import Text from 'components/Text'
import Icon from 'components/IconExporter'
import InputText from 'components/NewInput'
import UnsavedChangedPrompt from 'components/Modal/Prompt'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'

import {
  CleanObjectiveData,
  PostObjectiveDataRequest,
} from 'store/modules/Objective/action'
import { CleanObjectiveManagementData } from 'store/modules/ObjectiveManagement/action'

import BottomBar from './BottomBar'
import WalletSection from './WalletSection'
import ProductBannerSection from './ProductBanner'
import SuggestionBanner from './SuggestionBanner'
import RecommendationMessage from './RecommendationMessage'
import CardEstimatedResults from './CardEstimatedResults'

import {
  ValidateInitialInvestment,
  ValidateMonthlyInvestment,
  ValidateNickname,
  ValidateTargetDate,
} from './validations'

import {
  GridRecommendation,
  DrawerForm,
  SectionsRecommendation,
  ButtonSubmit,
  FormWrapper,
  ColInput,
  ErrorMessageContainer,
} from './styles'

const Recommendation = ({ data, isLoading, totalSteps }) => {
  const {
    answer,
    combo,
    income,
    funds,
    credit_product,
    additional,
    suggestion_goal,
  } = data
  const dispatch = useDispatch()
  const {
    isLoading: isLoadingManagement,
    data: objectiveManagementData,
    suitabilityData,
  } = useSelector(state => ({
    ...state.objectiveManagement,
    isLoadingBySimulate: state.objective.isLoadingBySimulate,
    suitabilityData: state.suitability.data,
  }))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [invalidInput, setInvalidInput] = useState({
    nickname: false,
    initial_value: false,
    monthly_value: false,
    target_date: false,
  })
  const [blurredInputs, setBlurredInputs] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (
      objectiveManagementData &&
      Object.entries(objectiveManagementData).length !== 0
    ) {
      dispatch(CleanObjectiveManagementData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFormData({
      ...answer,
      profile: +suitabilityData.idperfilinvest,
      initial_value: formatMoneyDecimal(answer.initial_value * 100),
      monthly_value: formatMoneyDecimal(answer.monthly_value * 100),
      target_value: formatMoneyDecimal(answer.target_value * 100),
    })
  }, [answer, suitabilityData])

  const footerDrawer = () => (
    <ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() => submitToRecommendation()}
      disabled={
        invalidInput.nickname ||
        invalidInput.initial_value ||
        invalidInput.monthly_value ||
        invalidInput.target_date ||
        isLoading
      }
      loading={isLoading}
    >
      Confirmar e recalcular
    </ButtonSubmit>
  )

  const submitToRecommendation = () => {
    dispatch(
      PostObjectiveDataRequest({
        data: {
          ...formData,
          initial_value: formData.initial_value,
          monthly_value: formData.monthly_value,
          target_value: formData.target_value,
        },
        onSuccess: () => setIsDrawerOpen(false),
      })
    )
  }

  const moneyMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
  }

  const formatDateMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue
    if (strippedValue.length < 5) {
      newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
    } else {
      newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = newValue
  }

  const renderErrorMessage = message => (
    <ErrorMessageContainer align="center">
      <Icon name="information" color="magenta2" width={21} />
      <Text type="body" color="magenta2">
        {message}
      </Text>
    </ErrorMessageContainer>
  )

  const validator = (value, name) => {
    if (blurredInputs.indexOf(name) < 0) {
      setBlurredInputs([...blurredInputs, name])
    }

    switch (name) {
      case 'nickname':
        if (ValidateNickname(value)[0]) {
          if (invalidInput.nickname)
            setInvalidInput({ ...invalidInput, nickname: false })
          break
        }

        if (!invalidInput.nickname)
          setInvalidInput({ ...invalidInput, nickname: true })
        break

      case 'initial_value':
        if (ValidateInitialInvestment(value)[0]) {
          if (invalidInput.initial_value)
            setInvalidInput({ ...invalidInput, initial_value: false })
          break
        }

        if (!invalidInput.initial_value)
          setInvalidInput({ ...invalidInput, initial_value: true })
        break
      case 'monthly_value':
        if (ValidateMonthlyInvestment(value)[0]) {
          if (invalidInput.monthly_value)
            setInvalidInput({ ...invalidInput, monthly_value: false })
          break
        }
        if (!invalidInput.monthly_value)
          setInvalidInput({ ...invalidInput, monthly_value: true })
        break
      case 'target_date':
        if (ValidateTargetDate(value)[0]) {
          if (invalidInput.target_date)
            setInvalidInput({ ...invalidInput, target_date: false })
          break
        }
        if (!invalidInput.target_date)
          setInvalidInput({ ...invalidInput, target_date: true })
        break
      default:
        break
    }
  }

  const handleSingleValue = event => {
    const { name } = event.target

    if (blurredInputs.indexOf(name) >= 0) {
      validator(event.target.value, name)
    }

    if (
      name === 'initial_value' ||
      name === 'monthly_value' ||
      name === 'target_value'
    )
      moneyMask(event)
    if (name === 'target_date') formatDateMask(event)
    setFormData({ ...formData, [name]: event.target.value })
  }

  return (
    <GridRecommendation>
      <TopBar
        answer={answer}
        nickname={answer.nickname}
        currentStep={totalSteps}
        numberSteps={totalSteps}
      />
      <SectionsRecommendation>
        <DrawerForm
          drawerTitle="Resumo"
          isOpen={isDrawerOpen}
          handleClose={() => setIsDrawerOpen(false)}
          footer={footerDrawer()}
        >
          <FormWrapper data-gtm-type="form" data-gtm-name="resumo">
            <ColInput>
              <InputText
                data-gtm-form="input"
                data-gtm-name="apelido"
                name="nickname"
                error={invalidInput.nickname}
                onBlur={e => validator(e.target.value, 'nickname')}
                label="Apelido"
                onChange={handleSingleValue}
                value={formData.nickname}
              />
              {invalidInput.nickname &&
                renderErrorMessage(ValidateNickname(formData.nickname)[1])}
            </ColInput>
            <ColInput error={invalidInput.nickname}>
              <InputText
                data-gtm-form="input"
                data-gtm-name="investimento inicial"
                name="initial_value"
                error={invalidInput.initial_value}
                onBlur={e => validator(e.target.value, 'initial_value')}
                prefix="R$"
                label="Investimento inicial"
                onChange={handleSingleValue}
                value={formData.initial_value}
                maxLength={14}
              />
              {invalidInput.initial_value &&
                renderErrorMessage(
                  ValidateInitialInvestment(formData.initial_value)[1]
                )}
            </ColInput>
            <ColInput error={invalidInput.initial_value}>
              <InputText
                data-gtm-form="input"
                data-gtm-name="investimento mensal"
                name="monthly_value"
                error={invalidInput.monthly_value}
                onBlur={e => validator(e.target.value, 'monthly_value')}
                prefix="R$"
                label="Investimento mensal"
                onChange={handleSingleValue}
                value={formData.monthly_value}
                maxLength={14}
              />
              {invalidInput.monthly_value &&
                renderErrorMessage(
                  ValidateMonthlyInvestment(formData.monthly_value)[1]
                )}
            </ColInput>
            <ColInput error={invalidInput.monthly_value}>
              <InputText
                data-gtm-form="input"
                data-gtm-name="meta financeira"
                name="target_value"
                prefix="R$"
                label="Meta financeira"
                onChange={handleSingleValue}
                value={formData.target_value}
                maxLength={14}
              />
            </ColInput>
            <ColInput>
              <InputText
                data-gtm-form="input"
                data-gtm-name="data-alvo"
                name="target_date"
                error={invalidInput.target_date}
                onBlur={e => validator(e.target.value, 'target_date')}
                label="Data-alvo"
                onChange={handleSingleValue}
                value={formData.target_date}
              />
              {invalidInput.target_date &&
                renderErrorMessage(ValidateTargetDate(formData.target_date)[1])}
            </ColInput>
          </FormWrapper>
        </DrawerForm>
        <Container>
          <SuggestionBanner
            toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
            answer={answer}
            suggestion_goal={suggestion_goal}
          />

          <RecommendationMessage suggestion_goal={suggestion_goal} />

          <CardEstimatedResults answer={answer} combo={combo} income={income} />

          <WalletSection
            combo={combo}
            funds={funds}
            creditProduct={credit_product}
            isUnmetGoal={!!suggestion_goal}
          />

          <ProductBannerSection additional={additional} />
        </Container>
      </SectionsRecommendation>

      <BottomBar
        recommendationData={data}
        answer={answer}
        isLoading={isLoading}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <UnsavedChangedPrompt
        title="Alterações não salvas"
        description="As alterações não salvas serão perdidas. Tem certeza que deseja
      continuar?"
        hasUnsavedChanges={
          !objectiveManagementData ||
          (objectiveManagementData &&
            Object.entries(objectiveManagementData).length === 0 &&
            !isLoadingManagement)
        }
        onConfirmation={() => dispatch(CleanObjectiveData())}
      />
    </GridRecommendation>
  )
}

Recommendation.defaultProps = {
  data: {
    answer: {
      target_date: '',
      target_value: 0,
      initial_value: 0,
      monthly_value: 0,
      nickname: '',
    },
    combo: [],
    income: {},
    funds: [],
    credit_product: {},
    additional: {},
    suggestion_goal: null,
  },
}

Recommendation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer: PropTypes.shape({
      target_date: PropTypes.string,
      target_value: PropTypes.number,
      initial_value: PropTypes.number,
      monthly_value: PropTypes.number,
      nickname: PropTypes.string,
    }),
    combo: PropTypes.array,
    income: PropTypes.object,
    funds: PropTypes.array,
    credit_product: PropTypes.object,
    additional: PropTypes.object,
    suggestion_goal: PropTypes.object,
  }),
  totalSteps: PropTypes.number.isRequired,
}

export default Recommendation
