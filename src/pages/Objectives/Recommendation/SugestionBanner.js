import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import PropTypes from 'prop-types'

import Divisor from 'components/Divisor'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'

import { formatMoney, formatMoneyWithoutCurrencyFlag } from 'helpers'
import useMedia from 'hooks/useMedia'

import { PostObjectiveDataRequestBySimulate } from 'store/modules/Objective/action'

import {
  CardWithCloseButton,
  CloseButton,
  CloseIcon,
  UnmetGoalCards,
  UnmetGoalCard,
  SimulateButton,
  DivisorContainer,
} from './styles'

const SuggestionBanner = ({ suggestion_goal, answer, toggleDrawer }) => {
  const themeContext = useContext(ThemeContext)
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()

  const [showUnmetGoalBanner, setShowUnmetGoalBanner] = useState(false)
  const [activeButton, setActiveButton] = useState(null)

  const { isLoadingBySimulate, suitabilityData } = useSelector(state => ({
    isLoadingBySimulate: state.objective.isLoadingBySimulate,
    suitabilityData: state.suitability.data,
  }))

  useEffect(() => {
    if (suggestion_goal) {
      setShowUnmetGoalBanner(true)
    } else {
      setShowUnmetGoalBanner(false)
    }
  }, [suggestion_goal])

  const handleReloadRecommendations = (suggestionValues, activeBtn) => {
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

  return showUnmetGoalBanner && suggestion_goal ? (
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
        Os valores e o prazo não alcançam a meta financeira que você quer
        atingir.
      </Text>

      <UnmetGoalCards>
        <UnmetGoalCard>
          <Text type="headline" color="gray6">
            Você pode editar os dados preenchidos:
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
              <Text truncate color="gray6" width="120px" textAlign="right">
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
              <Text truncate color="gray6" width="120px" textAlign="right">
                {formatMoney(answer.monthly_value)}
              </Text>,
              <Icon name="check" fill="none" width="24px" />,
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
              <Text truncate color="gray6" width="120px" textAlign="right">
                {formatMoney(answer.target_value)}
              </Text>,
              <Icon name="check" fill="none" width="24px" />,
            ]}
          />

          <SimulateButton
            data-gtm-subname="editar valores da recomendação"
            data-gtm-name="editar objetivo"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            disabled={isLoadingBySimulate}
            outline
            onClick={() => toggleDrawer()}
          >
            Editar objetivo
          </SimulateButton>
        </UnmetGoalCard>

        <MacroDivisor isMobile={isMobile} />

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
              <Text truncate color="gray6" width="120px" textAlign="right">
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
              <Text truncate color="green3" width="120px" textAlign="right">
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
              <Text truncate color="gray6" width="120px" textAlign="right">
                {formatMoney(answer.target_value)}
              </Text>,
              <Icon name="check" fill="none" width="24px" />,
            ]}
          />
          <SimulateButton
            data-gtm-subname="altere o investimento mensal"
            data-gtm-name="aceitar sugestão"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            loading={
              isLoadingBySimulate && activeButton === 'initialInvestment'
            }
            loadingColor="white"
            disabled={isLoadingBySimulate}
            onClick={() => {
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
            }}
          >
            Aceitar sugestão
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
              <Text truncate color="gray6" width="120px" textAlign="right">
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
              <Text truncate color="gray6" width="120px" textAlign="right">
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
              <Text truncate color="gray6" width="120px" textAlign="right">
                {formatMoney(answer.target_value)}
              </Text>,
              <Icon name="check" fill="none" width="24px" />,
            ]}
          />
          <SimulateButton
            data-gtm-subname="altere a data alvo"
            data-gtm-name="aceitar sugestão"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            loading={isLoadingBySimulate && activeButton === 'finalDate'}
            disabled={isLoadingBySimulate}
            loadingColor="white"
            onClick={() => {
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
            }}
          >
            Aceitar sugestão
          </SimulateButton>
        </UnmetGoalCard>
      </UnmetGoalCards>
    </CardWithCloseButton>
  ) : null
}

SuggestionBanner.propTypes = {
  answer: PropTypes.shape({
    initial_value: PropTypes.number,
    target_date: PropTypes.string,
    target_value: PropTypes.number,
    monthly_value: PropTypes.number,
  }).isRequired,
  suggestion_goal: PropTypes.shape({
    suggestion_monthly_value: PropTypes.number,
    suggestion_target_date: PropTypes.string,
  }),
  toggleDrawer: PropTypes.func,
}

SuggestionBanner.defaultProps = {
  suggestion_goal: undefined,
  toggleDrawer: () => null,
}

// interface IAnswer {
//   initial_value: number;
//   target_date: string;
//   target_value: number;
//   monthly_value: number;
// }

// interface ISuggestion {
//   suggestion_monthly_value: number;
//   suggestion_target_date: string;
// }

// interface IProps {
//   answer: IAnswer;
//   suggestion_goal: ISuggestion | undefined;
//   toggleDrawer: () => void;
// }

export default SuggestionBanner
