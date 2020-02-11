import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import { ThemeContext } from 'styled-components'
import PropTypes from 'prop-types'
import { Container } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import { formatMoney } from 'helpers'

import Text from 'components/Text'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import TopBar from 'pages/Objectives/GoalStreams/Components/TopBar'

import BottomBar from './BottomBar'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'

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
} from './styles'

const MacroDivisor = () => (
  <DivisorContainer>
    <Divisor vertical />
    <Text
      type="captionUppercase"
      color="gray4"
      css={`
        padding: 7px 0;
      `}
    >
      ou
    </Text>
    <Divisor vertical />
  </DivisorContainer>
)

const Recommendation = ({ data = {}, isLoading, totalSteps }) => {
  const { goal, combo, income, funds, creditProduct, additional } = data
  const themeContext = useContext(ThemeContext)
  const [showUnmetGoalBanner, setShowUnmetGoalBanner] = useState(false)

  useEffect(() => {
    if (goal.suggestionGoal) {
      setShowUnmetGoalBanner(true)
    } else {
      setShowUnmetGoalBanner(false)
    }
  }, [goal.suggestionGoal])

  return (
    <GridRecommendation>
      <TopBar
        goal={goal}
        nickname={goal.nickname}
        currentStep={totalSteps}
        numberSteps={totalSteps}
      />
      <SectionsRecommendation>
        <Container>
          {showUnmetGoalBanner && (
            <CardWithCloseButton>
              <CloseButton
                onClick={() => {
                  setShowUnmetGoalBanner(false)
                }}
              >
                <CloseIcon name="close" />
              </CloseButton>
              <Text type="heading3" textAlign="center">
                Condições insuficientes para alcançar seu objetivo
              </Text>
              <Text
                textAlign="center"
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
                      <Text color="gray6">
                        {formatMoney(goal.initialValue)}
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
                      <Text color="green3">
                        {formatMoney(goal.suggestionGoal.suggestionTargetValue)}
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
                      <Text color="gray6">
                        {moment(goal.targetDate).format('DD/MM/YYYY')}
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
                      <Text color="gray6">
                        {formatMoney(goal.targetValue)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <SimulateButton>simular</SimulateButton>
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
                      <Text color="gray6">
                        {formatMoney(goal.initialValue)}
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
                      <Text color="gray6">
                        {formatMoney(goal.monthlyValue)}
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
                      <Text color="green3">
                        {moment(
                          goal.suggestionGoal.suggestionTargetDate
                        ).format('DD/MM/YYYY')}
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
                      <Text color="gray6">
                        {formatMoney(goal.targetValue)}
                      </Text>,
                      <Icon name="check" fill="none" width="24px" />,
                    ]}
                  />
                  <SimulateButton>simular</SimulateButton>
                </UnmetGoalCard>
                <MacroDivisor />
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
                  <SimulateButton outline>alterar</SimulateButton>
                </UnmetGoalCard>
              </UnmetGoalCards>
            </CardWithCloseButton>
          )}
          <SectionOne goal={goal} combo={combo} income={income} />
          <SectionTwo
            combo={combo}
            funds={funds}
            creditProduct={creditProduct}
          />
          <SectionThree additional={additional} />
        </Container>
      </SectionsRecommendation>

      <BottomBar goal={goal} isLoading={isLoading} />
    </GridRecommendation>
  )
}

Recommendation.defaultProps = {
  data: {
    goal: {
      suggestionGoal: false,
      targetDate: '',
      targetValue: 0,
      initialValue: 0,
      monthlyValue: 0,
      nickname: '',
    },
    combo: [],
    income: {},
    funds: [],
    creditProduct: {},
    additional: {},
  },
}

Recommendation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    goal: PropTypes.shape({
      suggestionGoal: PropTypes.bool,
      targetDate: PropTypes.string,
      targetValue: PropTypes.number,
      initialValue: PropTypes.number,
      monthlyValue: PropTypes.number,
      nickname: PropTypes.string,
    }),
    combo: PropTypes.array,
    income: PropTypes.object,
    funds: PropTypes.array,
    creditProduct: PropTypes.object,
    additional: PropTypes.object,
  }),
  totalSteps: PropTypes.number.isRequired,
}

export default Recommendation
