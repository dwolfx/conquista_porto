import React from 'react'
import 'styled-components/macro'

import PropTypes from 'prop-types'

import Popover from 'components/Popover'
import { calcBarSize, calculateDepositPercentages } from '../helper'
import { StartOrEndIndicator, ChartItemContainer, ChartItem } from '../styles'
import ChartPopoverContent from './ChartPopoverContent'

export default function ChartItems({ indexSelectedYear, data, vertical }) {
  if (indexSelectedYear !== null && indexSelectedYear >= 0) {
    const selectedYear = data.years[indexSelectedYear]

    return [...new Array(12)].map((_, index) => {
      const MONTH_NUMBER = index + 1
      const currMonthObject = selectedYear.month_map[MONTH_NUMBER]
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

      let startOrEndIndicatorText

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
          {currMonthObject ? (
            <Popover
              content={() => (
                <ChartPopoverContent
                  info={{
                    ...currMonthObject,
                    monthNumber: MONTH_NUMBER,
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
    })
  }
  return null
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
