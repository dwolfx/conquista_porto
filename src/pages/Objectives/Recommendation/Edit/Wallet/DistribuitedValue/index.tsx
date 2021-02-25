import React from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import { Currency } from 'helpers/money'

import { IState } from '../types'
import { IDistribuitedProps } from './types'
import * as s from './styles'

export default function DistribuitedValues({
  initialDistribuition,
  monthlyDistribuition,
  isMobile,
}: IDistribuitedProps) {
  const { recommendationData } = useSelector((state: IState) => ({
    recommendationData: state.objective.data,
  }))

  const textColorInitialDistribuition =
    recommendationData.answer.initial_value - initialDistribuition === 0
      ? 'gray6'
      : 'magenta2'
  const textColorMonthlyDistribuition =
    recommendationData.answer.monthly_value - monthlyDistribuition === 0
      ? 'gray6'
      : 'magenta2'

  const renderSign = (value: number) => {
    if (!value) {
      return ''
    }

    return value > 0 ? '+' : '-'
  }

  if (isMobile) {
    return (
      <s.MobileTotalAmountDistributedCard>
        <s.MobileTotalAmountDistributed>
          <s.MobileAmountWrapper>
            <Text type="headline" bold color="gray6">
              Investimento Inicial
            </Text>
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  Total
                </Text>,
              ]}
              endItems={[
                <Text type="caption" color="gray6" bold>
                  {Currency.parse(initialDistribuition, true)}
                </Text>,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  Planejado
                </Text>,
              ]}
              endItems={[
                <Text type="caption" color="gray6" bold>
                  {Currency.parse(
                    recommendationData.answer.initial_value,
                    true
                  )}
                </Text>,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  A Distribuir
                </Text>,
              ]}
              endItems={[
                <s.ToDistributeWrapper>
                  <Text
                    type="caption"
                    color={textColorInitialDistribuition}
                    bold
                    css={`
                      width: 7px;
                    `}
                  >
                    {renderSign(
                      recommendationData.answer.initial_value -
                        initialDistribuition
                    )}
                  </Text>
                  <Text
                    type="caption"
                    color={textColorInitialDistribuition}
                    bold
                  >
                    {Currency.parse(
                      Math.abs(
                        recommendationData.answer.initial_value -
                          initialDistribuition
                      ),
                      true
                    )}
                  </Text>
                </s.ToDistributeWrapper>,
              ]}
            />
          </s.MobileAmountWrapper>
          <s.MobileAmountWrapper>
            <Text type="headline" bold color="gray6">
              Investimento Mensal
            </Text>
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  Total
                </Text>,
              ]}
              endItems={[
                <Text type="caption" color="gray6" bold>
                  {Currency.parse(monthlyDistribuition, true)}
                </Text>,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  Planejado
                </Text>,
              ]}
              endItems={[
                <Text type="caption" color="gray6" bold>
                  {Currency.parse(
                    recommendationData.answer.monthly_value,
                    true
                  )}
                </Text>,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[
                <Text type="captionUppercase" bold color="gray5">
                  A Distribuir
                </Text>,
              ]}
              endItems={[
                <s.ToDistributeWrapper>
                  <Text
                    type="caption"
                    color={textColorMonthlyDistribuition}
                    bold
                    css={`
                      width: 7px;
                    `}
                  >
                    {renderSign(
                      recommendationData.answer.monthly_value -
                        monthlyDistribuition
                    )}
                  </Text>
                  <Text
                    type="caption"
                    color={textColorMonthlyDistribuition}
                    bold
                  >
                    {Currency.parse(
                      Math.abs(
                        recommendationData.answer.monthly_value -
                          monthlyDistribuition
                      ),
                      true
                    )}
                  </Text>
                </s.ToDistributeWrapper>,
              ]}
            />
          </s.MobileAmountWrapper>
        </s.MobileTotalAmountDistributed>
      </s.MobileTotalAmountDistributedCard>
    )
  }

  return (
    <>
      <s.TotalAmountDistributed>
        <s.LabelWrapper>
          <Text type="captionUppercase" color="gray5" bold>
            Total Distribuído
          </Text>
          <s.Text type="captionUppercase" color="gray5" bold>
            Planejado
          </s.Text>
          <Text type="captionUppercase" color="gray5" bold>
            A Distribuir
          </Text>
        </s.LabelWrapper>
        <s.InitialAmountWrapper>
          <Text type="caption" color="gray6" bold>
            {Currency.parse(initialDistribuition, true)}
          </Text>
          <s.Text type="caption" color="gray6" bold>
            {Currency.parse(recommendationData.answer.initial_value, true)}
          </s.Text>
          <s.ToDistributeWrapper>
            <Text
              type="caption"
              color={textColorInitialDistribuition}
              bold
              css={`
                width: 7px;
              `}
            >
              {renderSign(
                recommendationData.answer.initial_value - initialDistribuition
              )}
            </Text>
            <Text type="caption" color={textColorInitialDistribuition} bold>
              {Currency.parse(
                Math.abs(
                  recommendationData.answer.initial_value - initialDistribuition
                ),
                true
              )}
            </Text>
          </s.ToDistributeWrapper>
        </s.InitialAmountWrapper>
        <s.MonthlyAmountWrapper>
          <Text type="caption" color="gray6" bold>
            {Currency.parse(monthlyDistribuition, true)}
          </Text>
          <s.Text type="caption" color="gray6" bold>
            {Currency.parse(recommendationData.answer.monthly_value, true)}
          </s.Text>
          <s.ToDistributeWrapper>
            <Text
              type="caption"
              color={textColorMonthlyDistribuition}
              bold
              css={`
                width: 7px;
              `}
            >
              {renderSign(
                recommendationData.answer.monthly_value - monthlyDistribuition
              )}
            </Text>
            <Text type="caption" color={textColorMonthlyDistribuition} bold>
              {Currency.parse(
                Math.abs(
                  recommendationData.answer.monthly_value - monthlyDistribuition
                ),
                true
              )}
            </Text>
          </s.ToDistributeWrapper>
        </s.MonthlyAmountWrapper>
      </s.TotalAmountDistributed>
    </>
  )
}
