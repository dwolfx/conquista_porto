import React, { useEffect, useContext, useState, useCallback } from 'react'
import { ThemeContext, DefaultTheme } from 'styled-components'
import 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'

import PieChart from 'components/PieChart'
import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

import LoadingState from 'pages/Home/commons/LoadingState'
import ErrorState from 'pages/Home/commons/ErrorState'

import { GetConsolidatedPositionDataRequest } from 'store/modules/ConsolidatedPosition/action'
import { DisplayInformation } from 'store/modules/Investment/Position/action'
import { formatMoney } from 'helpers'
import {
  PieChartContainer,
  PieItemMargin,
  EmptyBody,
  ChartCard,
  HorizontalListPieChartTitle,
} from './styles'

type IStatePieChartMiddleContent = {
  id?: any
  label?: string
  value: number
  percent?: number
}

const validPieChartInfo = (info: IStatePieChartMiddleContent) =>
  info && info.id !== 'emptyvalue' && info.value && info.label

const validPieChartEmptyState = (info: IStatePieChartMiddleContent) =>
  info && info.id !== 'emptyvalue'

const ChartEmptyState = ({
  value,
  hide,
}: {
  value: string | number
  hide: boolean
}) => {
  return (
    <EmptyBody>
      <Text color="gray5" type="captionUppercase">
        Total bruto Investido
      </Text>
      <PieItemMargin>
        <Text
          color="black"
          type="heading4"
          css={`
            -webkit-text-security: ${hide ? 'disc' : 'none'};
          `}
          bold
        >
          {formatMoney(value)}
        </Text>
      </PieItemMargin>
    </EmptyBody>
  )
}

const ChartMiddleInfoContent = ({
  pieChartInfo,
  hide,
}: {
  pieChartInfo: IStatePieChartMiddleContent
  hide: boolean
}) => {
  return validPieChartInfo(pieChartInfo) ? (
    <EmptyBody>
      <Text
        type="heading4"
        color="black"
        bold
        css={`
          -webkit-text-security: ${hide ? 'disc' : 'none'};
        `}
      >{`${pieChartInfo.percent}%`}</Text>
      <PieItemMargin>
        <Text color="gray5" type="captionUppercase">
          {pieChartInfo.label}
        </Text>
      </PieItemMargin>
      <Text
        type="heading4"
        color="black"
        bold
        css={`
          -webkit-text-security: ${hide ? 'disc' : 'none'};
        `}
      >
        {formatMoney(pieChartInfo.value)}
      </Text>
    </EmptyBody>
  ) : (
    <ChartEmptyState
      value={validPieChartEmptyState(pieChartInfo) ? pieChartInfo.value : 0}
      hide={hide}
    />
  )
}

const ChartPosition: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const [pieChartInfo, setPieChartInfo] = useState<IStatePieChartMiddleContent>(
    {
      id: -1,
      label: '',
      value: 0,
      percent: 0,
    }
  )

  const { auth, consolidatedPosition, displayInformation } = useSelector(
    (state: any) => ({
      auth: state.auth,
      consolidatedPosition: state.consolidatedPosition,
      displayInformation: state.investmentPosition.displayInformation,
    })
  )
  const { data, isLoading, hasError } = consolidatedPosition

  const handleFetchInvestments = useCallback(() => {
    dispatch(GetConsolidatedPositionDataRequest(auth.cpf))
  }, [dispatch, auth.cpf])

  const settingPieChartInfo = useCallback(
    (payload: IStatePieChartMiddleContent) => {
      setPieChartInfo(
        payload || {
          value:
            consolidatedPosition.data && consolidatedPosition.data.saldototal,
          percent: 0,
        }
      )
    },
    [consolidatedPosition.data]
  )

  useEffect(() => {
    handleFetchInvestments()
  }, [handleFetchInvestments])

  useEffect(() => {
    if (consolidatedPosition.data) {
      settingPieChartInfo({ value: consolidatedPosition.data.saldototal })
    }
  }, [consolidatedPosition.data, settingPieChartInfo])

  const graphValuesGenerator = (data: any, theme: DefaultTheme) => {
    const colorsPriority = [
      theme.colors.magenta2,
      theme.colors.blue4,
      theme.colors.yellow2,
      theme.colors.green3,
      theme.colors.darkBlue2,
    ]

    let result = []

    if (data && data.saldototal && data.categorias) {
      result = data.categorias.sort((a: any, b: any) => b.valor - a.valor)
      result = result.map((item: any, index: number) => ({
        id: `${index}`,
        label: item.nome,
        value: item.valor,
        color: colorsPriority[index],
        percent: ((item.valor / data.saldototal) * 100).toFixed(2),
      }))
    }

    return result
  }

  function renderChartPositionCardContent() {
    if (isLoading && !(data && Object.entries(data).length)) {
      return <LoadingState />
    }
    if (hasError && !(data && Object.entries(data).length)) {
      return <ErrorState onRetry={handleFetchInvestments} />
    }

    return (
      <>
        <HorizontalListPieChartTitle
          startItems={[
            <Text type="captionUppercase" color="gray5">
              Distribuição dos investimentos
            </Text>,
          ]}
          endItems={[
            <IconExporter
              color="blue4"
              name={displayInformation ? 'eyeopen' : 'eyeclosed'}
              width="21px"
              onClick={() => dispatch(DisplayInformation(!displayInformation))}
              css={`
                cursor: pointer;
              `}
            />,
          ]}
        />
        <PieChartContainer>
          <PieChart
            width="100%"
            height="100%"
            marginLegend={30}
            margin={{ bottom: 40 }}
            data={graphValuesGenerator(consolidatedPosition.data, theme)}
            onMouseEnter={settingPieChartInfo}
            onSliceClick={settingPieChartInfo}
            onMouseLeave={settingPieChartInfo}
            middleContentCSS={`
              top: 42%;
            `}
          >
            <ChartMiddleInfoContent
              pieChartInfo={pieChartInfo}
              hide={displayInformation}
            />
          </PieChart>
        </PieChartContainer>
      </>
    )
  }

  return <ChartCard>{renderChartPositionCardContent()}</ChartCard>
}

export default ChartPosition
