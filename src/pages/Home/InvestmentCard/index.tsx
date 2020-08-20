import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { useSelector } from 'react-redux'

import { DefaultTheme } from 'styled-components/macro'
import InvestmentEmptyStateCard from './InvestmentEmptyStateCard'
import InvestmentErrorStateCard from './InvestmentErrorStateCard'
import InvestmentLoadingStateCard from './InvestmentLoadingStateCard'
import ModalAccountPortoInfo from './ModalAccountPortoInfo/ModalAccountPortoInfo'
import ChartMiddleInfoContent from '../ChartMiddleInfoContent'
import PieChart from 'components/PieChart'
import Popover from 'components/Popover/index'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import * as t from './types'
import * as s from './styles'

import { formatMoney } from 'helpers'

const graphValuesGenerator = (
  data: t.IDataConsolidatedPosition,
  theme: DefaultTheme
) => {
  const colorsPriority = [
    theme.colors.magenta2,
    theme.colors.blue4,
    theme.colors.yellow2,
    theme.colors.green3,
    theme.colors.darkBlue2,
  ]

  let result: t.IGraphValuesResult[]

  if (data.saldototal && data.categorias) {
    const sortedResult = data.categorias.sort((a, b) => b.valor - a.valor)
    result = sortedResult.map((item, index) => ({
      id: `${index}`,
      label: item.nome,
      value: item.valor,
      color: colorsPriority[index],
      percent: ((item.valor / data.saldototal) * 100).toFixed(2),
    }))
    return result
  }
  return []
}

export const InvestmentCard: React.FC<t.IInvestmentCard> = ({
  onFetchInvestments,
  headerEndItem,
  ...rest
}) => {
  const history = useHistory()
  const theme = useContext(ThemeContext)

  const { data, isLoading, hasError } = useSelector(
    (state: t.IConsolidatedPositionState) => state.consolidatedPosition
  )
  const { bankData } = useSelector((state: t.IBankDataState) => ({
    bankData: state.bankData.data,
  }))

  const { suitabilityInfo } = useSelector((state: t.ISuitabilityInfoState) => ({
    suitabilityInfo: state.suitabilityInfo.data,
  }))

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pieChartInfo, setPieChartInfo] = useState<t.IPieChartInfoState>({
    id: -1,
    label: '',
    value: 0,
    percent: 0,
  })

  useEffect(() => {
    setPieChartInfo({
      value: (data && data.saldototal) || 0,
      percent: 0,
    })
  }, [data])

  function settingPieChartInfo(payload: t.IPieChartInfoState) {
    setPieChartInfo(
      payload || {
        value: (data && data.saldototal) || 0,
        percent: 0,
      }
    )
  }

  const renderInvestimentCardContent = () => {
    if (isLoading && !(data && Object.entries(data).length)) {
      return <InvestmentLoadingStateCard {...rest} />
    }
    if (hasError && !(data && Object.entries(data).length)) {
      return <InvestmentErrorStateCard onRetry={onFetchInvestments} {...rest} />
    }
    if (data && suitabilityInfo && suitabilityInfo.status_cotista) {
      const arrayContent = [
        <s.Content>
          <HorizontalList
            startItems={[
              <Text type="headline">
                Total bruto investido{' '}
                <Popover
                  tooltip
                  content={() => (
                    <Text type="body" color="white">
                      É a soma de todos os valores, incluindo o saldo em conta e
                      o rendimento das aplicações.
                    </Text>
                  )}
                >
                  <Icon
                    name="information"
                    role="button"
                    aria-label="header-icon"
                    fill={theme.colors.blue4}
                    width={21}
                  />
                </Popover>
              </Text>,
            ]}
            endItems={[
              <Text type="headline" bold>
                {formatMoney(
                  bankData && bankData.DadosContaPortoSeguro
                    ? bankData.DadosContaPortoSeguro.saldo_disponivel
                    : 0
                )}
              </Text>,
            ]}
          />

          <HorizontalList
            startItems={[
              <Text type="headline">
                Saldo em conta{' '}
                <Popover
                  tooltip
                  content={() => (
                    <Text type="body" color="white">
                      Recurso disponível para você investir ou transferir para o
                      seu banco.
                    </Text>
                  )}
                >
                  <Icon
                    name="information"
                    role="button"
                    aria-label="header-icon"
                    fill={theme.colors.blue4}
                    width={21}
                  />
                </Popover>
              </Text>,
            ]}
            endItems={[
              <Text type="headline" bold>
                {formatMoney(
                  bankData && bankData.DadosContaPortoSeguro
                    ? bankData.DadosContaPortoSeguro.saldo_liquidar
                    : 0
                )}
              </Text>,
            ]}
          />

          <s.Footer>
            <s.Button
              outline
              onClick={() => setIsModalOpen(!isModalOpen)}
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="Conta de investimento"
              data-gtm-name="botao conta de investimento"
            >
              Conta de investimento
            </s.Button>
            <s.Button
              outline
              onClick={() => history.push('/investimentos/lista-fundos')}
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="Lista de fundos"
              data-gtm-name="botao lista de fundos"
            >
              Lista de fundos
            </s.Button>
            <s.Button
              outline
              onClick={() => history.push('/investimentos/visualizar')}
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="Gerenciar"
              data-gtm-name="botao gerenciar"
            >
              Gerenciar
            </s.Button>
          </s.Footer>
        </s.Content>,
        <s.PieChartContainer>
          <PieChart
            width="100%"
            height="100%"
            data={graphValuesGenerator(data, theme)}
            onMouseEnter={() => settingPieChartInfo}
            onSliceClick={() => settingPieChartInfo}
            onMouseLeave={() => settingPieChartInfo}
          >
            <ChartMiddleInfoContent pieChartInfo={pieChartInfo} />
          </PieChart>
        </s.PieChartContainer>,
      ]
      return (
        <>
          <ModalAccountPortoInfo
            isOpen={isModalOpen}
            onChangeModalOpen={setIsModalOpen}
            bankData={bankData}
          />
          <s.CarouselCard
            headerIcon="financial"
            headerTitle="Investimentos"
            headerEndItem={headerEndItem}
            arrayContent={arrayContent}
            {...rest}
          />
        </>
      )
    }
    return <InvestmentEmptyStateCard {...rest} />
  }

  return renderInvestimentCardContent()
}

export default InvestmentCard
