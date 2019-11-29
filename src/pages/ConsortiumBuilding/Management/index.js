import React from 'react'
import PropTypes from 'prop-types'

import LinearProgressBar from '../../../components/LinearProgressBar'
import Breadcrumb from '../../../components/Breadcrumb'
import MoreDetails from '../../../components/Solutions/MoreDetails'
import HighlightSection from '../../../components/Solutions/HighlightSection'
import FileDownloadSection from '../../../components/Solutions/FileDownloadSection'

import Container from '../../../components/Management/Container'
import ManageableItem from '../../../components/Management/ManageableItem'
import PageContent from '../../../components/Management/PageContent'
import LeftNav from '../../../components/Management/LeftNav'
import RightContent from '../../../components/Management/RightContent'

import Icon from '../../../components/IconExporter'
import commonStyles from '../../../styles/theme'

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

export default function ManagementConsortiumBuilding({ history }) {
  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['Soluções', 'consórcio de imóvel']} />
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

            <ManageableItem>
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
          </LeftNav>
          <RightContent>
            <PageTitle>Contrato 1</PageTitle>
            <Topics settings={settings}>
              <Topic>
                <Icon
                  width="28"
                  fill={commonStyles.colors.lightPrimary}
                  name="computersecure"
                />
                <div>
                  <TopicTitle>Cota</TopicTitle>
                  <TopicValue>999</TopicValue>
                </div>
              </Topic>
              <Topic>
                <Icon
                  width="28"
                  fill={commonStyles.colors.lightPrimary}
                  name="persongroup2"
                />
                <div>
                  <TopicTitle>grupo</TopicTitle>
                  <TopicValue>x999</TopicValue>
                </div>
              </Topic>
              <Topic>
                <Icon
                  width="28"
                  fill={commonStyles.colors.lightPrimary}
                  name="coin"
                />
                <div>
                  <TopicTitle>Crédito contratado</TopicTitle>
                  <TopicValue>R$ 99.999,99</TopicValue>
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
                  <Text>R$ 99.999,95</Text>
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
                  <Text>R$ 99.999,00</Text>
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
                  now={10}
                  max={12}
                  subtitle="parcelas"
                />
              </Invoice>
            </InvoiceContainer>
          </RightContent>
        </PageContent>
      </Container>
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="O Conquista acompanha você na realização do sonho do imóvel próprio."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo entre as opções parcela mensal e
        crédito total. Assim, conhece os planos disponíveis e contrata de acordo com seus interesses."
        buttonText="SIMULAR E CONTRATAR"
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-01',
            imgPath: 'consortium/building',
            imgTitle: 'Tente um lance',
            imgDescription:
              'Você não precisa contar apenas com a sorte para ser contemplado no consórcio. Todos os meses, há a possibilidade de você dar um lance maior do que o valor ofertado por outros participantes do seu grupo para conquistar o seu sonho.',
          },
          {
            img: 'carousel-02',
            imgPath: 'consortium/building',
            imgTitle: 'FGTS para o lance',
            imgDescription:
              'O lance para tentar antecipar o valor do consórcio pode sair diretamente do seu bolso, mas você também pode utilizar seu FGTS (Fundo de Garantia por Tempo de Serviço). Ele rende pouco ao ficar parado e pode ser uma maneira para você ser contemplado antecipadamente.',
          },
          {
            img: 'carousel-03',
            imgPath: 'consortium/building',
            imgTitle: 'Combine mais de um consórcio',
            imgDescription:
              'Os valores dos consórcios são sempre fixos e, nem sempre, o valor de um único consórcio é suficiente para realizar a compra de um bem mais caro, como uma casa, por exemplo. Mas você pode combinar mais de um consórcio para chegar no valor que precisa.',
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

ManagementConsortiumBuilding.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
