import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import { css } from 'styled-components/macro'

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
import commonStyles from 'styles/theme'

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
          <Breadcrumb crumbs={['Soluções', 'consórcio de VEÍCULO']} />
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
                  fill={commonStyles.colors.primary.light}
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
                  fill={commonStyles.colors.primary.light}
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
                  fill={commonStyles.colors.primary.light}
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
                  now={9}
                  max={12}
                  subtitle="parcelas"
                />

                <Button>acesse o app e faça seu lance</Button>
              </Invoice>
            </InvoiceContainer>
          </RightContent>
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

ManagementConsortiumBuilding.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
