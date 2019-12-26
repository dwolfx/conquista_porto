import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'
import { ResponsiveLine } from '@nivo/line'

import Breadcrumb from 'components/Breadcrumb'
import Button from 'components/Button'
import SelectInput from 'components/Inputs/Select'

import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import FundsCarouselSection from 'components/Solutions/Investments/FundsCarousel'

import Container from 'components/Management/Container'
import ManageableItem from 'components/Management/ManageableItem'
import PageContent from 'components/Management/PageContent'

import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import RedHairGirlImage from 'assets/images/red_hair_girl.jpg'
import AnbimaImage from 'assets/images/logo-anbima.png'
import useMedia from 'hooks/useMedia'
import GeneralView from './GeneralView'

import {
  LeftNav,
  MiddleContent,
  GeneralInfo,
  BreadcrumbContainer,
  AddBtnLink,
  PageTitle,
  Topics,
  Topic,
  TopicTitle,
  TopicValue,
  BalanceAccordion,
  Section,
  HeaderNodeBalanceAccordion,
  CurrentBalance,
  GrossIncome,
  ChartContainer,
  ChartTooltip,
  Text,
  SectionCustomPicture,
  CustomContent,
  Picture,
  DescriptionContent,
  Table,
  RowBankTransition,
  BankTransitionDateWrapper,
  CompleteExtract,
  ComplementaryInfo,
  AnbimaContainer,
  AccordionGeneralInfo,
} from './styles'

const downloadFileSectionData = [
  {
    title: 'QUADRO DE RENTABILIDADE',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Investimentos da Porto Seguro.',
    buttonText: 'BAIXAR ARQUIVO',
  },
  {
    title: 'CARTA DO GESTOR',
    description:
      'Comentários sobre a estratégia dos fundos de Investimentos e, também, um pouco da visão do cenário econômico atual.',
    buttonText: 'BAIXAR ARQUIVO',
  },
]

const complementaryInfo = [
  {
    title: 'Programa de relacionamento',
    description: (
      <span>
        Com este produto você acumulou:
        <br />{' '}
        <Text lineHeight="32px" fontSize="22px">
          210 pontos
        </Text>
      </span>
    ),
    buttonText: 'Ver extrato',
    icon: 'diamond',
  },
  {
    title: 'Informativo de desempenho',
    description:
      'Material técnico, com gráficos, informações e histórico do fundo.',
    buttonText: 'BAIXAR ARQUIVO',
  },
]

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

const months = [
  {
    name: 'Último mês',
    value: 1,
  },
  {
    name: '12 meses',
    value: 2,
  },
  {
    name: '24 meses',
    value: 3,
  },
  {
    name: '36 meses',
    value: 4,
  },
]

export default function ManagementInvestments({ history }) {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')

  return (
    <>
      <Container>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['Soluções', 'investimentos']} />
        </BreadcrumbContainer>
        <PageContent>
          <LeftNav>
            <AddBtnLink
              onClick={() => {
                history.push('/')
              }}
            >
              <Icon width="48" fill={theme.colors.gray3} name="add" />
              <Text fontColor={theme.colors.gray4} fontSize="14px">
                Lista de Fundos
              </Text>
            </AddBtnLink>

            <ManageableItem>
              <Text
                fontSize="11px"
                lineHeight="15px"
                margin="0 0 14px 0"
                textAlign="center"
                fontWeight="600"
                letterSpacing="1.5px"
              >
                INVESTIMENTO NO EXTERIOR
              </Text>
              <Text fontSize="15px" textAlign="center">
                Porto Seguro Crédito Privado
              </Text>
            </ManageableItem>
          </LeftNav>
          <MiddleContent>
            <PageTitle>
              Porto Seguro FI RF Referenciado DI Crédito Privado
            </PageTitle>
            <div>
              <Topics settings={settings}>
                <Topic>
                  <Icon width="28" fill={theme.colors.blue4} name="time" />
                  <div>
                    <TopicTitle>perfil de risco</TopicTitle>
                    <TopicValue>Médio</TopicValue>
                  </div>
                </Topic>
                <Topic>
                  <Icon width="28" fill={theme.colors.blue4} name="coin" />
                  <div>
                    <TopicTitle>Movimentações Mín.</TopicTitle>
                    <TopicValue>R$ 1.000,00</TopicValue>
                  </div>
                </Topic>
                <Topic>
                  <Icon
                    width="28"
                    fill={theme.colors.blue4}
                    name="monitoranalytics"
                  />
                  <div>
                    <TopicTitle>Cotização/liquidação</TopicTitle>
                    <TopicValue>D+0</TopicValue>
                  </div>
                </Topic>
              </Topics>
              <BalanceAccordion
                isOrangeArrow
                titleNode={
                  <HeaderNodeBalanceAccordion>
                    <Text>Saldo Bruto atual</Text>
                    <Text>R$ 50.000,00</Text>
                    <Text>01/03/2019</Text>
                  </HeaderNodeBalanceAccordion>
                }
              >
                <CurrentBalance>
                  <RowBankTransition>
                    <BankTransitionDateWrapper>
                      <Icon
                        name="add"
                        fill={theme.colors.green3}
                        width="16px"
                      />
                      <Text
                        fontSize="15px"
                        lineHeight="28px"
                        fontWeight="300"
                        margin="0 0 0 6px"
                      >
                        Saldo bruto
                      </Text>
                    </BankTransitionDateWrapper>
                    <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                      R$ 100.000,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition marginTop="4px">
                    <BankTransitionDateWrapper>
                      <Icon
                        name="remove"
                        fill={theme.colors.magenta2}
                        width="16px"
                      />
                      <Text
                        fontSize="15px"
                        lineHeight="28px"
                        fontWeight="300"
                        margin="0 0 0 6px"
                      >
                        Saldo bloqueado
                      </Text>
                    </BankTransitionDateWrapper>
                    <Text fontSize="15px" lineHeight="28px" fontWeight="300">
                      R$ 9.990,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition
                    marginTop="4px"
                    borderTop={`1px solid ${theme.colors.gray3}`}
                  >
                    <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                      Saldo disponível
                    </Text>
                    <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                      R$ 80.000,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition marginTop="14px">
                    <BankTransitionDateWrapper>
                      <Icon
                        name="remove"
                        fill={theme.colors.magenta2}
                        width="16px"
                      />
                      <Text
                        fontSize="15px"
                        lineHeight="28px"
                        fontWeight="300"
                        margin="0 0 0 6px"
                      >
                        IR*
                      </Text>
                    </BankTransitionDateWrapper>
                    <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                      R$ 200,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition marginTop="4px">
                    <BankTransitionDateWrapper>
                      <Icon
                        name="remove"
                        fill={theme.colors.magenta2}
                        width="16px"
                      />
                      <Text
                        fontSize="15px"
                        lineHeight="28px"
                        fontWeight="300"
                        margin="0 0 0 6px"
                      >
                        IOF*
                      </Text>
                    </BankTransitionDateWrapper>
                    <Text fontSize="16px" lineHeight="24px" fontWeight="300">
                      R$ 79.750,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition
                    marginTop="4px"
                    borderTop={`1px solid ${theme.colors.gray3}`}
                  >
                    <Text fontSize="15px" lineHeight="28px" fontWeight="bold">
                      Saldo líquido
                    </Text>
                    <Text fontSize="16px" lineHeight="24px" fontWeight="bold">
                      R$ 79.750,00
                    </Text>
                  </RowBankTransition>
                  <RowBankTransition marginTop="14px">
                    <Text
                      fontSize="15px"
                      lineHeight="25px"
                      fontWeight="bold"
                      fontColor={theme.colors.blue4}
                    >
                      Movimentações pendentes
                    </Text>
                    <Text fontSize="16px" lineHeight="28px" fontWeight="300">
                      R$ 12.000,00
                    </Text>
                  </RowBankTransition>
                  <Text
                    fontSize="12px"
                    lineHeight="1.3"
                    fontColor={theme.colors.gray5}
                  >
                    O saldo refere-se ao valor na data de 01/03/2019 e será
                    atualizado no decorrer do dia. Resgastes realizados estarão
                    sujeitos à confirmação.
                    <br />
                    <br />* Valores estimados
                  </Text>
                </CurrentBalance>
              </BalanceAccordion>
              <GrossIncome>
                <Text>Rendimento Bruto</Text>
                <Text>R$ 99.999,00</Text>
                <SelectInput width={40} paddingRight={15} options={months} />
              </GrossIncome>
            </div>
            <Section>
              <Text>Evolução do saldo</Text>
              <ChartContainer>
                <ResponsiveLine
                  data={[
                    {
                      id: 'balance',
                      color: theme.colors.blue4,
                      data: [
                        {
                          x: '01/10/2018',
                          y: 4900,
                        },
                        {
                          x: '01/11/2018',
                          y: 4230,
                        },
                        {
                          x: '01/12/2018',
                          y: 5600,
                        },
                        {
                          x: '01/01/2019',
                          y: 6000,
                        },
                        {
                          x: '01/02/2019',
                          y: 5000,
                        },
                      ],
                    },
                  ]}
                  margin={{ top: 50, right: 20, bottom: 70, left: 90 }}
                  yFormat={formatMoney}
                  axisLeft={{ format: formatMoney }}
                  xScale={{ type: 'point' }}
                  enableSlices="x"
                  yScale={{
                    type: 'linear',
                    stacked: true,
                    min: 0,
                    max: 'auto',
                  }}
                  sliceTooltip={({ slice }) => (
                    <ChartTooltip>
                      {slice.points.map(point => (
                        <span key={point.id}>{point.data.yFormatted}</span>
                      ))}
                    </ChartTooltip>
                  )}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: 'bottom',
                    tickPadding: 10,
                    tickRotation: -54,
                  }}
                  colors={{ scheme: 'category10' }}
                  pointColor={{ from: 'color' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'color' }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  enableArea
                  useMesh
                  legends={[]}
                />
              </ChartContainer>
            </Section>
            <Section>
              <Text>Histórico de Rentabilidade</Text>
              <Table tableWidth="80%">
                <thead>
                  <tr>
                    <th>{}</th>
                    <th align="center">MÊS ANTERIOR</th>
                    <th align="center">12 MESES</th>
                    <th align="center">24 MESES</th>
                    <th align="center">36 MESES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">Rentabilidade em %</td>
                    <td align="center">0,47%</td>
                    <td align="center">6,63%</td>
                    <td align="center">19%</td>
                    <td align="center">37%</td>
                  </tr>
                  <tr>
                    <td align="center">Referência em CDI *</td>
                    <td align="center">100%</td>
                    <td align="center">100%</td>
                    <td align="center">103%</td>
                    <td align="center">103%</td>
                  </tr>
                </tbody>
              </Table>
              <Text fontSize="12px" lineHeight="22px">
                *O CDI é uma referência do mercado para quanto seu dinheiro pode
                render. A referência é dada com base no valor ganho pelos bancos
                de um dia para outro.
              </Text>
            </Section>
            <Section>
              <Text>Últimas Movimentações</Text>
              <RowBankTransition width="310px" marginTop="22px">
                <BankTransitionDateWrapper>
                  <Icon name="add" fill={theme.colors.green3} width="14px" />
                  <Text
                    fontSize="12px"
                    lineHeight="22px"
                    fontWeight="300"
                    margin="0 0 0 6px"
                  >
                    31/10/2018
                  </Text>
                </BankTransitionDateWrapper>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  Aplicação
                </Text>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  R$ 9.990,00
                </Text>
              </RowBankTransition>
              <RowBankTransition width="310px" marginTop="22px">
                <BankTransitionDateWrapper>
                  <Icon
                    name="remove"
                    fill={theme.colors.magenta2}
                    width="14px"
                  />
                  <Text
                    fontSize="12px"
                    lineHeight="22px"
                    fontWeight="300"
                    margin="0 0 0 6px"
                  >
                    31/10/2018
                  </Text>
                </BankTransitionDateWrapper>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  Resgate Bruto
                </Text>
                <Text fontSize="13px" lineHeight="24px" fontWeight="400">
                  R$ 9.990,00
                </Text>
              </RowBankTransition>
              <CompleteExtract>Extrato Completo &gt;</CompleteExtract>
            </Section>
            <ComplementaryInfo>
              <Text
                margin="22px 0"
                lineHeight="21px"
                letterSpacing="1.5px"
                fontColor={theme.colors.gray6}
                fontWeight="600"
                fontSize="11px"
              >
                INFORMAÇÕES COMPLEMENTARES
              </Text>
              <FileDownloadSection
                data={complementaryInfo}
                backgroundColor="inherit"
              />
            </ComplementaryInfo>
          </MiddleContent>
          {isMobile ? (
            <AccordionGeneralInfo
              isOrangeArrow
              titleNode="Carteira de investimentos"
            >
              <GeneralInfo>
                <GeneralView />
              </GeneralInfo>
            </AccordionGeneralInfo>
          ) : (
            <GeneralInfo>
              <GeneralView />
            </GeneralInfo>
          )}
          {/* <GeneralInfo>
            <GeneralView />
          </GeneralInfo> */}
        </PageContent>
        <AnbimaContainer>
          <Text fontSize="12px" lineHeight="22px" margin="0 0 45px 0">
            Porto Seguro Investimentos informa os cotistas que o Distribuidor de
            cotas dos Fundos poderá receber remuneração de distribuição do(s)
            administrador(es) e/ou dos Fundos de Investimento em que seus
            clientes aplicarem recursos, seja na forma de investimento direto,
            seja por meio de conta e ordem; Esta remuneração poderá ser
            diferenciada em função dos diversos Fundos de Investimento
            investidos. Leia o formulário de informações complementares, a
            lâmina de informações essenciais, se houver, e o regulamento antes
            de investir. Confira a Lâmina de Informações Essenciais, o
            Demonstrativo de Desempenho e o Formulário de Informações
            Complementares - INTRAG/CVM.
            <Text
              fontSize="12px"
              lineHeight="22px"
              fontColor={theme.colors.blue4}
              fontWeight="bold"
            >
              ACESSE AQUI.
            </Text>
            A Porto Seguro Investimentos pode receber eventuais serviços
            adicionais fornecidos por Corretoras em razão de sua contratação e
            relacionamento. A Portopar DTVM recebe remuneração de distribuição
            do(s) Administrador(es) e/ou do(s) Fundo(s) de Investimento em que
            seus clientes aplicam recursos, seja na forma de investimento
            direto, seja por meio de conta e ordem e que esta remuneração pode
            ser diferenciada em função dos diversos Fundos de Investimento
            investidos.
          </Text>
          <img src={AnbimaImage} width="486px" alt="Logo empresa Anbima" />
        </AnbimaContainer>
      </Container>
      <HighlightSection
        title="Facilidade para investir"
        mainDescription="Com o Conquista, é prático e rápido investir."
        subDescription="Você confere as opções disponíveis na Lista de Fundo, consulta
        informações detalhadas de cada um e realiza seus investimentos com a
        segurança de uma plataforma da Porto Seguro."
        buttonText="lista de fundos"
      />
      <SectionCustomPicture backgroundColor="#d6dde5">
        <CustomContent>
          <Picture>
            <img src={RedHairGirlImage} alt="Mulher feliz" />
          </Picture>
          <DescriptionContent>
            <h1>Investindo em objetivos</h1>
            <p>
              No Conquista, você tem total controle para escolher os Fundos de
              Investimentos que preferir, além de auxílio inteligente para
              encontrar opções adequadas ao seu perfil e ao que você busca.
              <br />
              <br />
              Crie objetivos e aproveite os planos personalizados que a
              ferramenta apresenta para investir com mais facilidade.
            </p>
            <Button color="primary">Criar Objetivo</Button>
          </DescriptionContent>
        </CustomContent>
      </SectionCustomPicture>
      <FundsCarouselSection />
      <FileDownloadSection data={downloadFileSectionData} />
    </>
  )
}

ManagementInvestments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
