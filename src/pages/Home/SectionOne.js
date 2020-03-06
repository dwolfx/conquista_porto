/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from 'react'
import 'styled-components/macro'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import ButtonLink from 'components/Button/Link'
import InvestmentEmptyImg from 'assets/images/pages/Home/img_investiments_empty.jpg'

import PieChart from 'components/PieChart'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatMoney } from 'helpers'
import ChartMiddleInfoContent from './ChartMiddleInfoContent'

import ProductItemGenerator from './ProductItemGenerator'

import {
  FullHeightCard,
  SectionCol,
  SectionRow,
  SliderBox,
  SliderImageBox,
  SliderCaption,
  SliderTextBox,
  SliderBoxButton,
  InvestmentInfos,
  InvestmentInfosRow,
  OverflowCard,
  ModalTextWrapper,
  ContainerAccountInfo,
  ContainerBox,
  TableBox,
  ProductsCol,
  PieChartContainer,
} from './styles'

const SectionOne = () => {
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing.data)
  const creditCards = useSelector(state => state.creditCard.data)
  const vehiclesConsortium = useSelector(state => state.consortiumVehicle.data)
  const buildingConsortium = useSelector(state => state.consortiumBuilding.data)

  const history = useHistory()

  const renderCreditProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(creditCards, 'cartaoCredito', history),
      ...ProductItemGenerator(
        vehiclesFinancings,
        'financiamentoVeiculo',
        history
      ),
      ...ProductItemGenerator(vehiclesConsortium, 'consorcioVeiculo', history),
      ...ProductItemGenerator(buildingConsortium, 'consorcioImovel', history),
    ]

    return formatResult(insertDivisor, sortArray)(result)
  }

  return (
    <>
      <SectionCol md="5">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
          <InvestmentCard />
        </FullHeightCard>
      </SectionCol>

      <SectionCol md="7">
        <SectionRow>
          <ProductsCol md="6">
            <FullHeightCard headerIcon="creditcard" headerTitle="Crédito">
              <OverflowCard>{renderCreditProducts()}</OverflowCard>
            </FullHeightCard>
          </ProductsCol>

          <ProductsCol md="6">
            <FullHeightCard headerIcon="targetmarket" headerTitle="Seguros">
              <OverflowCard>
                <InsuranceCard />
              </OverflowCard>
            </FullHeightCard>
          </ProductsCol>
        </SectionRow>
      </SectionCol>
    </>
  )
}

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

const InvestmentCard = () => {
  const consolidatedPosition = useSelector(
    state => state.consolidatedPosition.data
  )
  const bankData = useSelector(state => state.bankData.data)

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
      value: (consolidatedPosition && consolidatedPosition.saldototal) || 0,
      percent: 0,
    })
  }, [consolidatedPosition])

  function settingPieChartInfo(payload) {
    setPieChartInfo(
      payload || {
        value: (consolidatedPosition && consolidatedPosition.saldototal) || 0,
        percent: 0,
      }
    )
  }

  const renderModalContent = () => (
    <>
      <ModalTextWrapper>
        <Text type="headline" color="gray6" bold>
          Como investir?
        </Text>
        <Text type="headline" color="gray5">
          Para investir você precisará realizar um depósito ou transferência
          para a sua conta de investimento e assim que processarmos a operação
          você estará mais próximo de tornar seus objetivos realidade.
        </Text>
      </ModalTextWrapper>
      <ModalTextWrapper margin="0 0 14px 0">
        <Text type="headline" color="gray6" bold>
          Dados para transferência (TED)
        </Text>
      </ModalTextWrapper>
      <ContainerBox>
        {bankData &&
          bankData.DadosContaPortoSeguro &&
          bankData.DadosContaPortoSeguro.cpf && (
            <ContainerAccountInfo>
              <TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  BANCO
                </Text>
                <Text type="headline" color="gray5" bold>
                  {`${bankData.DadosContaPortoSeguro.codigo_banco} - ${bankData.DadosContaPortoSeguro.nome_banco}`}
                </Text>
              </TableBox>
              <TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  AGÊNCIA
                </Text>
                <Text type="headline" color="gray5" bold>
                  {bankData.DadosContaPortoSeguro.agencia}
                </Text>
              </TableBox>
              <TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  CONTA
                </Text>
                <Text type="headline" color="gray5" bold>
                  {`${bankData.DadosContaPortoSeguro.conta}-${bankData.DadosContaPortoSeguro.digito_conta}`}
                </Text>
              </TableBox>
              <TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  CPF
                </Text>
                <Text type="headline" color="gray5" bold>
                  {bankData.DadosContaPortoSeguro.cpf}
                </Text>
              </TableBox>
              <TableBox>
                <Text type="captionUppercase" color="gray4" bold>
                  FAVORECIDO
                </Text>
                <Text type="headline" color="gray5" bold>
                  {bankData.DadosContaPortoSeguro.titular}
                </Text>
              </TableBox>
            </ContainerAccountInfo>
          )}
      </ContainerBox>
      <ModalTextWrapper margin="0 0 14px 0">
        <Text type="headline" color="gray6" bold>
          Informações adicionais
        </Text>
      </ModalTextWrapper>
      <ContainerBox>
        <ModalTextWrapper margin="0 0 21px 0">
          <Text type="headline" color="gray5" bold>
            Esta conta é para recursos relacionados a investimentos apenas.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper margin="0 0 21px 0">
          <Text type="headline" color="gray5" bold>
            As transferências devem ser de contas de mesma titularidade do
            favorecido.
          </Text>
        </ModalTextWrapper>
        <ModalTextWrapper margin="0 0 0 0">
          <Text type="headline" color="gray5" bold>
            A Porto Seguro faz a idenfiticação e direcionamento dos recursos.
          </Text>
        </ModalTextWrapper>
      </ContainerBox>
    </>
  )

  const theme = useContext(ThemeContext)
  return consolidatedPosition &&
    consolidatedPosition.saldototal &&
    consolidatedPosition.categorias ? (
    <>
      <Modal
        modalTitle="Conta de investimento"
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {renderModalContent()}
      </Modal>
      <SectionRow>
        <SectionCol md="6">
          <PieChartContainer>
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
          </PieChartContainer>
        </SectionCol>

        <SectionCol md="6" className="custom-padding">
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
  ) : (
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
          Uma carteira de investimento com diferentes ativos é a chave para bons
          rendimentos. Na Lista de Fundos, você pode selecionar o que mais
          combina com seu perfil.
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

const InsuranceCard = () => {
  const lifeInsurance = useSelector(state => state.lifeInsurance.data)
  const tripInsurance = useSelector(state => state.tripInsurance.data)

  const history = useHistory()

  let result = []

  result = [
    ...ProductItemGenerator(lifeInsurance, 'seguroVida', history),
    ...ProductItemGenerator(tripInsurance, 'seguroViagem', history),
  ]

  return formatResult(insertDivisor, sortArray)(result)
}

const formatResult = (func1, func2) => array => func1(func2(array))

const insertDivisor = array =>
  array
    .map((x, i) =>
      i < array.length - 1
        ? [x, <Divisor key={`divisor-${Math.random()}`} />]
        : x
    )
    .flatMap(x => x)

const sortArray = array =>
  array.sort((a, b) => {
    if (b.key.includes('empty')) {
      return -1
    }

    return 0
  })

export default SectionOne
