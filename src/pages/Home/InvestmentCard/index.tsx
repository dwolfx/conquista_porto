import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import { DefaultTheme } from 'styled-components/macro'
import InvestmentEmptyStateCard from './InvestmentEmptyStateCard'
import InvestmentErrorStateCard from './InvestmentErrorStateCard'
import InvestmentLoadingStateCard from './InvestmentLoadingStateCard'
import ModalAccountPortoInfo from './ModalAccountPortoInfo/ModalAccountPortoInfo'
import ChartMiddleInfoContent from './ChartMiddleInfoContent'
import PieChart from 'components/PieChart'
import Popover from 'components/Popover/index'
import Icon from 'components/IconExporter'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import VerticalList from 'components/VerticalList'

import * as t from './types'
import * as s from './styles'

import useMedia from 'hooks/useMedia'
import { formatMoney } from 'helpers'

export const InvestmentCard: React.FC<t.IInvestmentCard> = ({
  onFetchInvestments,
  headerEndItem,
  ...rest
}) => {
  const isNotMobile = useMedia('smUp')
  const history = useHistory()
  const theme = useContext(ThemeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pieChartInfo, setPieChartInfo] = useState<t.IPieChartInfoState>({
    id: -1,
    label: '',
    value: 0,
    percent: 0,
  })

  const { data: consolidatedPosition, isLoading, hasError } = useSelector(
    (state: t.IConsolidatedPositionState) => state.consolidatedPosition
  )
  const { bankData } = useSelector((state: t.IBankDataState) => ({
    bankData: state.bankData.data,
  }))
  const { suitabilityInfo } = useSelector((state: t.ISuitabilityInfoState) => ({
    suitabilityInfo: state.suitabilityInfo.data,
  }))

  const settingPieChartInfo = useCallback(
    (payload: t.IPieChartInfoState) => {
      setPieChartInfo(
        payload || {
          value: (consolidatedPosition && consolidatedPosition.saldototal) || 0,
          percent: 0,
        }
      )
    },
    [consolidatedPosition]
  )

  useEffect(() => {
    if (consolidatedPosition && consolidatedPosition.saldototal) {
      settingPieChartInfo({ value: consolidatedPosition.saldototal })
    }
  }, [consolidatedPosition, settingPieChartInfo])

  const graphValuesGenerator = (
    data: t.IDataConsolidatedPosition,
    themeProps: DefaultTheme
  ) => {
    const colorsPriority = [
      themeProps.colors.magenta2,
      themeProps.colors.blue4,
      themeProps.colors.yellow2,
      themeProps.colors.green3,
      themeProps.colors.darkBlue2,
    ]

    let result: t.IGraphValuesResult[]

    if (data?.saldototal && data?.categorias) {
      const sortedResult = [...data.categorias].sort(
        (a, b) => b.valor - a.valor
      )
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

  function renderInvestimentCardContent() {
    const TotalInvestedTitle = () => (
      <s.TitleWrapper>
        <Text type="headline" color="gray5">
          Total bruto investido
        </Text>
        <Popover
          tooltip
          content={() => (
            <Text type="body" color="white">
              É a soma de todos os valores, incluindo o saldo em conta e o
              rendimento das aplicações.
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
      </s.TitleWrapper>
    )

    const TotalInvestedValue = () => (
      <Text type="headline" bold color="gray6">
        {formatMoney(
          consolidatedPosition && consolidatedPosition.saldototal
            ? consolidatedPosition.saldototal
            : 0
        )}
      </Text>
    )

    const AccountBalanceTitle = () => (
      <s.TitleWrapper>
        <Text type="headline" color="gray5">
          Saldo em conta
        </Text>
        <Popover
          tooltip
          content={() => (
            <Text type="body" color="white">
              Recurso disponível para você investir ou transferir para o seu
              banco.
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
      </s.TitleWrapper>
    )

    const AccountBalanceValue = () => (
      <Text type="headline" bold color="gray6">
        {formatMoney(
          bankData?.DadosContaPortoSeguro?.saldo_disponivel
            ? bankData.DadosContaPortoSeguro.saldo_disponivel
            : 0
        )}
      </Text>
    )

    const arrayContent = [
      <s.Content>
        {isNotMobile ? (
          <s.HorizontalListWrapper>
            <HorizontalList
              startItems={[<TotalInvestedTitle />]}
              endItems={[<TotalInvestedValue />]}
              css={`
                div:nth-child(2) {
                  margin-left: 0;
                }
              `}
            />

            <HorizontalList
              startItems={[<AccountBalanceTitle />]}
              endItems={[<AccountBalanceValue />]}
            />
          </s.HorizontalListWrapper>
        ) : (
          <s.VerticalListWrapper>
            <VerticalList
              elements={[<TotalInvestedTitle />, <TotalInvestedValue />]}
            />
            <VerticalList
              elements={[<AccountBalanceTitle />, <AccountBalanceValue />]}
            />
          </s.VerticalListWrapper>
        )}
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
          data={graphValuesGenerator(consolidatedPosition, theme)}
          onMouseEnter={settingPieChartInfo}
          onSliceClick={settingPieChartInfo}
          onMouseLeave={settingPieChartInfo}
        >
          <ChartMiddleInfoContent pieChartInfo={pieChartInfo} />
        </PieChart>
      </s.PieChartContainer>,
    ]

    // Error state
    if (
      hasError &&
      !(consolidatedPosition && Object.entries(consolidatedPosition).length)
    ) {
      return <InvestmentErrorStateCard onRetry={onFetchInvestments} {...rest} />
    }
    // Empty state
    if (
      (!isLoading &&
        !hasError &&
        !(
          consolidatedPosition && Object.entries(consolidatedPosition).length
        )) ||
      consolidatedPosition?.saldototal <= 0
    ) {
      return <InvestmentEmptyStateCard {...rest} />
    }
    // Loading state
    if (
      isLoading &&
      !(consolidatedPosition && Object.entries(consolidatedPosition).length)
    ) {
      return <InvestmentLoadingStateCard {...rest} />
    }
    // Card with data
    if (
      consolidatedPosition &&
      suitabilityInfo?.status_cotista &&
      consolidatedPosition?.saldototal > 0 &&
      bankData?.DadosContaPortoSeguro?.saldo_disponivel
    ) {
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

    return <InvestmentLoadingStateCard {...rest} />
  }

  return renderInvestimentCardContent()
}

export default InvestmentCard
