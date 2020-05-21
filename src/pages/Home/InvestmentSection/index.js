import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'
import PieChart from 'components/PieChart'

import InvestmentEmptyImg from 'assets/images/pages/Home/img_investiments_empty.jpg'

import { formatMoney } from 'helpers'

import LoadingState from '../commons/LoadingState'
import ErrorState from '../commons/ErrorState'
import ChartMiddleInfoContent from '../ChartMiddleInfoContent'
import ModalAccountPortoInfo from './ModalAccountPortoInfo'

import {
  SectionRow,
  SectionCol,
  PieChartContainer,
  InvestmentInfos,
  InvestmentInfosRow,
  SliderBox,
  SliderImageBox,
  SliderBoxButton,
  SliderCaption,
  SliderTextBox,
} from './styles'

const graphValuesGenerator = (data, theme) => {
  const colorsPriority = [
    theme.colors.magenta2,
    theme.colors.blue4,
    theme.colors.yellow2,
    theme.colors.green3,
    theme.colors.darkBlue2,
  ]

  let result = []

  if (data.saldototal && data.categorias) {
    result = data.categorias.sort((a, b) => b.valor - a.valor)
    result = result.map((item, index) => ({
      id: `${index}`,
      label: item.nome,
      value: item.valor,
      color: colorsPriority[index],
      percent: ((item.valor / data.saldototal) * 100).toFixed(2),
    }))
  }

  return result
}

export default function InvestmentSection({ onFetchInvestments }) {
  const theme = useContext(ThemeContext)

  const { data, isLoading, hasError } = useSelector(
    state => state.consolidatedPosition
  )
  const { bankData } = useSelector(state => ({
    bankData: state.bankData.data,
  }))

  const { suitabilityInfo } = useSelector(state => ({
    suitabilityInfo: state.suitabilityInfo.data,
  }))

  const history = useHistory()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pieChartInfo, setPieChartInfo] = useState({
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

  function settingPieChartInfo(payload) {
    setPieChartInfo(
      payload || {
        value: (data && data.saldototal) || 0,
        percent: 0,
      }
    )
  }
  const renderInvestimentCardContent = () => {
    if (isLoading && !(data && Object.entries(data).length)) {
      return <LoadingState />
    }
    if (hasError && !(data && Object.entries(data).length)) {
      return <ErrorState onRetry={onFetchInvestments} />
    }
    if (data && suitabilityInfo && suitabilityInfo.status_cotista) {
      return (
        <>
          <ModalAccountPortoInfo
            isOpen={isModalOpen}
            onChangeModalOpen={setIsModalOpen}
            bankData={bankData}
          />
          <SectionRow>
            <SectionCol md="6">
              <PieChartContainer>
                <PieChart
                  width="100%"
                  height="100%"
                  data={graphValuesGenerator(data, theme)}
                  onMouseEnter={settingPieChartInfo}
                  onSliceClick={settingPieChartInfo}
                  onMouseLeave={settingPieChartInfo}
                >
                  <ChartMiddleInfoContent pieChartInfo={pieChartInfo} />
                </PieChart>
              </PieChartContainer>
            </SectionCol>

            <SectionCol
              md="6"
              css={`
                padding: 49px 0;
              `}
            >
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="headline">Saldo disponível</Text>
                  <Text type="headline" bold>
                    {formatMoney(
                      bankData && bankData.DadosContaPortoSeguro
                        ? bankData.DadosContaPortoSeguro.saldo_disponivel
                        : 0
                    )}
                  </Text>
                  <ButtonLink
                    data-gtm-subname="card investimentos saldo disponivel"
                    data-gtm-name="conta de investimento"
                    data-gtm-type="click"
                    data-gtm-clicktype="link"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    Conta de Investimento
                  </ButtonLink>
                </InvestmentInfos>
              </InvestmentInfosRow>
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="headline">Saldo a liquidar</Text>
                  <Text type="headline" bold>
                    {formatMoney(
                      bankData && bankData.DadosContaPortoSeguro
                        ? bankData.DadosContaPortoSeguro.saldo_liquidar
                        : 0
                    )}
                  </Text>
                  <ButtonLink
                    data-gtm-subname="card investimentos saldo a liquidar"
                    data-gtm-name="ver extrato"
                    data-gtm-type="click"
                    data-gtm-clicktype="link"
                    onClick={() => history.push('/investimentos/extrato')}
                  >
                    Ver extrato
                  </ButtonLink>
                </InvestmentInfos>
              </InvestmentInfosRow>
            </SectionCol>
          </SectionRow>
        </>
      )
    }
    return (
      <SliderBox>
        <SliderImageBox>
          <img src={InvestmentEmptyImg} alt="home offer pic" />
          <SliderCaption>
            <Text type="button" bold>
              Fundos de Investimento
            </Text>
          </SliderCaption>
        </SliderImageBox>
        <SliderTextBox>
          <Text
            type="title"
            bold
            css={`
              padding-bottom: 7px;
            `}
          >
            Diversificando com menos riscos
          </Text>
          <Text
            bold
            css={`
              padding-bottom: 14px;
            `}
          >
            Uma carteira de investimento com diferentes ativos é a chave para
            bons rendimentos. Na Lista de Fundos, você pode selecionar o que
            mais combina com seu perfil.
          </Text>
          <SliderBoxButton
            data-gtm-subname="card investimentos diversificando com menos riscos"
            data-gtm-name="conhecer"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="secondary"
            onClick={() => history.push('/investimentos')}
          >
            CONHECER
          </SliderBoxButton>
        </SliderTextBox>
      </SliderBox>
    )
  }

  return renderInvestimentCardContent()
}
