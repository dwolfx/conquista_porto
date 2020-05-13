import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Divisor from 'components/Divisor'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'

import { formatMoney, formatMoneyWithoutCurrencyFlag } from 'helpers'
import useMedia from 'hooks/useMedia'

import { PostObjectiveDataRequestBySimulate } from 'store/modules/Objective/action'

import * as s from './styles'

interface IState {}

interface IAnswer {
  initial_value: number
  target_date: string
  target_value: number
  monthly_value: number
}

interface ISuggestion {
  suggestion_monthly_value: number
  suggestion_target_date: string
}

interface IUnmetGoalCard {
  cardTitle: string
  monthlyValue: number
  targetDate: string
  buttonInfos: {
    title: string
    props: any
  }
}

interface IProps {
  answer: IAnswer
  suggestion_goal: ISuggestion | undefined
  toggleDrawer: () => void
}

const SuggestionBanner = ({
  suggestion_goal,
  answer,
  toggleDrawer,
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  const isMobile = useMedia('sm')
  const isTabletVertical = useMedia('md')
  const isTabletHorizontal = useMedia('lg')
  const dispatch = useDispatch()

  const [showUnmetGoalBanner, setShowUnmetGoalBanner] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const { isLoadingBySimulate, suitabilityData } = useSelector(
    (state: any) => ({
      isLoadingBySimulate: state.objective.isLoadingBySimulate,
      suitabilityData: state.suitability.data,
    })
  )

  useEffect(() => {
    if (suggestion_goal) {
      setShowUnmetGoalBanner(true)
    } else {
      setShowUnmetGoalBanner(false)
    }
  }, [suggestion_goal])

  const handleReloadRecommendations = (
    suggestionValues: IAnswer,
    activeBtn: string
  ) => {
    dispatch(
      PostObjectiveDataRequestBySimulate({
        data: {
          ...suggestionValues,
          profile: +suitabilityData.idperfilinvest,
        },
        isMobile,
      })
    )
    setActiveButton(activeBtn)
  }

  const MacroDivisor = () => (
    <s.DivisorContainer isMobile={isMobile || isTabletVertical}>
      <Divisor vertical={!isMobile && !isTabletVertical} customSize="100%" />
      <Text
        type="captionUppercase"
        color="gray4"
        css={`
          padding: 7px 0;
        `}
      >
        ou
      </Text>
      <Divisor vertical={!isMobile && !isTabletVertical} customSize="100%" />
    </s.DivisorContainer>
  )

  const UnmetGoalCard = ({
    cardTitle,
    monthlyValue,
    targetDate,
    buttonInfos,
  }: IUnmetGoalCard) => (
    <s.UnmetGoalCard>
      <Text
        type="headline"
        color="gray6"
        css={`
          margin-bottom: ${themeContext.spacing(1)}px;
        `}
      >
        {cardTitle}
      </Text>

      <HorizontalList
        size="medium"
        noPadding
        startItems={[
          <Text type="captionUppercase" color="gray4">
            {`${isTabletHorizontal ? 'Inv.' : 'Investimento'} inicial`}
          </Text>,
        ]}
        endItems={[
          <Text truncate color="gray6" textAlign="right">
            {formatMoney(answer.initial_value)}
          </Text>,
          <Icon name="check" fill="none" width="24px" />,
        ]}
      />
      <HorizontalList
        size="medium"
        noPadding
        startItems={[
          <Text type="captionUppercase" color="gray4">
            {`${isTabletHorizontal ? 'Inv.' : 'Investimento'} mensal`}
          </Text>,
        ]}
        endItems={[
          <Text
            truncate
            color={monthlyValue === answer.monthly_value ? 'gray6' : 'green3'}
            textAlign="right"
          >
            {formatMoney(monthlyValue)}
          </Text>,
          <Icon
            name="check"
            fill={
              monthlyValue === answer.monthly_value
                ? 'none'
                : themeContext.colors.green3
            }
            width="24px"
          />,
        ]}
      />
      <HorizontalList
        size="medium"
        noPadding
        startItems={[
          <Text type="captionUppercase" color="gray4">
            Data alvo
          </Text>,
        ]}
        endItems={[
          <Text
            color={targetDate === answer.target_date ? 'gray6' : 'green3'}
            textAlign="right"
          >
            {targetDate}
          </Text>,
          <Icon
            name="check"
            fill={
              targetDate === answer.target_date
                ? 'none'
                : themeContext.colors.green3
            }
            width="24px"
          />,
        ]}
      />
      <HorizontalList
        size="medium"
        noPadding
        startItems={[
          <Text type="captionUppercase" color="gray4">
            meta financeira
          </Text>,
        ]}
        endItems={[
          <Text truncate color="gray6" textAlign="right">
            {formatMoney(answer.target_value)}
          </Text>,
          <Icon name="check" fill="none" width="24px" />,
        ]}
      />

      <s.SimulateButton {...buttonInfos.props}>
        {buttonInfos.title}
      </s.SimulateButton>
    </s.UnmetGoalCard>
  )

  return showUnmetGoalBanner && suggestion_goal ? (
    <s.CardWithCloseButton>
      <s.CloseButton
        data-gtm-subname="card condicoes insuficientes para alcançar seu objetivo"
        data-gtm-name="botao fechar"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        onClick={() => {
          setShowUnmetGoalBanner(false)
        }}
      >
        <s.CloseIcon name="close" />
      </s.CloseButton>
      <s.SectionTitle type="heading4" textAlign={isMobile ? 'left' : 'center'}>
        Os valores e o prazo não alcançam a meta financeira que você quer
        atingir.
      </s.SectionTitle>

      <s.UnmetGoalCards>
        <UnmetGoalCard
          cardTitle="Você pode editar os dados preenchidos:"
          monthlyValue={answer.monthly_value}
          targetDate={answer.target_date}
          buttonInfos={{
            title: 'Editar objetivo',
            props: {
              'data-gtm-subname': 'editar valores da recomendação',
              'data-gtm-name': 'editar objetivo',
              'data-gtm-type': 'click',
              'data-gtm-clicktype': 'button',
              disabled: isLoadingBySimulate,
              outline: true,
              onClick: () => toggleDrawer(),
            },
          }}
        />

        {!isMobile && !isTabletVertical && <MacroDivisor />}

        <UnmetGoalCard
          cardTitle="Altere o investimento mensal:"
          monthlyValue={suggestion_goal.suggestion_monthly_value}
          targetDate={answer.target_date}
          buttonInfos={{
            title: 'Aceitar sugestão',
            props: {
              'data-gtm-subname': 'altere o investimento mensal',
              'data-gtm-name': 'aceitar sugestão',
              'data-gtm-type': 'click',
              'data-gtm-clicktype': 'button',
              loading:
                isLoadingBySimulate && activeButton === 'initialInvestment',
              loadingColor: 'white',
              disabled: isLoadingBySimulate,
              onClick: () => {
                handleReloadRecommendations(
                  {
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
                  },
                  'initialInvestment'
                )
              },
            },
          }}
        />

        <MacroDivisor />

        <UnmetGoalCard
          cardTitle="Altere a data alvo:"
          monthlyValue={answer.monthly_value}
          targetDate={suggestion_goal.suggestion_target_date}
          buttonInfos={{
            title: 'Aceitar sugestão',
            props: {
              'data-gtm-subname': 'altere a data alvo',
              'data-gtm-name': 'aceitar sugestão',
              'data-gtm-type': 'click',
              'data-gtm-clicktype': 'button',
              loading: isLoadingBySimulate && activeButton === 'finalDate',
              disabled: isLoadingBySimulate,
              loadingColor: 'white',
              onClick: () => {
                handleReloadRecommendations(
                  {
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
                  },
                  'finalDate'
                )
              },
            },
          }}
        />

        {(isMobile || isTabletVertical) && <MacroDivisor />}
      </s.UnmetGoalCards>
    </s.CardWithCloseButton>
  ) : null
}

export default SuggestionBanner
