import React, { useState, useContext, useEffect, Fragment } from 'react'
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

import { formatMoney, handleGiwRedirect } from 'helpers'

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

export default function ManagementLifeInsurance() {
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

  const addedInsurancePoliciesDetailed = () => {
    const {
      GrupoCobertura: gruposCobertura,
    } = selectedLifeInsurance.GruposCobertura

    const normalizedPayload = gruposCobertura.map(grupoCobertura => ({
      nome: grupoCobertura.Nome,
      coberturasRisco: Array.isArray(
        grupoCobertura.CoberturasRisco.CoberturaRisco
      )
        ? grupoCobertura.CoberturasRisco.CoberturaRisco
        : [grupoCobertura.CoberturasRisco.CoberturaRisco],
    }))

    return (
      <>
        {normalizedPayload.map(data => (
          <ListItem data={data} key={data.nome} />
        ))}
      </>
    )
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
                  handleGiwRedirect(
                    'portaldecliente/conquista/seguro-de-vida/simular?r=true'
                  )
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
            ACESSAR
          </Button>
        </ClientAreaSection>

        <Modal
          isOpen={isOpenModal}
          modalTitle="Coberturas"
          headerIcon="persongroup"
          handleClose={() => setIsOpenModal(!isOpenModal)}
        >
          <ModalContent>{addedInsurancePoliciesDetailed()}</ModalContent>
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

const ListItem = ({ data }) => (
  <Fragment key={data.nome}>
    <Row margin="0 0 15px 0">
      <Text
        fontSize="11px"
        lineHeight="21px"
        fontWeight="600"
        letterSpacing="1.5px"
      >
        {data.nome.toUpperCase()}
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
    {data.coberturasRisco.map(({ Nome, CapitalSegurado }) => (
      <Fragment key={Nome}>
        <Row>
          <Text fontSize="12px" lineHeight="22px" fontWeight="300">
            {Nome}
          </Text>
          <Text fontSize="12px" lineHeight="22px" fontWeight="300">
            {formatMoney(CapitalSegurado)}
          </Text>
        </Row>
      </Fragment>
    ))}
    <Divider />
  </Fragment>
)

BeneficiarioContent.propTypes = {
  data: PropTypes.object.isRequired,
}

ParcelContainer.propTypes = {
  data: PropTypes.object.isRequired,
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
}
