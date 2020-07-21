import React, { useState, useContext, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { css, ThemeContext } from 'styled-components/macro'

import { useSelector } from 'react-redux'

import MoreDetails from 'components/Solutions/MoreDetails'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'

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
      'Confira mais detalhes sobre as condições de contratação e outras informações sobre o Seguro de Vida da Porto Seguro.',
    willRedirect: false,
    url:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/CGs/vida_individual_/vida_e_acidentes_pessoais%20_individual_anual.pdf',
    buttonText: 'Baixar Arquivo',
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'Seguro como proteção familiar',
    imgDescription:
      'O seguro de vida é uma boa maneira de garantir segurança financeira às pessoas que você ama. Com ele, você continua proporcionando um padrão de vida de qualidade aos seus entes queridos, caso você falte um dia.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-02',
    imgTitle: 'Outras coberturas',
    imgDescription:
      'O seguro de vida não vale só em caso de morte. Dependendo das coberturas da apólice contratada, seu valor também pode ser utilizado em casos de doenças graves e invalidez por acidente total ou parcial entre outros.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Seguro para profissionais',
    imgDescription:
      'A DIT (Diária por Incapacidade Temporária) é indicada para profissionais liberais, que podem contar com o seguro para garantir seus rendimentos em caso de acidente que os afaste do trabalho.',
    imgPath: 'lifeInsurance',
  },
]

export default function ManagementLifeInsurance() {
  useFetchLifeInsurance()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedLifeInsurance, setSelectedLifeInsurance] = useState(null)
  const themeContext = useContext(ThemeContext)
  const { state: locationState } = useLocation()

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

  const handleCoberturaMorte = item => {
    const coberturas = Array.isArray(item.CoberturasBasicas)
      ? item.CoberturasBasicas
      : [item.CoberturasBasicas.CoberturaBasica]

    const coberturaPorMorte = coberturas.find(
      curr => curr.Nome.toLowerCase() === 'morte acidental'
    )
    return (
      <>
        <Text>Morte</Text>
        <Text>{formatMoney(coberturaPorMorte.CapitalSegurado)}</Text>
      </>
    )
  }

  const addedInsurancePoliciesDetailed = () => {
    const { GruposCobertura: gruposCobertura } = selectedLifeInsurance

    const normalizedPayload = gruposCobertura.map(grupoCobertura => ({
      nome: grupoCobertura.Nome,
      coberturasRisco: Array.isArray(grupoCobertura.CoberturasRisco)
        ? grupoCobertura.CoberturasRisco
        : [grupoCobertura.CoberturasRisco],
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
          <PageContent id="life-insurance-top-page">
            <LeftNav>
              <AddBtnLink
                data-gtm-type="click"
                data-gtm-clicktype="card"
                data-gtm-subname="card custodia visualizar"
                data-gtm-name="adicionar"
                onClick={() => {
                  handleGiwRedirect(
                    `portaldecliente/conquista/seguro-de-vida/simular?r=true${
                      (locationState || {}).idGoal
                        ? `&idObjetivo=${(locationState || {}).idGoal}`
                        : ''
                    }`
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
                    {moment(item.DtFinalVigencia).format('DD-MM-YYYY')}
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
                      {handleCoberturaMorte(selectedLifeInsurance)}
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
                        willRedirect: false,
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
          buttonText="EM BREVE"
        />
        <MoreDetails title="Saiba mais:" data={moreDetailsData} />
        <FileDownloadSection data={downloadFileSectionData} />

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
  const beneficiaries = Array.isArray(data.Beneficiarios)
    ? data.Beneficiarios
    : [data.Beneficiarios]
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
            <tr key={element.Nome}>
              <td align="center">{element.Nome}</td>
              <td align="center">{element.Percentual}%</td>
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
      <TopicTitle>Forma de pagamento</TopicTitle>
      <TopicValue>{data.descricaoFormaPagamento}</TopicValue>
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
