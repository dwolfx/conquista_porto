import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Card from 'components/Card'
import Text from 'components/Text'
import Loading from 'components/Loading'

import { LoadingStateContainer } from 'pages/Objectives/Manager/styles'
import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

import ChartItems from './components/ChartItems'
import {
  ChartContainer,
  ChartEvolutionWrapper,
  MonthsContainer,
  CustomSelectDropdown,
  CustomDropdownWrapper,
} from './styles'

const currentYear = moment().year()

interface IProps {
  data: IObjectManagement
  isLoading: boolean
  isMobile: boolean
}

export default function VerticalChart({
  data,
  isLoading,
  isMobile = true,
}: IProps) {
  const [indexSelectedYear, setIndexSelectedYear] = useState<number | null>(
    null
  )
  const [selectedOptionValue, setSelectedOptionValue] = useState(currentYear)
  const [options, setOptions] = useState<
    | {
        name: string
        value: number
      }[]
    | null
  >(null)

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
