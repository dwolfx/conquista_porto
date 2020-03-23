import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { useSelector } from 'react-redux'

import LinearProgressBar from 'components/LinearProgressBar'
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

import useFetchConsortiumBuilding from 'hooks/ConsortiumBuilding/useFetchConsortiumBuilding'
import { formatMoney, handleGiwRedirect } from 'helpers'

import {
  AddBtnLink,
  PageTitle,
  Topic,
  TopicTitle,
  TopicValue,
  InvoiceContainer,
  InvoiceHeader,
  Invoice,
  InstallmentContent,
  Text,
} from './styles'

export default function ManagementConsortiumBuilding() {
  const [selectedConsortiumBuilding, setSelectedConsortiumBuilding] = useState(
    null
  )

  const themeContext = useContext(ThemeContext)
  const consortiumBuilding = useSelector(state => state.consortiumBuilding.data)

  useFetchConsortiumBuilding()

  useEffect(() => {
    if (consortiumBuilding) {
      setSelectedConsortiumBuilding(consortiumBuilding[0].Id)
    }
  }, [consortiumBuilding])

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
        <PageContent id="consortium-building-top-page">
          <LeftNav>
            <AddBtnLink
              data-gtm-type="click"
              data-gtm-clicktype="card"
              data-gtm-subname="card custodia visualizar"
              data-gtm-name="adcionar"
              onClick={() => {
                handleGiwRedirect(
                  'portaldecliente/conquista/consorcio-de-imoveis/simular?r=true'
                )
              }}
            >
              <Icon width="48" fill={themeContext.colors.gray3} name="add" />
              <Text fontColor={themeContext.colors.gray4} fontSize="14px">
                Adicionar
              </Text>
            </AddBtnLink>

            {consortiumBuilding
              ? consortiumBuilding.map((item, index) => (
                  <ManageableItem
                    key={item.Id}
                    data-gtm-type="click"
                    data-gtm-clicktype="card"
                    data-gtm-subname="card custodia visualizar"
                    data-gtm-name={`contrato ${index + 1}`}
                    active={selectedConsortiumBuilding === item.Id}
                    onClick={() => {
                      setSelectedConsortiumBuilding(item.id)
                      scrollPage(`consortium-building-top-page`)
                    }}
                  >
                    <Text
                      fontSize="14px"
                      lineHeight="19px"
                      margin="0 0 14px 0"
                      textAlign="center"
                    >
                      Contrato {index + 1}
                    </Text>
                    <Text
                      fontSize="11px"
                      fontWeight={600}
                      letterSpacing="1.5px"
                      margin="0 0 7px 0"
                    >
                      STATUS
                    </Text>
                    <Text fontSize="14px">{item.StatusConsorcio}</Text>
                  </ManageableItem>
                ))
              : null}
          </LeftNav>
          {consortiumBuilding
            ? consortiumBuilding.map((item, index) => (
                <RightContent
                  key={item.Id}
                  isSelected={item.Id === selectedConsortiumBuilding}
                >
                  <PageTitle>Contrato {index + 1}</PageTitle>
                  <TopicsIconContent>
                    <Topic>
                      <Icon
                        width="28"
                        fill={themeContext.colors.blue4}
                        name="computersecure"
                      />
                      <div>
                        <TopicTitle>Cota</TopicTitle>
                        <TopicValue>{item.Cota}</TopicValue>
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
                        <TopicValue>{item.Grupo}</TopicValue>
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
                        <TopicValue>
                          {formatMoney(item.ValorContratado)}
                        </TopicValue>
                      </div>
                    </Topic>
                  </TopicsIconContent>
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
                        <Text>{formatMoney(item.ValorQuitacao)}</Text>
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
                        <Text>{formatMoney(item.ValorParcelaAtual)}</Text>
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
                        now={item.QuantidadeParcelasPagas}
                        max={item.QuantidadeParcelasContratadas}
                        subtitle="parcelas"
                      />
                    </Invoice>
                  </InvoiceContainer>
                </RightContent>
              ))
            : null}
        </PageContent>
      </Container>
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="O Conquista acompanha você na realização do sonho do imóvel próprio."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo entre as opções parcela mensal e
        crédito total. Assim, conhece os planos disponíveis e contrata de acordo com seus interesses."
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
        onClick={() =>
          handleGiwRedirect(
            'portaldecliente/conquista/consorcio-de-imoveis/simular?r=true'
          )
        }
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
            willRedirect: false,
          },
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Consórcio de Imóveis da Porto Seguro.',
            buttonText: 'BAIXAR ARQUIVO',
            willRedirect: false,
            url:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-imoveis/consorcio-imoveis/regulamento_consorcio_de_imovel.pdf',
          },
          {
            title: 'TABELA DE TARIFAS',
            description:
              'Confira mais informações sobre tarifas envolvidas na contratação de consórcio.',
            buttonText: 'BAIXAR ARQUIVO',
            willRedirect: false,
          },
        ]}
      />
    </>
  )
}
