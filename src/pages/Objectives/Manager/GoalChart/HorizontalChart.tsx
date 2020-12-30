import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Card from 'components/Card'
import Loading from 'components/Loading'
import Text from 'components/Text'

import { LoadingStateContainer } from 'pages/Objectives/Manager/styles'
import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

import ChartItems from './components/ChartItems'
import {
  ChartContainer,
  PreviousButton,
  NextButton,
  Chart,
  ChartEvolutionWrapper,
  MonthsContainer,
} from './styles'

interface IProps {
  data: IObjectManagement
  isLoading: boolean
}

export default function HorizontalChart({ data, isLoading }: IProps) {
  const [indexSelectedYear, setIndexSelectedYear] = useState<number | null>(
    null
  )
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
      setIndexSelectedYear(indexSelectedYear! - 1)
    }
  }

  function handleClickNextButton() {
    if (indexSelectedYear === data.years.length - 1) {
      setIndexSelectedYear(0)
    } else {
      setIndexSelectedYear(indexSelectedYear! + 1)
    }
  }

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

  return data && data.years ? (
    <Card>
      <div>
        <Text type="captionUppercase" color="gray6" textAlign="center">
          ano de visualização
        </Text>
        <Text type="heading3" textAlign="center">
          {indexSelectedYear !== null && data.years[indexSelectedYear].year}
        </Text>
      </div>
      <ChartContainer>
        {data.years.length > 1 && (
          <PreviousButton
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="grafico"
            data-gtm-name="botao anterior"
            onClick={handleClickPrevButton}
          ></PreviousButton>
        )}

        <Chart>
          <ChartEvolutionWrapper>
            <ChartItems data={data} indexSelectedYear={indexSelectedYear} />
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
        {data.years.length > 1 && (
          <NextButton
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="grafico"
            data-gtm-name="botao proximo"
            onClick={handleClickNextButton}
          ></NextButton>
        )}
      </ChartContainer>
    </Card>
  ) : null
}
