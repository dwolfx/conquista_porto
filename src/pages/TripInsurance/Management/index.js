import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { css, ThemeContext } from 'styled-components/macro'

import { useSelector } from 'react-redux'

import Breadcrumb from 'components/Breadcrumb'
import MoreDetails from 'components/Solutions/MoreDetails'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'

import Container from 'components/Management/Container'
import ManageableItem from 'components/Management/ManageableItem'
import PageContent from 'components/Management/PageContent'
import LeftNav from 'components/Management/LeftNav'
import RightContent from 'components/Management/RightContent'

import Icon from 'components/IconExporter'

import useFetchTripInsurance from 'hooks/TripInsurance/useFetchTripInsurance'

import { formatMoney } from 'helpers'

import {
  BreadcrumbContainer,
  AddBtnLink,
  PageTitle,
  Topics,
  Topic,
  TopicTitle,
  TopicValue,
  Section,
  PeriodContainer,
  Period,
  Invoice,
  InvoiceItem,
  Text,
  Modal,
  ModalContent,
  Divider,
  ShowAll,
  Row,
} from './styles'

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

export default function ManagementTripInsurance({ history }) {
  useFetchTripInsurance()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedTripInsurance, setSelectedTripInsurance] = useState(null)
  const themeContext = useContext(ThemeContext)

  const tripInsurance = useSelector(state => state.tripInsurance)
  useEffect(() => {
    if (tripInsurance.data) {
      setSelectedTripInsurance(tripInsurance.data[0])
    }
  }, [tripInsurance.data])

  function scrollPage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (tripInsurance.data && selectedTripInsurance) {
    return (
      <>
        <Container>
          <BreadcrumbContainer>
            <Breadcrumb crumbs={['Soluções', 'seguro viagem']} />
          </BreadcrumbContainer>
          <PageContent id="trip-insurance-top-page">
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
                <Icon width="48" fill="#ccc" name="add" />
                <Text fontColor="#aaa" fontSize="14px">
                  Adicionar
                </Text>
              </AddBtnLink>
              {tripInsurance.data.map(item => (
                <ManageableItem
                  key={item.Apolice.LinkDownload}
                  data-gtm-type="click"
                  data-gtm-clicktype="card"
                  data-gtm-subname="card custodia visualizar"
                  data-gtm-name={item.Nome}
                  active={
                    selectedTripInsurance.Apolice.LinkDownload ===
                    item.Apolice.LinkDownload
                  }
                  onClick={() => {
                    setSelectedTripInsurance(item)
                    scrollPage('trip-insurance-top-page')
                  }}
                >
                  <Text
                    fontSize="14px"
                    lineHeight="19px"
                    margin="0 0 14px 0"
                    textAlign="center"
                  >
                    {item.Nome}
                  </Text>
                  <Text
                    fontSize="11px"
                    fontWeight={600}
                    letterSpacing="1.5px"
                    margin="0 0 7px 0"
                  >
                    VIGENTE ATÉ:
                  </Text>
                  <Text fontSize="14px">
                    {moment(item.DtFinalVigencia, 'YYYY-MM-DD-HH-mm').format(
                      'DD-MM-YYYY'
                    )}
                  </Text>
                </ManageableItem>
              ))}
            </LeftNav>
            {tripInsurance.data.map(item => (
              <RightContent
                key={item.Apolice.LinkDownload}
                isSelected={
                  item.Apolice.LinkDownload ===
                  selectedTripInsurance.Apolice.LinkDownload
                }
              >
                <PageTitle>{item.Nome}</PageTitle>
                <Topics settings={settings}>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="boy"
                    />
                    <div>
                      <TopicTitle>segurado</TopicTitle>
                      <TopicValue>
                        {selectedTripInsurance.NomeSegurado}
                      </TopicValue>
                    </div>
                  </Topic>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="billing"
                    />
                    <ParcelContainer data={selectedTripInsurance} />
                  </Topic>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="persongroup"
                    />
                    <div>
                      <TopicTitle>Coberturas adicionais</TopicTitle>
                      <ShowAll
                        data-gtm-type="click"
                        data-gtm-clicktype="link"
                        data-gtm-subname="coberturas adicionais"
                        data-gtm-name="ver todas"
                        onClick={() => {
                          setIsOpenModal(true)
                        }}
                      >
                        VER TODAS &gt;
                      </ShowAll>
                    </div>
                  </Topic>
                </Topics>
                <PeriodContainer>
                  <Period>
                    <Text
                      fontSize="22px"
                      margin="0 0 7px 0"
                      lineHeight="32px"
                      textAlign="center"
                    >
                      Destino
                    </Text>
                    {/* <Text>{item.Fatura.Vencimento}</Text> */}
                  </Period>
                  <Period>
                    <Text
                      fontSize="22px"
                      margin="0 0 7px 0"
                      lineHeight="32px"
                      textAlign="center"
                    >
                      Período
                    </Text>
                    <Text>
                      {moment(item.DtInicioVigencia).format('DD/MM/YYYY')} até{' '}
                      {moment(item.DtFinalVigencia).format('DD/MM/YYYY')}
                    </Text>
                  </Period>
                </PeriodContainer>
                <Section>
                  <Invoice>
                    <Text
                      fontSize="18px"
                      margin="0 0 14px 0"
                      lineHeight="28px"
                      textAlign="center"
                    >
                      Cobertura Principal
                    </Text>
                    <InvoiceItem>
                      <Text>Morte Acidental</Text>
                      <Text>R$ 35.000,00</Text>
                    </InvoiceItem>
                  </Invoice>
                </Section>
                <Section>
                  <FileDownloadSection
                    data={[
                      {
                        title: 'INFORMAÇÕES COMPLEMENTARES',
                        description:
                          'Para saber mais detalhes sobre seu seguro, consulte sua apólice.',
                        buttonText: 'BAIXAR ARQUIVO',
                        url: item.Apolice.LinkDownload,
                      },
                    ]}
                  />
                </Section>
              </RightContent>
            ))}
          </PageContent>
        </Container>
        <HighlightSection
          title="Tranquilidade para viajar."
          mainDescription="O Conquista acompanha você do planejamento da viagem à realização."
          subDescription="Informando detalhes como local e data, você pode simular coberturas e assistências nacionais e internacionais. Na sequência, basta escolher um plano e contratar."
          buttonText={
            <span>
              SIMULAR E CONTRATAR
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
              img: 'carousel-03',
              imgPath: 'tripInsurance',
              imgTitle: 'Desconto em hotéis para pet',
              imgDescription:
                'Com o Porto Seguro Viagem, você conta com vários estabelecimentos parceiros, que oferecem descontos e condições especiais para você hospedar seu pet com muita tranquilidade durante o período em que você estiver viajando. *Benefício válido apenas para a região de São Paulo.',
            },
            {
              img: 'carousel-02',
              imgPath: 'tripInsurance',
              imgTitle: 'Extensão de vigência',
              imgDescription:
                'Caso você não possa retornar de sua viagem por razões médicas ou por acidente de algum evento coberto, o prazo de vigência das coberturas será estendido até que você consiga voltar para sua cidade ou para o local de início da viagem, respeitando os limites de valores contratados.',
            },
            {
              img: 'carousel-01',
              imgPath: 'tripInsurance',
              imgTitle: 'Porto Seguro Viaje Bem',
              imgDescription:
                'O Seguro Viagem é uma boa maneira de garantir sua tranquilidade. Com ele, você tem assistência 24h e, ainda, conta com reserva e compras de passagens aéreas, organização de pacotes de viagem, reservas de hotéis, dicas com roteiros culturais e de lazer e orientações para você viajar sem preocupação.',
            },
          ]}
        />
        <FileDownloadSection
          data={[
            {
              title: 'CONDIÇÕES GERAIS',
              description:
                'Confira mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Seguro Viagem da Porto Seguro.',
              buttonText: 'BAIXAR ARQUIVO',
            },
          ]}
        />{' '}
        <Modal
          isOpen={isOpenModal}
          modalTitle="Coberturas"
          headerIcon="persongroup"
          handleClose={() => setIsOpenModal(!isOpenModal)}
        >
          <ModalContent>
            <Row margin="0 0 15px 0">
              <Text
                fontSize="11px"
                lineHeight="21px"
                fontWeight="600"
                letterSpacing="1.5px"
              >
                EQUILÍBRIO FINANCEIRO
              </Text>
              <Text
                fontSize="10px"
                lineHeight="21px"
                fontWeight="400"
                letterSpacing="1.5px"
              >
                VALOR DE CAPITAL
              </Text>
            </Row>

            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Morte
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 350.000,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Antecipação por Doença
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 350.000,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Funeral
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 5.000,00
              </Text>
            </Row>
            <Row margin="0 0 15px 0">
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Compra de Jazigo
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 10.000,00
              </Text>
            </Row>

            <Divider />

            <Row margin="30px 0 15px 0">
              <Text
                fontSize="11px"
                lineHeight="21px"
                fontWeight="600"
                letterSpacing="1.5px"
              >
                IMPREVISTOS
              </Text>
              <Text
                fontSize="10px"
                lineHeight="21px"
                fontWeight="400"
                letterSpacing="1.5px"
              >
                VALOR DE CAPITAL
              </Text>
            </Row>

            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Morte Acidental
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 350.000,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Invalidez por Acidente
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 350.000,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                DMHO
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 10.000,00
              </Text>
            </Row>
            <Row margin="0 0 15px 0">
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Majoração Invalidez
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 350.000,00
              </Text>
            </Row>

            <Divider />

            <Row margin="30px 0 15px 0">
              <Text
                fontSize="11px"
                lineHeight="21px"
                fontWeight="600"
                letterSpacing="1.5px"
              >
                DOENÇAS
              </Text>
              <Text
                fontSize="10px"
                lineHeight="21px"
                fontWeight="400"
                letterSpacing="1.5px"
              >
                VALOR DE CAPITAL
              </Text>
            </Row>

            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Diagnóstico de Câncer
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 50.000,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Doenças Graves 6 tipos
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 150.000,00
              </Text>
            </Row>
            <Row margin="0 0 15px 0">
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Doenças Graves 10 tipos
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 200.000,00
              </Text>
            </Row>

            <Divider />

            <Row margin="30px 0 15px 0">
              <Text
                fontSize="11px"
                lineHeight="21px"
                fontWeight="600"
                letterSpacing="1.5px"
              >
                RENDA
              </Text>
              <Text
                fontSize="10px"
                lineHeight="21px"
                fontWeight="400"
                letterSpacing="1.5px"
              >
                VALOR DE CAPITAL
              </Text>
            </Row>

            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Incapacidade Temporária
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 200,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Diária por Incapacidade
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 200,00
              </Text>
            </Row>
            <Row>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                Diária por Internação Hospitalar
              </Text>
              <Text fontSize="12px" lineHeight="22px" fontWeight="300">
                R$ 150,00
              </Text>
            </Row>
          </ModalContent>
        </Modal>
      </>
    )
  }
  return null
}

const ParcelContainer = ({ data }) =>
  data.FormaPagamento ? (
    <div>
      <TopicTitle>{`${data.FormaPagamento.QtdParcelas} parcelas de:`}</TopicTitle>
      <TopicValue>{formatMoney(data.FormaPagamento.ValorParcela)}</TopicValue>
    </div>
  ) : (
    <div>
      <TopicTitle>Forma de pagamento não descrita</TopicTitle>
      <TopicValue>{formatMoney(0)}</TopicValue>
    </div>
  )

ParcelContainer.propTypes = {
  data: PropTypes.object.isRequired,
}

ManagementTripInsurance.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
