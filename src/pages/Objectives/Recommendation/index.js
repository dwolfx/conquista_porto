import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import {
  formatMoney,
  formatMoneyDecimal,
  formatMoneyWithoutCurrencyFlag,
  formatDateMask,
} from 'helpers'
import useMedia from 'hooks/useMedia'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import Drawer from 'components/Drawer'
import InputText from 'components/NewInput'
import UnsavedChangedPrompt from 'components/Modal/Prompt'

import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'

import {
  CleanObjectiveData,
  PostObjectiveDataRequest,
  PostObjectiveDataRequestBySimulate,
} from 'store/modules/Objective/action'
import { CleanObjectiveManagementData } from 'store/modules/ObjectiveManagement/action'

import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

import {
  ValidateInitialInvestment,
  ValidateMonthlyInvestment,
  ValidateNickname,
  ValidateTargetDate,
} from './validations'

import {
  GridRecommendation,
  SectionsRecommendation,
  CardWithCloseButton,
  CloseButton,
  CloseIcon,
  DivisorContainer,
  UnmetGoalCards,
  UnmetGoalCard,
  SimulateButton,
  ButtonSubmit,
  IconLoading,
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
  const themeContext = useContext(ThemeContext)
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()
  const {
    isLoadingManagement,
    objectiveManagementData,
    isLoadingBySimulate,
  } = useSelector(state => ({
    objectiveManagementData: state.objectiveManagement.data,
    isLoadingManagement: state.objectiveManagement.isLoading,
    isLoadingBySimulate: state.objective.isLoadingBySimulate,
  }))

  const [showUnmetGoalBanner, setShowUnmetGoalBanner] = useState(false)
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
      initial_value: formatMoneyDecimal(answer.initial_value * 100),
      monthly_value: formatMoneyDecimal(answer.monthly_value * 100),
      target_value: formatMoneyDecimal(answer.target_value * 100),
    })
  }, [answer])

  useEffect(() => {
    if (suggestion_goal) {
      setShowUnmetGoalBanner(true)
    } else {
      setShowUnmetGoalBanner(false)
    }
  }, [suggestion_goal])

  const MacroDivisor = () => (
    <DivisorContainer isMobile={isMobile}>
      <Divisor vertical={!isMobile} />
      <Text
        type="captionUppercase"
        color="gray4"
        css={`
          padding: 7px 0;
        `}
      >
        ou
      </Text>
      <Divisor vertical={!isMobile} />
    </DivisorContainer>
  )

  const footerDrawer = () => (
    <ButtonSubmit
      data-gtm-form="submit"
      data-gtm-name="confirmar e recalcular"
      onClick={() => submitToRecommendation()}
      disabled={
        invalidInput.nickname ||
        invalidInput.initial_value ||
        invalidInput.monthly_value ||
        invalidInput.target_date
      }
    >
      Confirmar e recalcular {isLoading && <IconLoading />}
    </ButtonSubmit>
  )

  const submitToRecommendation = () => {
    dispatch(
      PostObjectiveDataRequest({
        ...formData,
        initial_value: formatMoneyWithoutCurrencyFlag(formData.initial_value),
        monthly_value: formatMoneyWithoutCurrencyFlag(formData.monthly_value),
        target_value: formatMoneyWithoutCurrencyFlag(formData.target_value),
      })
    )
    setIsDrawerOpen(!isDrawerOpen)
  }

  const moneyMask = event => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    event.target.value = formatMoneyDecimal(strippedValue) // eslint-disable-line no-param-reassign
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

  const handleReloadRecommendations = suggestionValues => {
    dispatch(
      PostObjectiveDataRequestBySimulate({ ...suggestionValues }, isMobile)
    )
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
        <Drawer
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
                prefix="#"
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
                value={formatMoneyWithoutCurrencyFlag(formData.initial_value)}
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
                value={formatMoneyWithoutCurrencyFlag(formData.monthly_value)}
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
                value={formatMoneyWithoutCurrencyFlag(formData.target_value)}
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
        </Drawer>
        <Container>
          {showUnmetGoalBanner && suggestion_goal && (
            <CardWithCloseButton>
              <CloseButton
                data-gtm-subname="card condicoes insuficientes para alcançar seu objetivo"
                data-gtm-name="botao fechar"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                onClick={() => {
                  setShowUnmetGoalBanner(false)
                }}
              >
                <CloseIcon name="close" />
              </CloseButton>
              <Text type="heading3" textAlign={isMobile ? 'left' : 'center'}>
                Condições insuficientes para alcançar seu objetivo
              </Text>
              <Text
                textAlign={isMobile ? 'left' : 'center'}
                css={`
                  padding-top: 7px;
                `}
              >
                Simule novamente escolhendo uma das opções a seguir.
              </Text>
              <UnmetGoalCards>
                <UnmetGoalCard>
                  <Text
                    type="headline"
                    color="gray6"
                    css={`
                      padding-bottom: 7px;
                    `}
                  >
                    Altere o investimento mensal:
                  </Text>
                  <HorizontalList
                    size="small"
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Investimento inicial
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="gray6"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(answer.initial_value)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <HorizontalList
                    size="small"
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Investimento mensal
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="green3"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(suggestion_goal.suggestion_monthly_value)}
                      </Text>,
                      <Icon
                        name="check"
                        fill={themeContext.colors.green3}
                        width="24px"
                      />,
                    ]}
                  />
                  <HorizontalList
                    size="small"
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Data alvo
                      </Text>,
                    ]}
                    endItems={[
                      <Text color="gray6" textAlign="right">
                        {answer.target_date}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <HorizontalList
                    size="small"
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        meta financeira
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="gray6"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(answer.target_value)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <SimulateButton
                    data-gtm-subname="altere o investimento mensal"
                    data-gtm-name="simular"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    loading={isLoadingBySimulate}
                    loadingColor="white"
                    onClick={() => {
                      handleReloadRecommendations({
                        ...answer,
                        target_value: formatMoneyWithoutCurrencyFlag(
                          answer.target_value
                        ),
                        initial_value: formatMoneyWithoutCurrencyFlag(
                          answer.initial_value
                        ),
                        monthly_value: formatMoneyWithoutCurrencyFlag(
                          suggestion_goal.suggestion_monthly_value
                        ),
                      })
                    }}
                  >
                    simular
                  </SimulateButton>
                </UnmetGoalCard>
                <MacroDivisor />
                <UnmetGoalCard>
                  <Text
                    type="headline"
                    color="gray6"
                    css={`
                      padding-bottom: 7px;
                    `}
                  >
                    Altere a data alvo:
                  </Text>
                  <HorizontalList
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Investimento inicial
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="gray6"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(answer.initial_value)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <HorizontalList
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Investimento mensal
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="gray6"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(answer.monthly_value)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <HorizontalList
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        Data alvo
                      </Text>,
                    ]}
                    endItems={[
                      <Text color="green3" textAlign="right">
                        {suggestion_goal.suggestion_target_date}
                      </Text>,
                      <Icon
                        name="check"
                        fill={themeContext.colors.green3}
                        width="24px"
                      />,
                    ]}
                  />
                  <HorizontalList
                    noPadding
                    startItems={[
                      <Text type="captionUppercase" color="gray4">
                        meta financeira
                      </Text>,
                    ]}
                    endItems={[
                      <Text
                        truncate
                        color="gray6"
                        width="120px"
                        textAlign="right"
                      >
                        {formatMoney(answer.target_value)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <SimulateButton
                    data-gtm-subname="altere a data alvo"
                    data-gtm-name="simular"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    loading={isLoadingBySimulate}
                    loadingColor="white"
                    onClick={() => {
                      handleReloadRecommendations({
                        ...answer,
                        target_value: formatMoneyWithoutCurrencyFlag(
                          answer.target_value
                        ),
                        initial_value: formatMoneyWithoutCurrencyFlag(
                          answer.initial_value
                        ),
                        monthly_value: formatMoneyWithoutCurrencyFlag(
                          answer.monthly_value
                        ),
                        target_date: suggestion_goal.suggestion_target_date,
                      })
                    }}
                  >
                    simular
                  </SimulateButton>
                </UnmetGoalCard>
                <MacroDivisor isMobile={isMobile} />
                <UnmetGoalCard>
                  <Text type="headline" color="gray6">
                    Alterar os valores manualmente:
                  </Text>
                  <Text
                    color="gray5"
                    css={`
                      padding-top: 21px;
                    `}
                  >
                    Nesta opção, você indicará novas condições dentro do seu
                    objetivo. Lembre-se de que não é preciso mudar todos os
                    valores para atingi-lo.
                  </Text>
                  <SimulateButton
                    data-gtm-subname="alterar os valores manualmente"
                    data-gtm-name="alterar"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    outline
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    alterar
                  </SimulateButton>
                </UnmetGoalCard>
              </UnmetGoalCards>
            </CardWithCloseButton>
          )}
          <SectionOne answer={answer} combo={combo} income={income} />
          <SectionTwo
            combo={combo}
            funds={funds}
            creditProduct={credit_product}
          />
          <SectionThree additional={additional} />
        </Container>
      </SectionsRecommendation>

      <BottomBar
        answer={answer}
        isLoading={isLoading}
        id={data.id}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <UnsavedChangedPrompt
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
    id: PropTypes.string.isRequired,
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
