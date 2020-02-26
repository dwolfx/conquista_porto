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
import Button from 'components/Button'

import Container from 'components/Management/Container'
import ManageableItem from 'components/Management/ManageableItem'
import PageContent from 'components/Management/PageContent'
import LeftNav from 'components/Management/LeftNav'
import RightContent from 'components/Management/RightContent'
import TopicsIconContent from 'components/TopicsIconContent'

import Icon from 'components/IconExporter'

import useFetchLifeInsurance from 'hooks/LifeInsurance/useFetchLifeInsurance'

import { formatMoney } from 'helpers'

import {
  BreadcrumbContainer,
  AddBtnLink,
  PageTitle,
  Topic,
  TopicTitle,
  TopicValue,
  Section,
  Invoice,
  InvoiceItem,
  Table,
  Text,
  ClientAreaSection,
  Modal,
  ModalContent,
  Divider,
  ShowAll,
  Row,
} from './styles'

const downloadFileSectionData = [
  {
    title: 'Condições Gerais',
    description:
      'Confira mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Seguro de Vida da Porto Seguro.',
    buttonText: 'Baixar Arquivo',
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'Seguro como renda proteção',
    imgDescription:
      'O seguro de vida é uma boa maneira de garantir segurança financeira às pessoas que você ama. Com ele, você continua proporcionando um estilo de vida de qualidade aos seus entes queridos, caso você falte um dia.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-02',
    imgTitle: 'Coberturas não relacionadas à morte',
    imgDescription:
      'O seguro de vida não vale só em caso de morte. Dependendo das coberturas da apólice contratada, seu valor também pode ser utilizado em alguns casos de doenças graves, incapacidade temporária total ou parcial por acidentes, entre outros.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Seguro para profissionais',
    imgDescription:
      'A DIT (Diária por Incapacidade Temporária) é indicada para profissionais liberais, que podem contar com o seguro para garantir seus rendimentos em caso de acidente que os afaste do trabalho e para cobrir despesas médicas hospitalares e odontológicas.',
    imgPath: 'lifeInsurance',
  },
]

export default function ManagementLifeInsurance({ history }) {
  useFetchLifeInsurance()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedLifeInsurance, setSelectedLifeInsurance] = useState(null)
  const themeContext = useContext(ThemeContext)

  const lifeInsurance = useSelector(state => state.lifeInsurance)

  useEffect(() => {
    if (lifeInsurance.data) {
      setSelectedLifeInsurance(lifeInsurance.data[0])
    }
  }, [lifeInsurance.data])

  function scrollPage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (lifeInsurance.data && selectedLifeInsurance) {
    return (
      <>
        <Container>
          <BreadcrumbContainer>
            <Breadcrumb crumbs={['Soluções', 'seguro de vida']} />
          </BreadcrumbContainer>
          <PageContent id="life-insurance-top-page">
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
              {lifeInsurance.data.map(item => (
                <ManageableItem
                  key={item.Apolice.LinkDownload}
                  data-gtm-type="click"
                  data-gtm-clicktype="card"
                  data-gtm-subname="card custodia visualizar"
                  data-gtm-name="seguro de vida"
                  active={
                    selectedLifeInsurance.Apolice.LinkDownload ===
                    item.Apolice.LinkDownload
                  }
                  onClick={() => {
                    setSelectedLifeInsurance(item)
                    scrollPage('life-insurance-top-page')
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
            {lifeInsurance.data.map(item => (
              <RightContent
                key={item.Apolice.LinkDownload}
                isSelected={
                  item.Apolice.LinkDownload ===
                  selectedLifeInsurance.Apolice.LinkDownload
                }
              >
                <PageTitle>{item.Nome}</PageTitle>
                <TopicsIconContent>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="boy"
                    />
                    <div>
                      <TopicTitle>segurado</TopicTitle>
                      <TopicValue>
                        {selectedLifeInsurance.NomeSegurado}
                      </TopicValue>
                    </div>
                  </Topic>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="billing"
                    />
                    <ParcelContainer data={selectedLifeInsurance} />
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
                        data-gtm-subname="seguro de vida"
                        data-gtm-name="ver todas"
                        onClick={() => {
                          setIsOpenModal(true)
                        }}
                      >
                        VER TODAS &gt;
                      </ShowAll>
                    </div>
                  </Topic>
                </TopicsIconContent>
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
                  <Invoice>
                    <BeneficiarioContent data={selectedLifeInsurance} />
                  </Invoice>
                </Section>
              </RightContent>
            ))}
          </PageContent>
        </Container>
        <HighlightSection
          title="Futuro protegido."
          mainDescription="Com o Conquista, é fácil encontrar o plano ideal para você."
          subDescription="Informe suas preferências na simulação, conheça as coberturas disponíveis e contrate o Seguro
          de Vida da Porto Seguro."
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
        <MoreDetails title="Saiba mais:" data={moreDetailsData} />
        <FileDownloadSection data={downloadFileSectionData} />
        <ClientAreaSection>
          <Text>
            Acesse a Área do Cliente para conferir todos os detalhes sobre os
            produtos da Porto Seguro.
          </Text>
          <Button
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="acesse a area do cliente"
            data-gtm-name="acessar"
          >
            ACeSSAR
          </Button>
        </ClientAreaSection>
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

const BeneficiarioContent = ({ data }) => {
  const beneficiaries = [data.Beneficiarios].flatMap(product => product)

  return (
    <>
      <Text
        fontSize="18px"
        margin="0 0 14px 0"
        lineHeight="28px"
        textAlign="center"
      >
        Beneficiários
      </Text>
      <Table tableWidth="70%">
        <thead>
          <tr>
            <th align="center">NOME</th>
            <th align="center">DIVISÃO PERCENTUAL</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map(element => (
            <tr key={element.Beneficiario.Nome}>
              <td align="center">{element.Beneficiario.Nome}</td>
              <td align="center">{element.Beneficiario.Percentual}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
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

BeneficiarioContent.propTypes = {
  data: PropTypes.object.isRequired,
}

ParcelContainer.propTypes = {
  data: PropTypes.object.isRequired,
}

ManagementLifeInsurance.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
