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
  const [showUnmetGoalBanner, setShowUnmetGoalBanner] = useState(false)

  useEffect(() => {
    if (suggestion_goal) {
      setShowUnmetGoalBanner(true)
    } else {
      setShowUnmetGoalBanner(false)
    }
  }, [suggestion_goal])

  return (
    <GridRecommendation>
      <TopBar
        answer={answer}
        nickname={answer.nickname}
        currentStep={totalSteps}
        numberSteps={totalSteps}
      />
      <SectionsRecommendation>
        <Container>
          {showUnmetGoalBanner && (
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
                      <Text color="green3">
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
                      <Text color="gray6">
                        {moment(answer.target_date).format('DD/MM/YYYY')}
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
                      <Text color="gray6">
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
                      <Text color="gray6">
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
                      <Text color="green3">
                        {moment(suggestion_goal.suggestion_target_date).format(
                          'DD/MM/YYYY'
                        )}
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
                  >
                    simular
                  </SimulateButton>
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
                  <SimulateButton
                    data-gtm-subname="alterar os valores manualmente"
                    data-gtm-name="alterar"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    outline
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

      <BottomBar answer={answer} isLoading={isLoading} id={data.id} />
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
    suggestion_goal: {},
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
