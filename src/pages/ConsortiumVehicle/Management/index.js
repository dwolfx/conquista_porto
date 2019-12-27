import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import { ThemeContext } from 'styled-components/macro'
import { useSelector } from 'react-redux'

import LinearProgressBar from 'components/LinearProgressBar'
import Button from 'components/Button'
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

import useFetchConsortiumVehicle from 'hooks/ConsortiumVehicle/useFetchConsortiumVehicle'
import { formatMoney } from 'helpers'

import {
  BreadcrumbContainer,
  AddBtnLink,
  PageTitle,
  Topics,
  Topic,
  TopicTitle,
  TopicValue,
  InvoiceContainer,
  InvoiceHeader,
  Invoice,
  InstallmentContent,
  Text,
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

export default function ManagementConsortiumVehicle({ history }) {
  useFetchConsortiumVehicle()

  const [selectedConsortiumVehicle, setSelectedConsortiumVehicle] = useState(
    null
  )

  const themeContext = useContext(ThemeContext)
  const consortiumVehicle = useSelector(state => state.consortiumVehicle)

  useEffect(() => {
    if (consortiumVehicle.data.length) {
      setSelectedConsortiumVehicle(consortiumVehicle.data[0].id)
    }
  }, [consortiumVehicle.data])

  function scrollPage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['Soluções', 'consórcio de VEÍCULO']} />
        </BreadcrumbContainer>
        <PageContent id="consortium-vehicle-top-page">
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

            {consortiumVehicle.data.map(item => (
              <ManageableItem
                key={item.id}
                active={selectedConsortiumVehicle === item.id}
                onClick={() => {
                  setSelectedConsortiumVehicle(item.id)
                  scrollPage(`consortium-vehicle-top-page`)
                }}
              >
                <Text
                  fontSize="14px"
                  lineHeight="19px"
                  margin="0 0 14px 0"
                  textAlign="center"
                >
                  Contrato 1
                </Text>
                <Text
                  fontSize="11px"
                  fontWeight={600}
                  letterSpacing="1.5px"
                  margin="0 0 7px 0"
                >
                  STATUS
                </Text>
                <Text fontSize="14px">Contemplado</Text>
              </ManageableItem>
            ))}
          </LeftNav>
          {consortiumVehicle.data.map((item, index) => (
            <RightContent
              key={item.id}
              isSelected={item.id === selectedConsortiumVehicle}
            >
              <PageTitle>Contrato {index + 1}</PageTitle>
              <Topics settings={settings}>
                <Topic>
                  <Icon
                    width="28"
                    fill={themeContext.colors.blue4}
                    name="computersecure"
                  />
                  <div>
                    <TopicTitle>Cota</TopicTitle>
                    <TopicValue>{item.cota}</TopicValue>
                  </div>
                </Topic>
                <Topic>
                  <Icon
                    width="28"
                    fill={themeContext.colors.blue4}
                    name="persongroup2"
                  />
                  <div>
                    <TopicTitle>grupo</TopicTitle>
                    <TopicValue>{item.grupo}</TopicValue>
                  </div>
                </Topic>
                <Topic>
                  <Icon
                    width="28"
                    fill={themeContext.colors.blue4}
                    name="coin"
                  />
                  <div>
                    <TopicTitle>Crédito contratado</TopicTitle>
                    <TopicValue>{formatMoney(item.valorContratado)}</TopicValue>
                  </div>
                </Topic>
              </Topics>
              <InvoiceContainer>
                <InvoiceHeader>
                  <InstallmentContent>
                    <Text
                      fontSize="22px"
                      margin="0 0 7px 0"
                      lineHeight="32px"
                      textAlign="center"
                    >
                      Valor para quitação
                    </Text>
                    <Text>{formatMoney(item.valorQuitacao)}</Text>
                  </InstallmentContent>
                  <InstallmentContent>
                    <Text
                      fontSize="22px"
                      margin="0 0 7px 0"
                      lineHeight="32px"
                      textAlign="center"
                    >
                      Valor da parcela atual
                    </Text>
                    <Text>{formatMoney(item.valorParcelaAtual)}</Text>
                  </InstallmentContent>
                </InvoiceHeader>
                <Invoice>
                  <Text
                    fontSize="18px"
                    margin="0 0 14px 0"
                    lineHeight="28px"
                    textAlign="center"
                  >
                    Evolução do pagamento
                  </Text>

                  <LinearProgressBar
                    width="70%"
                    margin="70px 0 0 0"
                    now={item.quantidadeParcelasPagas}
                    max={item.quantidadeParcelasContratadas}
                    subtitle="parcelas"
                  />

                  <Button>acesse o app e faça seu lance</Button>
                </Invoice>
              </InvoiceContainer>
            </RightContent>
          ))}
        </PageContent>
      </Container>
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="Com o Conquista, você planeja a compra do seu carro novo ou seminovo."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo entre as opções parcela mensal e crédito total. Assim, conhece os planos disponíveis e contrata de acordo com seus interesses."
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
            description:
              'Aqui, você tem mais informações legais sobre consórcio.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Consórcio de Imóveis da Porto Seguro.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'TABELA DE TARIFAS',
            description:
              'Confira mais informações sobre tarifas envolvidas na contratação de consórcio.',
            buttonText: 'BAIXAR ARQUIVO',
          },
        ]}
      />
    </>
  )
}

ManagementConsortiumVehicle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
