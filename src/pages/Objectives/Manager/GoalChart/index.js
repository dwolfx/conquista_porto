import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import Text from 'components/Text'
import moment from 'moment'
import Popover from 'components/Popover'
import IconExporter from 'components/IconExporter'
import Loading from 'components/Loading'
import { formatMoney } from 'helpers'

import { LoadingStateContainer } from 'pages/Objectives/Manager/styles'

import {
  ChartContainer,
  ButtonContainer,
  PreviousButton,
  NextButton,
  Chart,
  ChartEvolutionWrapper,
  MonthsContainer,
  ChartItemContainer,
  StartOrEndIndicator,
  ChartItem,
  DepositTextValue,
} from './styles'

export default function GoalChart({ data, isLoading }) {
  const [indexSelectedYear, setIndexSelectedYear] = useState(null)
  useEffect(() => {
    setIndexSelectedYear(
      data && data.years
        ? data.years.findIndex(item => item.year === moment().year())
        : null
    )
  }, [data])

  function handleClickPrevButton() {
    if (indexSelectedYear === 0) {
      setIndexSelectedYear(data.years.length - 1)
    } else {
      setIndexSelectedYear(indexSelectedYear - 1)
    }
  }

  function handleClickNextButton() {
    if (indexSelectedYear === data.years.length - 1) {
      setIndexSelectedYear(0)
    } else {
      setIndexSelectedYear(indexSelectedYear + 1)
    }
  }

  function renderPopoverContent(info) {
    function isFutureDateBasedOnMonth(date) {
      return moment(date).isAfter(moment(), 'month')
    }

    const UNDER_GOAL = 'UNDER_GOAL'
    const ABOVE_GOAL = 'ABOVE_GOAL'

    let informationMessage

    if (info.deposit < info.expected_deposit) {
      informationMessage = UNDER_GOAL
    } else {
      informationMessage = ABOVE_GOAL
    }

    const formattedMonth =
      info.monthNumber < 10 ? `0${info.monthNumber}` : info.monthNumber
    const currentDate = `${info.year}-${formattedMonth}`

    let shouldDisplayMessageOnPopover

    if (data.conquered || informationMessage === UNDER_GOAL) {
      shouldDisplayMessageOnPopover = true
    }

    if (!data.conquered && isFutureDateBasedOnMonth(currentDate)) {
      shouldDisplayMessageOnPopover = false
    }

    return (
      <div>
        <div
          css={`
            display: ${shouldDisplayMessageOnPopover ? 'flex' : 'none'};
            margin-bottom: 14px;
          `}
        >
          <IconExporter
            name={
              informationMessage === UNDER_GOAL && !data.conquered
                ? 'alertrounded'
                : 'check'
            }
            color={
              informationMessage === UNDER_GOAL && !data.conquered
                ? 'magenta2'
                : 'blue4'
            }
            width="21px"
          />
          <Text
            color="gray5"
            css={`
              padding-left: 7px;
            `}
          >
            {data.conquered
              ? 'Parabéns! Você atingiu seu objetivo.'
              : 'Você está abaixo da meta deste mês.'}
          </Text>
        </div>
        <Text color="gray5">
          Saldo total: {formatMoney(info.total_balance)}
        </Text>
        {!isFutureDateBasedOnMonth(currentDate) && (
          <Text color="gray5">
            Saldo projetado: {formatMoney(info.projected_balance)}
          </Text>
        )}
        <Text color="gray5">
          Investimento mensal esperado: {formatMoney(info.expected_deposit)}
        </Text>
        {!isFutureDateBasedOnMonth(currentDate) && (
          <Text color="gray5">
            Investimento realizado:{' '}
            <DepositTextValue>{formatMoney(info.deposit)}</DepositTextValue>
          </Text>
        )}
      </div>
    )
  }

  function renderChartEvolutionMonths() {
    function calcHeight(monthNumber) {
      return monthNumber * 20
    }

    function calculateDepositPercentages(monthObject, monthNumber, year) {
      let depositPercentage = 0

      if (monthObject && monthObject.deposit === 0) {
        depositPercentage = 0
      } else {
        depositPercentage =
          monthObject &&
          Math.round((monthObject.deposit * 100) / monthObject.expected_deposit)
      }

      const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : monthNumber
      if (moment(`${year}-${formattedMonth}`).isBefore(moment(), 'month')) {
        // essa validação tem o intuito de identificar se estamos checando um mês passado,
        // para então pintá-lo com as duas cores, baseado nas porcentagens relacionadas ao depósito.
        return {
          deposited: depositPercentage > 100 ? 100 : depositPercentage,
          missingDeposit:
            100 - (depositPercentage > 100 ? 100 : depositPercentage),
        }
      }

      if (
        moment(`${year}-${formattedMonth}`).isSame(moment(), 'month')
        // essa verificação tem o intuito de identificar se estamos verificando o mês corrente,
        // para então pintá-lo apenas de azul
      ) {
        return {
          deposited: depositPercentage > 100 ? 100 : depositPercentage,
          missingDeposit: 0,
        }
      }

      // se for um mês futuro, deixaremos com background 'transparente' (gray)
      return {
        deposited: 0,
        missingDeposit: 0,
      }
    }

    if (indexSelectedYear !== null && indexSelectedYear >= 0) {
      const selectedYear = data.years[indexSelectedYear]
      return [...new Array(12)].map((_, index) => {
        const MONTH_NUMBER = index + 1
        const currMonthObject = selectedYear.month_map[MONTH_NUMBER]
        const HEIGHT_NON_VALID_MONTH = 7
        const calculatedHeight = currMonthObject
          ? calcHeight(MONTH_NUMBER)
          : HEIGHT_NON_VALID_MONTH
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
                content={() =>
                  renderPopoverContent({
                    ...currMonthObject,
                    monthNumber: MONTH_NUMBER,
                    year: selectedYear.year,
                    total_balance: data.total_balance,
                  })
                }
              >
                <ChartItem
                  height={calculatedHeight}
                  depositPercentage={deposit.deposited}
                  missingDepositPercentage={deposit.missingDeposit}
                />
              </Popover>
            ) : (
              <ChartItem
                height={calculatedHeight}
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

  if (isLoading) {
    return (
      <LoadingStateContainer>
        <Loading />
      </LoadingStateContainer>
    )
  }

  return (
    <>
      <div>
        <Text type="captionUppercase" color="gray6" textAlign="center">
          ano de visualização
        </Text>
        <Text type="heading3" textAlign="center">
          {indexSelectedYear !== null && data.years[indexSelectedYear].year}
        </Text>
      </div>
      <ChartContainer>
        <ButtonContainer>
          <PreviousButton
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="grafico"
            data-gtm-name="botao anterior"
            onClick={handleClickPrevButton}
          ></PreviousButton>
        </ButtonContainer>
        <Chart>
          <ChartEvolutionWrapper>
            {renderChartEvolutionMonths()}
          </ChartEvolutionWrapper>
          <MonthsContainer>
            <Text type="captionUppercase" color="gray6">
              Jan
            </Text>
            <Text type="captionUppercase" color="gray6">
              Fev
            </Text>
            <Text type="captionUppercase" color="gray6">
              Mar
            </Text>
            <Text type="captionUppercase" color="gray6">
              Abr
            </Text>
            <Text type="captionUppercase" color="gray6">
              Mai
            </Text>
            <Text type="captionUppercase" color="gray6">
              Jun
            </Text>
            <Text type="captionUppercase" color="gray6">
              Jul
            </Text>
            <Text type="captionUppercase" color="gray6">
              Ago
            </Text>
            <Text type="captionUppercase" color="gray6">
              Set
            </Text>
            <Text type="captionUppercase" color="gray6">
              Out
            </Text>
            <Text type="captionUppercase" color="gray6">
              Nov
            </Text>
            <Text type="captionUppercase" color="gray6">
              Dez
            </Text>
          </MonthsContainer>
        </Chart>
        <ButtonContainer>
          <NextButton
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="grafico"
            data-gtm-name="botao proximo"
            onClick={handleClickNextButton}
          ></NextButton>
        </ButtonContainer>
      </ChartContainer>
    </>
  )
}

GoalChart.propTypes = {
  data: PropTypes.shape({
    total_balance: PropTypes.number,
    years: PropTypes.arrayOf(
      PropTypes.shape({
        month_map: PropTypes.shape({}),
        year: PropTypes.number,
      })
    ),
    conquered: PropTypes.bool,
  }),
  isLoading: PropTypes.bool,
}

GoalChart.defaultProps = {
  data: {
    total_balance: 0,
    years: [],
    conquered: false,
  },
  isLoading: false,
}
