import React from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import PropTypes from 'prop-types'

import ButtonLink from 'components/Button/Link'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

import { calcBarSize, calculateDepositPercentages } from '../helper'
import ChartPopoverContent from './ChartPopoverContent'
import {
  StartOrEndIndicator,
  ChartItemContainer,
  ChartItem,
  IdealMomentLabel,
} from '../styles'

type TMonthsInNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface IProps {
  indexSelectedYear: number | null
  data: IObjectManagement
  vertical: boolean
}

export default function ChartItems({
  indexSelectedYear,
  data,
  vertical,
}: IProps) {
  const history = useHistory()

  const idealMoment =
    data.credit_product &&
    data.credit_product.name === 'Financiamento de Veículo'

  if (indexSelectedYear !== null && indexSelectedYear >= 0) {
    const selectedYear = data.years[indexSelectedYear]

    return (
      <>
        {[...new Array(12)].map((_, index) => {
          const MONTH_NUMBER = index + 1
          const currMonthObject =
            selectedYear.month_map[MONTH_NUMBER as TMonthsInNumbers]
          const SIZE_NON_VALID_MONTH = 7
          const calculatedSize = currMonthObject
            ? calcBarSize(MONTH_NUMBER, vertical)
            : SIZE_NON_VALID_MONTH
          const deposit = calculateDepositPercentages(
            currMonthObject,
            MONTH_NUMBER,
            selectedYear.year
          )

          const [monthGoalBegins] = Object.entries(data.years[0].month_map)[0]
          const dateGoalBegins = `${monthGoalBegins}-${data.years[0].year}`

          const endYear = data.years[data.years.length - 1]
          const [endMonth] = Object.entries(
            data.years[data.years.length - 1].month_map
          ).reverse()[0]
          const dateGoalEnd = `${endMonth}-${endYear.year}`

          const startOrEndIndicator = {
            isBegin: dateGoalBegins === `${MONTH_NUMBER}-${selectedYear.year}`,
            isEnd: dateGoalEnd === `${MONTH_NUMBER}-${selectedYear.year}`,
          }

          let startOrEndIndicatorText: string = ''

          if (startOrEndIndicator.isEnd) {
            startOrEndIndicatorText = 'término'
          }
          if (startOrEndIndicator.isBegin) {
            startOrEndIndicatorText = 'início'
          }

          return (
            <ChartItemContainer key={`${selectedYear.year}-${MONTH_NUMBER}`}>
              <StartOrEndIndicator
                content={startOrEndIndicatorText}
                css={`
                  display: ${startOrEndIndicator.isBegin ||
                  startOrEndIndicator.isEnd
                    ? 'block'
                    : 'none'};
                `}
              />
              {startOrEndIndicator.isEnd && idealMoment && (
                <IdealMomentLabel>
                  <Text
                    type="captionUppercase"
                    color="gray6"
                    textAlign="center"
                  >
                    Momento ideal para contratar seu
                    <ButtonLink
                      data-gtm-subname="card investimentos saldo disponivel"
                      data-gtm-name="financiamento-de-veiculo"
                      data-gtm-type="click"
                      data-gtm-clicktype="link"
                      onClick={() => history.push('/financiamento-veiculo')}
                      noIcon
                      css={`
                        margin-left: 7px;
                      `}
                    >
                      Financiamento de Veículo
                    </ButtonLink>
                  </Text>
                </IdealMomentLabel>
              )}
              {currMonthObject ? (
                <Popover
                  content={() => (
                    <ChartPopoverContent
                      info={{
                        ...currMonthObject,
                        monthNumber: +MONTH_NUMBER,
                        year: selectedYear.year,
                        total_balance: data.total_balance,
                      }}
                      data={data}
                    />
                  )}
                >
                  <ChartItem
                    height={vertical ? 28 : calculatedSize}
                    width={vertical ? calculatedSize : 57}
                    depositPercentage={deposit.deposited}
                    missingDepositPercentage={deposit.missingDeposit}
                  />
                </Popover>
              ) : (
                <ChartItem
                  height={vertical ? 28 : calculatedSize}
                  width={vertical ? calculatedSize : 57}
                  depositPercentage={deposit.deposited}
                  missingDepositPercentage={deposit.missingDeposit}
                />
              )}
            </ChartItemContainer>
          )
        })}
      </>
    )
  }

  return <></>
}

ChartItems.propTypes = {
  data: PropTypes.object.isRequired,
  indexSelectedYear: PropTypes.number,
  vertical: PropTypes.bool,
}

ChartItems.defaultProps = {
  vertical: false,
  indexSelectedYear: 0,
}
