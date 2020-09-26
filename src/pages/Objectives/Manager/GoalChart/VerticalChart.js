import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import Card from 'components/Card'
import Text from 'components/Text'
import Loading from 'components/Loading'

import { LoadingStateContainer } from 'pages/Objectives/Manager/styles'

import ChartItems from './components/ChartItems'
import {
  ChartContainer,
  ChartEvolutionWrapper,
  MonthsContainer,
  CustomSelectDropdown,
  CustomDropdownWrapper,
} from './styles'

const currentYear = moment().year()

export default function VerticalChart({ data, isLoading, isMobile }) {
  const [indexSelectedYear, setIndexSelectedYear] = useState(null)
  const [selectedOptionValue, setSelectedOptionValue] = useState(currentYear)
  const [options, setOptions] = useState(null)

  useEffect(() => {
    if (!selectedOptionValue) {
      setSelectedOptionValue(moment().year())
    }
    if (!options) {
      setOptions(
        data && data.years
          ? data.years.map(item => ({
              name: `${item.year}`,
              value: item.year,
            }))
          : null
      )
    }
    setIndexSelectedYear(
      data && data.years
        ? data.years.findIndex(item => item.year === selectedOptionValue)
        : null
    )
  }, [data, selectedOptionValue, indexSelectedYear, options])

  if (isLoading) {
    return (
      <LoadingStateContainer>
        <Loading
          type="bar"
          legend="Buscando suas informações..."
          placement="top"
        />
      </LoadingStateContainer>
    )
  }

  return (
    <Card>
      <Text type="captionUppercase" color="gray6" textAlign="center">
        ano de visualização
      </Text>
      <CustomDropdownWrapper>
        {options && options.length ? (
          <CustomSelectDropdown
            options={options}
            currentValue={selectedOptionValue}
            onChange={setSelectedOptionValue}
          />
        ) : null}
      </CustomDropdownWrapper>

      <ChartContainer>
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
        <ChartEvolutionWrapper>
          <ChartItems
            data={data}
            indexSelectedYear={indexSelectedYear}
            vertical={isMobile}
          />
        </ChartEvolutionWrapper>
      </ChartContainer>
    </Card>
  )
}

VerticalChart.propTypes = {
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
  isMobile: PropTypes.bool,
}

VerticalChart.defaultProps = {
  data: {
    total_balance: 0,
    years: [],
    conquered: false,
  },
  isLoading: false,
  isMobile: true,
}
