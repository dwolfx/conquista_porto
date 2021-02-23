import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ThemeContext } from 'styled-components/macro'

import MoreDetails from 'components/Solutions/MoreDetails'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import Container from 'components/Management/Container'
import ManageableItem from 'components/Management/ManageableItem'
import PageContent from 'components/Management/PageContent'
import LeftNav from 'components/Management/LeftNav'
import RightContent from 'components/Management/RightContent'
import Icon from 'components/IconExporter'
import TopicsIconContent from 'components/TopicsIconContent'
import { OpenCreationLayer } from 'store/modules/CreditCard/action'

import { formatMoney } from 'helpers'
import useFetchCreditCard from 'hooks/CreditCard/useFetchCreditCard'

import Creation from '../Creation'

import {
  AddBtnLink,
  PageTitle,
  Topic,
  TopicTitle,
  TopicValue,
  InvoiceContainer,
  InvoiceHeader,
  Invoice,
  InvoiceItem,
  DateContent,
  Text,
} from './styles'

const downloadFileSectionData = [
  {
    title: 'SISTEMA DE INFORMAÇÕES DE CRÉDITO - SCR',
    description: 'Informações legais sobre crédito.',
    buttonText: 'BAIXAR ARQUIVO',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
  {
    title: 'TABELA DE TARIFAS',
    description:
      'Mais informações sobre tarifas envolvidas na contratação de cartão de crédito.',
    buttonText: 'Visualizar',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
  {
    title: 'CONDIÇÕES GERAIS',
    description:
      'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Cartão de Crédito da Porto Seguro.',
    buttonText: 'BAIXAR ARQUIVO',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'Parcelando as compras',
    imgDescription:
      'O Cartão de Crédito Porto Seguro permite parcelar as compras, dando a opção de usar seu limite para outras finalidades. Mas, apesar dessa vantagem, é preciso ficar atento ao limite, que será reduzido com o valor total das compras e não apenas com as parcelas referentes ao mês.',
    imgPath: 'creditCard',
  },
  {
    img: 'carousel-02',
    imgTitle: 'Ferramenta de controle',
    imgDescription:
      'Com o Cartão de Crédito Porto Seguro, você pode ter suas despesas registradas na fatura para facilitar seu controle financeiro. E também pode parcelar compras para resolver problemas sem que eles comprometam seu orçamento, além de contar com o limite para não se exceder.',
    imgPath: 'creditCard',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Relacionamento',
    imgDescription:
      'Concentrando o pagamento das compras no Cartão de Crédito Porto Seguro, você pode acumular pontos para trocar por descontos em seguros e por serviços para a casa ou para o carro. Ou pode optar por trocar por produtos de lojas parceiras ou por milhas aéreas.',
    imgPath: 'creditCard',
  },
]

export default function ManagementCreditCard() {
  const [selectedCreditCard, setSelectedCreditCard] = useState(null)

  const themeContext = useContext(ThemeContext)
  const dispatch = useDispatch()
  const creditCard = useSelector(state => state.creditCard)
  // const { state: locationState } = useLocation()

  useFetchCreditCard()

  useEffect(() => {
    if (creditCard.data && creditCard.data.length) {
      setSelectedCreditCard(creditCard.data[0].UltimosDigitos)
    }
  }, [creditCard.data])

  function scrollPage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (creditCard.data && selectedCreditCard) {
    return (
      <>
        <Container>
          <PageContent id="cc-top-page">
            <LeftNav>
              <AddBtnLink
                data-gtm-type="click"
                data-gtm-clicktype="card"
                data-gtm-subname="card custodia visualizar"
                data-gtm-name="adicionar"
                onClick={() => dispatch(OpenCreationLayer())}
              >
                <Icon width="48" fill={themeContext.colors.gray3} name="add" />
                <Text fontColor={themeContext.colors.gray4} fontSize="14px">
                  Adicionar
                </Text>
              </AddBtnLink>

              {creditCard.data.map(item => (
                <ManageableItem
                  key={item.UltimosDigitos}
                  data-gtm-type="click"
                  data-gtm-clicktype="card"
                  data-gtm-subname="card custodia visualizar"
                  data-gtm-name="mundo 120 prata"
                  active={selectedCreditCard === item.UltimosDigitos}
                  onClick={() => {
                    setSelectedCreditCard(item.UltimosDigitos)
                    scrollPage()
                  }}
                >
                  <Text
                    fontSize="11px"
                    fontWeight={600}
                    letterSpacing="1.5px"
                    margin="0 0 7px 0"
                  >
                    BANDEIRA
                  </Text>
                  <Text fontSize="14px">{item.Bandeira}</Text>
                </ManageableItem>
              ))}
            </LeftNav>
            {creditCard.data.map(item => (
              <RightContent
                key={item.UltimosDigitos}
                isSelected={item.UltimosDigitos === selectedCreditCard}
              >
                <PageTitle>Cartão de crédito Porto Seguro</PageTitle>
                <TopicsIconContent>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="tag"
                    />
                    <div>
                      <TopicTitle>bandeira</TopicTitle>
                      <TopicValue>{item.Bandeira}</TopicValue>
                    </div>
                  </Topic>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="creditcard"
                    />
                    <div>
                      <TopicTitle>tipo</TopicTitle>
                      <TopicValue>{item.Tipo}</TopicValue>
                    </div>
                  </Topic>
                  <Topic>
                    <Icon
                      width="28"
                      fill={themeContext.colors.blue4}
                      name="lock"
                    />
                    <div>
                      <TopicTitle>4 últimos numeros</TopicTitle>
                      <TopicValue>{item.UltimosDigitos}</TopicValue>
                    </div>
                  </Topic>
                </TopicsIconContent>
                <InvoiceContainer>
                  <InvoiceHeader>
                    <DateContent>
                      <Text
                        fontSize="22px"
                        margin="0 0 7px 0"
                        lineHeight="32px"
                        textAlign="center"
                      >
                        Vencimento da Fatura
                      </Text>
                      <Text>{item.Fatura.Vencimento}</Text>
                    </DateContent>
                    <DateContent>
                      <Text
                        fontSize="18px"
                        margin="0 0 14px 0"
                        lineHeight="28px"
                        textAlign="center"
                      >
                        Melhor dia de compra
                      </Text>
                      <Text>{item.Fatura.MelhorDataCompra}</Text>
                    </DateContent>
                  </InvoiceHeader>
                  <Invoice>
                    <Text
                      fontSize="18px"
                      margin="0 0 14px 0"
                      lineHeight="28px"
                      textAlign="center"
                    >
                      Fatura Fechada
                    </Text>
                    <InvoiceItem>
                      <Text>{item.Fatura.Status}</Text>
                      <Text>{formatMoney(item.Fatura.Valor)}</Text>
                    </InvoiceItem>
                  </Invoice>
                </InvoiceContainer>
              </RightContent>
            ))}
          </PageContent>
        </Container>
        <HighlightSection
          title="O cartão cheio de vantagens."
          mainDescription="Descontos em seguros para você, para sua casa e para seu carro."
          subDescription="Além das conveniências da Porto Seguro, o Cartão de Crédito tem bandeiras e limites para
        vários perfis. Inclusive, na simulação, você pode verificar se há pré-aprovações para você."
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
          onClick={() => dispatch(OpenCreationLayer())}
        />
        <MoreDetails title="Saiba mais:" data={moreDetailsData} />
        <FileDownloadSection data={downloadFileSectionData} />
        {creditCard.isCreationLayerOpen && (
          <Creation isOpen={creditCard.isCreationLayerOpen} />
        )}
      </>
    )
  }

  return null
}
