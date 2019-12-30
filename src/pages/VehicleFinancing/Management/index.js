import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components/macro'

import LinearProgressBar from 'components/LinearProgressBar'
import Breadcrumb from 'components/Breadcrumb'
import Button from 'components/Button'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import MoreDetails from 'components/Solutions/MoreDetails'

import Container from 'components/Management/Container'
import PageContent from 'components/Management/PageContent'
import LeftNav from 'components/Management/LeftNav'
import ManageableItem from 'components/Management/ManageableItem'

import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import {
  BreadcrumbContainer,
  AddBtnLink,
  Text,
  PageTitle,
  MiddleContent,
  Topics,
  Topic,
  TopicTitle,
  TopicValue,
  ComplementaryInfo,
  RowContent,
  RowContentColumnDir,
  Column,
  ColumnWithLine,
  LinearProgressContent,
  LinearProgressTitleContent,
  LinearProgressButtonContent,
  VantagesContent,
  VantagesTitle,
  VantagesItem,
} from './style'

const mock = [
  {
    contrato: 'contrato1',
    descricao: 'Este é contrato 1 de financiamento',
    marca: 'Fiat',
    modelo: 'Palio Weekend',
    pontosGanhos: '50',
    quantidadeParcelasContratadas: '32',
    quantidadeParcelasPagas: 1,
    saldoDevedor: '50000',
    urlContrato: 'www.google.com.br',
    valorContratado: '50000',
    valorEntrada: '10000',
    valorPago: '25000',
    valorParcelaAtual: '2500',
  },
  {
    contrato: 'contrato2',
    descricao: 'Este é contrato 1 de financiamento',
    marca: 'Renault',
    modelo: 'Sandero',
    pontosGanhos: '50',
    quantidadeParcelasContratadas: '20',
    quantidadeParcelasPagas: '5',
    saldoDevedor: '25000',
    urlContrato: 'www.google.com.br',
    valorContratado: '50000',
    valorEntrada: '10000',
    valorPago: '25000',
    valorParcelaAtual: '2500',
  },
]

const ManagementVehicleFiancing = ({ history }) => {
  const theme = useContext(ThemeContext)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const generateManageableItem = arrayItems =>
    arrayItems.map((item, index) => (
      <ManageableItemWithStyle
        onClick={() => setSelectedIndex(index)}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        name={item.contrato}
        value={item.valorContratado}
        isActive={selectedIndex === index}
      />
    ))

  const selectedItem = mock[selectedIndex]

  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['Soluções', 'FINANCIAMENTO DE VEÍCULO']} />
        </BreadcrumbContainer>
        <PageContent>
          <LeftNav>
            <AddBtnLink
              onClick={() => {
                history.push('/')
              }}
            >
              <Icon width="48" fill="#ccc" name="add" />
              <Text fontColor="#aaa" fontSize="14px">
                Adicionar
              </Text>
            </AddBtnLink>
            {generateManageableItem(mock)}
          </LeftNav>
          <MiddleContent>
            <PageTitle>{selectedItem.contrato}</PageTitle>
            <Topics settings={settings}>
              <Topic>
                <div>
                  <Icon width="28" fill={theme.colors.blue4} name="money" />
                </div>
                <div>
                  <TopicTitle>Entrada</TopicTitle>
                  <TopicValue>
                    {formatMoney(selectedItem.valorEntrada)}
                  </TopicValue>
                </div>
              </Topic>
              <Topic>
                <div>
                  <Icon width="28" fill={theme.colors.blue4} name="financial" />
                </div>

                <div>
                  <TopicTitle>Valor de Crédito</TopicTitle>
                  <TopicValue>
                    {formatMoney(selectedItem.valorContratado)}
                  </TopicValue>
                </div>
              </Topic>
              <Topic>
                <div>
                  <Icon width="28" fill={theme.colors.blue4} name="billing" />
                </div>
                <div>
                  <TopicTitle>99 parcelas de</TopicTitle>
                  <TopicValue>
                    {formatMoney(selectedItem.valorContratado)}
                  </TopicValue>
                </div>
              </Topic>
            </Topics>
            <RowContent>
              <ColumnWithLine>
                <Text
                  fontSize="22px"
                  margin="0 0 7px 0"
                  lineHeight="32px"
                  textAlign="center"
                >
                  Marca
                </Text>
                <Text>{selectedItem.marca}</Text>
              </ColumnWithLine>
              <Column>
                <Text
                  fontSize="22px"
                  margin="0 0 7px 0"
                  lineHeight="32px"
                  textAlign="center"
                >
                  Modelo
                </Text>
                <Text>{selectedItem.modelo}</Text>
              </Column>
            </RowContent>
            <RowContent>
              <Column>
                <Text
                  fontSize="22px"
                  margin="0 0 7px 0"
                  lineHeight="32px"
                  textAlign="center"
                >
                  Saldo devedor
                </Text>
                <Text>{selectedItem.saldoDevedor}</Text>
              </Column>
            </RowContent>
            <RowContentColumnDir>
              <LinearProgressTitleContent>
                <Text
                  fontSize="11px"
                  margin="0 0 14px 0"
                  lineHeight="28px"
                  textAlign="center"
                  fontWeight="600"
                  letterSpacing="1.5px"
                >
                  EVOLUÇÃO PAGAMENTO
                </Text>
              </LinearProgressTitleContent>
              <LinearProgressContent>
                <LinearProgressBar
                  width="70%"
                  margin="70px 0 0 0"
                  now={selectedItem.quantidadeParcelasPagas}
                  max={selectedItem.quantidadeParcelasContratadas}
                  subtitle="parcelas"
                />
              </LinearProgressContent>
              <LinearProgressButtonContent>
                <Button>Segunda via do boleto</Button>
              </LinearProgressButtonContent>
            </RowContentColumnDir>
            <ComplementaryInfo>
              <Text
                margin="22px 0"
                lineHeight="21px"
                letterSpacing="1.5px"
                fontColor={theme.colors.gray6}
                fontWeight="600"
                fontSize="11px"
              >
                INFORMAÇÕES COMPLEMENTARES
              </Text>
              <FileDownloadSection
                data={complementaryInfo}
                backgroundColor="inherit"
              />
            </ComplementaryInfo>
          </MiddleContent>
        </PageContent>
      </Container>

      <VantagesContent>
        <VantagesTitle>
          <Text
            margin="22px 0"
            lineHeight="21px"
            letterSpacing="1.5px"
            fontColor={theme.colors.gray6}
            fontWeight="600"
            fontSize="11px"
          >
            VANTAGENS AO CONTRATAR COM O CONQUISTA
          </Text>
        </VantagesTitle>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="talkman" />
          </div>
          <div>
            <Text fontSize="18px" lineHeight="28px">
              Gerente de Conta
            </Text>
            <br />
            <Text fontSize="14px" lineHeight="24px">
              De acordo com seu saldo investido, conte com a possibilidade de
              ter o apoio de um Gerente de Conta para auxiliar você em dúvidas e
              contratações.
            </Text>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="diamond" />
          </div>
          <div>
            <Text fontSize="18px" lineHeight="28px">
              Programa de Relacionamento
            </Text>
            <br />
            <Text fontSize="14px" lineHeight="24px">
              Pontos do Conquista somados aos pontos do Cartão de Crédito Porto
              Seguro, que podem ser trocados por descontos, benefícios e
              vantagens.
            </Text>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="callcenter" />
          </div>
          <div>
            <Text fontSize="18px" lineHeight="28px">
              Chat inteligente
            </Text>
            <br />
            <Text fontSize="14px" lineHeight="24px">
              Atendimento 24h para esclarecer suas dúvidas sobre o uso da
              plataforma e sobre as soluções Porto Seguro disponíveis no
              Conquista.
            </Text>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="apps" />
          </div>
          <div>
            <Text fontSize="18px" lineHeight="28px">
              Facilidade
            </Text>
            <br />
            <Text fontSize="14px" lineHeight="24px">
              Ferramentas que simplificam seu dia a dia, permitindo que você
              controle sua vida financeira e contrate soluções da Porto Seguro
              pelo computador ou smartphone.
            </Text>
          </div>
        </VantagesItem>
      </VantagesContent>
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="Com o Conquista, você planeja a compra do seu carro novo ou seminovo."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo parcelas mensais adequadas ao seu
				orçamento. Conheça os planos e contrate uma solução com a solidez da Porto Seguro."
        buttonText={
          <span>
            SIMULAR E CONTRATAR{' '}
            <span
              css={`
                position: absolute;
                top: 7px;
                right: 12px;
                font-size: 13px;
              `}
            >
              &gt;
            </span>
          </span>
        }
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-01',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Tente um lance',
            imgDescription:
              'Você não precisa contar apenas com a sorte para ser contemplado no consórcio. Todos os meses, há a possibilidade de você dar um lance maior do que o valor ofertado por outros participantes do seu grupo para conquistar o seu sonho.',
          },
          {
            img: 'carousel-02',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Valor do consórcio como parte do lance',
            imgDescription:
              'Para conseguir dar um lance mais alto e aumentar suas chances de ser contemplado, você pode usar parte do valor do consórcio como complemento ao que foi ofertado. Cada consórcio tem suas regras, basta se informar sobre a existência desse benefício.',
          },
          {
            img: 'carousel-03',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Escolha qualquer veículo',
            imgDescription:
              'Ao fazer um consórcio, será utilizado um veículo específico como referência. No entanto, como o valor obtido com o consórcio é em dinheiro, você pode usá-lo para adquirir qualquer outro veículo sem restrição de modelo.',
          },
        ]}
      />
      <FileDownloadSection
        data={[
          {
            title: 'SISTEMA DE INFORMAÇÕES DE CRÉDITO - SRC',
            description: 'Informações legais sobre financiamento.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'TABELA DE TARIFAS',
            description:
              'Mais informações sobre tarifas envolvidas na contratação de financiamento.',
            buttonText: 'Visualizar',
          },
          {
            title: 'CONDIÇÕES',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Financiamento de Veículos da Porto Seguro.',
            buttonText: 'BAIXAR ARQUIVO',
          },
        ]}
      />
    </>
  )
}

const complementaryInfo = [
  {
    title: 'Programa de relacionamento',
    description: (
      <span>
        Com este produto você acumulou:
        <br />{' '}
        <Text lineHeight="32px" fontSize="22px">
          50 pontos
        </Text>
      </span>
    ),
    buttonText: 'Ver extrato',
    icon: 'diamond',
  },
  {
    title: 'CONTRATO DE CRÉDITO',
    description:
      'Para saber mais detalhes sobre seu financiamento, consulte seu contrato.',
    buttonText: 'BAIXAR ARQUIVO',
  },
]

const ManageableItemWithStyle = ({ name, value, onClick, isActive }) => (
  <ManageableItem onClick={onClick} active={isActive}>
    <Icon width="28" fill="#33beff" name="car2" />
    <Text
      fontSize="14px"
      lineHeight="28px"
      margin="0 0 7px 0"
      textAlign="center"
    >
      {name}
    </Text>
    <Text
      fontSize="11px"
      lineHeight="10px"
      fontWeight={400}
      letterSpacing="1.5px"
      margin="0"
    >
      VALOR DO CRÉDITO
    </Text>
    <Text fontSize="14px" fontWeight={400} margin="0px">
      {formatMoney(value)}
    </Text>
  </ManageableItem>
)

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 370,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
}

export default ManagementVehicleFiancing
