import React, { useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components/macro'

import LinearProgressBar from 'components/LinearProgressBar'
import Breadcrumb from 'components/Breadcrumb'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import MoreDetails from 'components/Solutions/MoreDetails'
import RightContent from 'components/Management/RightContent'

import Container from 'components/Management/Container'
import PageContent from 'components/Management/PageContent'
import LeftNav from 'components/Management/LeftNav'
import ManageableItem from 'components/Management/ManageableItem'
import TopicsIconContent from 'components/TopicsIconContent'

import { formatMoney } from 'helpers'

import useFetchVehicleFinancing from 'hooks/VehicleFinancing/useFetchVehicleFinancing'

import {
  BreadcrumbContainer,
  AddBtnLink,
  TextBody,
  TextHeading4,
  TextHeadline,
  TextCaptionUppercase,
  TextSubheading,
  TextButton,
  TextTitle,
  ArrowButton,
  PageTitle,
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
  EmptyContent,
} from './style'

const ManagementVehicleFinancing = ({ history }) => {
  const theme = useContext(ThemeContext)
  const [selectedContract, setSelectedContract] = useState(0)
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing)

  useFetchVehicleFinancing()

  useEffect(() => {
    if (vehiclesFinancings.data) {
      setSelectedContract(vehiclesFinancings.data[0].Contrato)
    }
  }, [vehiclesFinancings.data])

  const generateManageableItem = arrayItems =>
    arrayItems
      ? arrayItems.map(item => (
          <ManageableItemWithStyle
            onClick={() => setSelectedContract(item.Contrato)}
            key={`${item.Contrato}-${new Date().getUTCMilliseconds()}`}
            name={item.Contrato}
            value={item.ValorContratado}
            isActive={selectedContract === item.Contrato}
          />
        ))
      : null

  const renderEmptyState = () => (
    <EmptyContent>
      <PageTitle>
        <TextHeading4>Não há Financiamento</TextHeading4>
      </PageTitle>
      <TextBody fontColor={theme.colors.gray6} fontSize="12px">
        Para o usuário logado não há o produto Financiamento de Veículo. Por
        favor retorne para a página inicial
      </TextBody>
    </EmptyContent>
  )

  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['Soluções', 'FINANCIAMENTO DE VEÍCULO']} />
        </BreadcrumbContainer>
        <PageContent>
          <LeftNav>
            <AddBtnLink
              data-gtm-type="click"
              data-gtm-clicktype="card"
              data-gtm-subname="card custodia visualizar"
              data-gtm-name="adicionar"
              onClick={() => {
                history.push('/')
              }}
            >
              <Icon width="48" fill={theme.colors.gray3} name="add" />
              <TextBody fontColor={theme.colors.gray4}>Adicionar</TextBody>
            </AddBtnLink>
            {generateManageableItem(vehiclesFinancings.data)}
          </LeftNav>

          {vehiclesFinancings.data
            ? vehiclesFinancings.data.map(item => (
                <RightContent
                  key={item.Contrato}
                  isSelected={item.Contrato === selectedContract}
                >
                  <PageTitle>
                    <TextHeading4>{item.Contrato}</TextHeading4>
                  </PageTitle>
                  <TopicsIconContent>
                    <Topic>
                      <div>
                        <Icon
                          width="28"
                          fill={theme.colors.blue4}
                          name="money"
                        />
                      </div>
                      <div>
                        <TopicTitle>Entrada</TopicTitle>
                        <TopicValue>
                          {formatMoney(item.ValorEntrada)}
                        </TopicValue>
                      </div>
                    </Topic>
                    <Topic>
                      <div>
                        <Icon
                          width="28"
                          fill={theme.colors.blue4}
                          name="financial"
                        />
                      </div>

                      <div>
                        <TopicTitle>Valor de Crédito</TopicTitle>
                        <TopicValue>
                          {formatMoney(item.ValorContratado)}
                        </TopicValue>
                      </div>
                    </Topic>
                    <Topic>
                      <div>
                        <Icon
                          width="28"
                          fill={theme.colors.blue4}
                          name="billing"
                        />
                      </div>
                      <div>
                        <TopicTitle>99 parcelas de</TopicTitle>
                        <TopicValue>
                          {formatMoney(item.ValorContratado)}
                        </TopicValue>
                      </div>
                    </Topic>
                  </TopicsIconContent>
                  <RowContent>
                    <ColumnWithLine>
                      <TextHeading4>Marca</TextHeading4>
                      <TextHeadline>{item.Marca}</TextHeadline>
                    </ColumnWithLine>
                    <Column>
                      <TextHeading4>Modelo</TextHeading4>
                      <TextHeadline>{item.Modelo}</TextHeadline>
                    </Column>
                  </RowContent>
                  <RowContent>
                    <Column>
                      <TextHeading4>Saldo devedor</TextHeading4>
                      <TextHeadline>
                        {formatMoney(item.SaldoDevedor)}
                      </TextHeadline>
                    </Column>
                  </RowContent>
                  <RowContentColumnDir>
                    <LinearProgressTitleContent>
                      <TextCaptionUppercase
                        margin="0 0 14px 0"
                        textAlign="center"
                      >
                        EVOLUÇÃO PAGAMENTO
                      </TextCaptionUppercase>
                    </LinearProgressTitleContent>
                    <LinearProgressContent>
                      <LinearProgressBar
                        width="70%"
                        margin="70px 0 0 0"
                        now={item.QuantidadeParcelasPagas}
                        max={item.QuantidadeParcelasContratadas}
                        subtitle="parcelas"
                      />
                    </LinearProgressContent>
                    <LinearProgressButtonContent>
                      <Button
                        data-gtm-type="click"
                        data-gtm-clicktype="button"
                        data-gtm-subname="evolucao do pagamento"
                        data-gtm-name="segunda via do boleto"
                      >
                        Segunda via do boleto
                      </Button>
                    </LinearProgressButtonContent>
                  </RowContentColumnDir>
                  <ComplementaryInfo>
                    <TextButton margin="22px 0" fontColor={theme.colors.gray6}>
                      INFORMAÇÕES COMPLEMENTARES
                    </TextButton>
                    <FileDownloadSection
                      data={complementaryInfo}
                      backgroundColor="inherit"
                    />
                  </ComplementaryInfo>
                </RightContent>
              ))
            : renderEmptyState()}
        </PageContent>
      </Container>

      <VantagesContent>
        <VantagesTitle>
          <TextSubheading margin="22px 0" fontColor={theme.colors.gray6}>
            VANTAGENS AO CONTRATAR COM O CONQUISTA
          </TextSubheading>
        </VantagesTitle>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="talkman" />
          </div>
          <div>
            <TextHeadline>Gerente de Conta</TextHeadline>
            <br />
            <TextTitle>
              De acordo com seu saldo investido, conte com a possibilidade de
              ter o apoio de um Gerente de Conta para auxiliar você em dúvidas e
              contratações.
            </TextTitle>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="diamond" />
          </div>
          <div>
            <TextHeadline>Programa de Relacionamento</TextHeadline>
            <br />
            <TextTitle>
              Pontos do Conquista somados aos pontos do Cartão de Crédito Porto
              Seguro, que podem ser trocados por descontos, benefícios e
              vantagens.
            </TextTitle>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="callcenter" />
          </div>
          <div>
            <TextHeadline>Chat inteligente</TextHeadline>
            <br />
            <TextTitle>
              Atendimento 24h para esclarecer suas dúvidas sobre o uso da
              plataforma e sobre as soluções Porto Seguro disponíveis no
              Conquista.
            </TextTitle>
          </div>
        </VantagesItem>
        <VantagesItem>
          <div>
            <Icon width="35" fill={theme.colors.gray7} name="apps" />
          </div>
          <div>
            <TextHeadline>Facilidade</TextHeadline>
            <br />
            <TextTitle>
              Ferramentas que simplificam seu dia a dia, permitindo que você
              controle sua vida financeira e contrate soluções da Porto Seguro
              pelo computador ou smartphone.
            </TextTitle>
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
            SIMULAR E CONTRATAR <ArrowButton>&gt;</ArrowButton>
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
        <br /> <TextHeading4>50 pontos</TextHeading4>
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
  <ManageableItem
    data-gtm-type="click"
    data-gtm-clicktype="card"
    data-gtm-subname="card custodia visualizar"
    data-gtm-name={name}
    onClick={onClick}
    active={isActive}
  >
    <Icon width="28" fill="{theme.colors.blue4}" name="car2" />
    <TextTitle margin="0 0 7px 0" textAlign="center">
      {name}
    </TextTitle>
    <TextSubheading margin="0">VALOR DO CRÉDITO</TextSubheading>
    <TextBody margin="0px">{formatMoney(value)}</TextBody>
  </ManageableItem>
)

ManageableItemWithStyle.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
}

ManageableItemWithStyle.defaultProps = {
  name: '',
  value: '',
  onClick: () => {},
  isActive: false,
}

ManagementVehicleFinancing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default ManagementVehicleFinancing
