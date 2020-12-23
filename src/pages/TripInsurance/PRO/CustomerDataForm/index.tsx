import React, { useState, useRef, useEffect, useCallback } from 'react'
import 'styled-components/macro'
import moment from 'moment'
import { Row, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import DatePickerRange from 'components/Dates/DatePickerRange'
import { INTERVAL_DATE_TYPE } from 'components/Dates/types'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import UserCard from 'components/Card/UserCard'
import VerticalList from 'components/VerticalList'

import MockComparativeModal from '../../commons/_MockComparativeModal'
import ProposalSkeleton from './ProposalSkeleton'
import ComissionDetailsModal from './ComissionDetailsModal'

import * as S from './styles'

const CustomerDataForm = () => {
  // Navigation states > Ref
  const [activeMenuItem, setActiveMenuItem] = useState<string>('section-1')
  const sectionOne = useRef<HTMLTableSectionElement | null>(null)
  const sectionTwo = useRef<HTMLTableSectionElement | null>(null)
  const sectionThree = useRef<HTMLTableSectionElement | null>(null)
  const sectionFour = useRef<HTMLTableSectionElement | null>(null)
  const sectionFive = useRef<HTMLTableSectionElement | null>(null)

  // Navigation states > offsetTop
  const [sectionOnePos, setSectionOnePos] = useState(0)
  const [sectionTwoPos, setSectionTwoPos] = useState(0)
  const [sectionThreePos, setSectionThreePos] = useState(0)
  const [sectionFourPos, setSectionFourPos] = useState(0)
  const [sectionFivePos, setSectionFivePos] = useState(0)

  // Modal State
  const [isModalComparativeOpen, setIsModalComparativeOpen] = useState(false)
  const [
    isComissionDetailsModalOpen,
    setIsComissionDetailsModalOpen,
  ] = useState(false)

  // Input states
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isPraticaAventura, setIsPraticaAventura] = useState(false)
  const [isMotocicleta, setIsMotocicleta] = useState(false)
  const [selectedOrigin, setSelectedOrigin] = useState({
    id: 0,
    name: '',
  })

  const [selectedDestination, setSelectedDestination] = useState({
    id: 0,
    name: '',
  })

  const [selectedCommission, setSelectedComission] = useState({
    id: 0,
    name: '',
  })

  const scrollListenerFunc = useCallback(() => {
    const layerBody = window.document.getElementById('layer-children')
    if (layerBody !== null) {
      const { offsetHeight, scrollTop, scrollHeight } = layerBody

      if (
        offsetHeight + scrollTop >= scrollHeight ||
        scrollTop >= sectionFivePos
      ) {
        setActiveMenuItem('section-5')
      } else if (scrollTop <= sectionOnePos) {
        setActiveMenuItem('section-1')
      } else if (scrollTop > sectionOnePos && scrollTop <= sectionTwoPos) {
        setActiveMenuItem('section-2')
      } else if (scrollTop > sectionTwoPos && scrollTop <= sectionThreePos) {
        setActiveMenuItem('section-3')
      } else if (scrollTop > sectionThreePos && scrollTop <= sectionFourPos) {
        setActiveMenuItem('section-4')
      }
    }
  }, [
    sectionFivePos,
    sectionFourPos,
    sectionOnePos,
    sectionThreePos,
    sectionTwoPos,
  ])

  useEffect(() => {
    if (
      !!sectionOne.current &&
      !!sectionTwo.current &&
      !!sectionThree.current &&
      !!sectionFour.current &&
      !!sectionFive.current
    ) {
      setSectionOnePos(sectionOne.current.offsetTop)
      setSectionTwoPos(sectionTwo.current.offsetTop)
      setSectionThreePos(sectionThree.current.offsetTop)
      setSectionFourPos(sectionFour.current.offsetTop)
      setSectionFivePos(sectionFive.current.offsetTop)
    }
  }, [])

  useEffect(() => {
    const layerBody = window.document.getElementById('layer-children')
    if (layerBody !== null) {
      layerBody.addEventListener('scroll', scrollListenerFunc)
    }
    return () => layerBody?.removeEventListener('scroll', scrollListenerFunc)
  }, [scrollListenerFunc])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    const section = document.querySelector('#layer-children')
    if (ref.current) {
      return section?.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }

  const commissionOptions = [
    {
      id: 1,
      text: '15A',
      value: 1,
      onClick: () => setSelectedComission({ id: 1, name: '15A' }),
    },
    {
      id: 1,
      text: '20A',
      value: 1,
      onClick: () => setSelectedComission({ id: 1, name: '20A' }),
    },
    {
      id: 1,
      text: '25B',
      value: 1,
      onClick: () => setSelectedComission({ id: 1, name: '25B' }),
    },
    {
      id: 1,
      text: '30C',
      value: 1,
      onClick: () => setSelectedComission({ id: 1, name: '30C' }),
    },
  ]

  const destinationOptions = [
    {
      id: 1,
      text: 'Brasil',
      value: 1,
      onClick: () => setSelectedDestination({ id: 1, name: 'Brasil' }),
    },
    {
      id: 2,
      text: 'Estados Unidos',
      value: 2,
      onClick: () => setSelectedDestination({ id: 2, name: 'Estados Unidos' }),
    },
  ]

  const originOptions = [
    {
      id: 1,
      text: 'Brasil',
      value: 1,
      onClick: () => setSelectedOrigin({ id: 1, name: 'Brasil' }),
    },
    {
      id: 2,
      text: 'Estados Unidos',
      value: 2,
      onClick: () => setSelectedOrigin({ id: 2, name: 'Estados Unidos' }),
    },
  ]

  return (
    <>
      <S.Container>
        <Row>
          <Col lg={3}>
            <S.NavWrapper>
              <S.NavTitleWrapper>
                <Text type="subheading" bold color="gray6">
                  DADOS DA SIMULAÇÃO
                </Text>
              </S.NavTitleWrapper>
              <S.TagsWrapper>
                <S.Tag
                  active={activeMenuItem === 'section-1'}
                  onClick={() => {
                    scrollToSection(sectionOne)
                  }}
                >
                  <S.TagText>Origem e destino</S.TagText>
                  <S.BadgeNotification />
                </S.Tag>
                <S.Tag
                  active={activeMenuItem === 'section-2'}
                  onClick={() => {
                    scrollToSection(sectionTwo)
                  }}
                >
                  <S.TagText>Período da viagem</S.TagText>
                </S.Tag>
                <S.Tag
                  active={activeMenuItem === 'section-3'}
                  onClick={() => {
                    scrollToSection(sectionThree)
                  }}
                >
                  <S.TagText>Passageiros</S.TagText>
                </S.Tag>
                <S.Tag
                  active={activeMenuItem === 'section-4'}
                  onClick={() => {
                    scrollToSection(sectionFour)
                  }}
                >
                  <S.TagText>Coberturas adicionais</S.TagText>
                </S.Tag>
                <S.Tag
                  active={activeMenuItem === 'section-5'}
                  onClick={() => {
                    scrollToSection(sectionFive)
                  }}
                >
                  <S.TagText>Comissões</S.TagText>
                </S.Tag>
              </S.TagsWrapper>
              <S.Divisor />
              <S.NavTitleWrapper>
                <Text type="subheading" color="gray5" bold>
                  ENVIAR PROPOSTA PARA:
                </Text>
              </S.NavTitleWrapper>
              <UserCard name="André Ramos" type="cliente" />
            </S.NavWrapper>
          </Col>
          <Col lg={8}>
            <section id="section-1" ref={sectionOne}>
              <S.SectionCard overflow="visible">
                <S.SectionTitleWrapper>
                  <S.SectionTitle>ORIGEM E DESTINO</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper flexDirection="column">
                  <S.Select
                    label="origem"
                    options={originOptions}
                    testId="origem"
                    selected={selectedOrigin}
                  />
                  <S.Select
                    label="destino"
                    testId="destino"
                    options={destinationOptions}
                    selected={selectedDestination}
                  />
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-2" ref={sectionTwo}>
              <S.SectionCard overflow="visible" id="section-2">
                <S.SectionTitleWrapper>
                  <S.SectionTitle>PERÍODO DA VIAGEM</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper>
                  <DatePickerRange
                    idDatePickerRange="id-coverage-date-range-drawer"
                    numberOfMonths={1}
                    startDateText="Data de partida"
                    endDateText="Data de chegada"
                    blockPastDays
                    focusedInput={focusedInput}
                    onHandleFocusedInput={(focused: any) =>
                      onHandleRangeFocused(focused)
                    }
                    rangeDates={{
                      dateBegin: initialDate,
                      dateEnd: finalDate,
                      intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                    }}
                    onHandleSetRangeDates={(
                      initialDateInput: moment.Moment | null,
                      finalDateInput: moment.Moment | null
                    ) => {
                      setInitialDate(initialDateInput)
                      setFinalDate(finalDateInput)
                    }}
                  />
                  <S.CleanButton>limpar</S.CleanButton>
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-3" ref={sectionThree}>
              <S.SectionCard>
                <S.SectionTitleWrapper>
                  <S.SectionTitle>PASSAGEIROS</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper>
                  <S.InputNumber
                    label={
                      <Text type="headline" color="gray6">
                        Passageiros até 70 anos
                      </Text>
                    }
                    afterOnChange={value => console.log(value)}
                  />
                  <S.InputNumber
                    label={
                      <Text type="headline" color="gray6">
                        Passageiros de 71 até 90 anos
                      </Text>
                    }
                    afterOnChange={value => console.log(value)}
                  />
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-4" ref={sectionFour}>
              <S.SectionCard>
                <S.SectionTitleWrapper>
                  <S.SectionTitle>COBERTURAS ADICIONAIS</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper flexDirection="column">
                  <S.QuestionWrapper>
                    <Text type="headline" color="gray6">
                      Pretende praticar esportes de aventura durante a viagem?
                    </Text>
                    <S.RadioWrapper>
                      <S.Radio
                        label="Sim"
                        id="esportes-sim"
                        value
                        checked={isPraticaAventura}
                        name="isPraticaAventura"
                        handleChange={() => setIsPraticaAventura(true)}
                      />
                      <S.Radio
                        label="Não"
                        aria-label="radio-esportes-nao"
                        id="esportes-nao"
                        checked={!isPraticaAventura}
                        value={false}
                        name="isPraticaAventura"
                        handleChange={() => setIsPraticaAventura(false)}
                      />
                    </S.RadioWrapper>
                  </S.QuestionWrapper>
                  <S.QuestionWrapper>
                    <Text type="headline" color="gray6">
                      Pretende usar motocicleta durante a viagem?
                    </Text>
                    <S.RadioWrapper>
                      <S.Radio
                        label="Sim"
                        id="motocicleta-sim"
                        value
                        checked={isMotocicleta}
                        name="isMotocicleta"
                        handleChange={() => setIsMotocicleta(true)}
                      />
                      <S.Radio
                        label="Não"
                        id="motocicleta-nao"
                        checked={!isMotocicleta}
                        value={false}
                        name="isMotocicleta"
                        handleChange={() => setIsMotocicleta(false)}
                      />
                    </S.RadioWrapper>
                  </S.QuestionWrapper>
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-5" ref={sectionFive}>
              <S.SectionCard overflow="visible" id="section-5">
                <S.SectionTitleWrapper>
                  <S.SectionTitle>COMISSÕES</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper flexDirection="column">
                  <S.ComissionSelect
                    label="código de operações"
                    options={commissionOptions}
                    selected={selectedCommission}
                    testId="operacoes"
                  />
                  <S.CommissionHelpButton
                    noIcon
                    onClick={() => setIsComissionDetailsModalOpen(true)}
                  >
                    entender como funciona
                  </S.CommissionHelpButton>
                  <S.FindProposalButton
                    disabled
                    onClick={() => console.log('carregar planos')}
                  >
                    carregar planos
                  </S.FindProposalButton>
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>
            <S.HintText>
              Selecione o tipo de viagem acima para verificarmos as opções
              disponíveis.
            </S.HintText>
            <S.ErrorText>
              Desculpe, não foi possível carregar suas informações. Aguarde
              alguns instantes e tente novamente.
            </S.ErrorText>
            <Row>
              <Col lg={6}>
                <ProposalSkeleton />
              </Col>
              <Col lg={6}>
                <ProposalSkeleton />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <S.ProposalCard>
                  <S.ProposalCardHeader>
                    <VerticalList
                      marginBetweenElements={11}
                      noSpacing
                      elements={[
                        <Text type="heading4" color="gray6" bold>
                          Brasil Terra
                        </Text>,
                        <Text type="captionUppercase" color="gray5" bold>
                          6x sem juros de R$ 209,97
                        </Text>,
                        <Text type="heading4" color="gray6" bold>
                          R$ 1.259,82 à vista
                        </Text>,
                      ]}
                    />
                  </S.ProposalCardHeader>
                  <Button
                    color="secondary"
                    css={`
                      width: 100%;
                      margin: 14px 0;
                    `}
                  >
                    selecionar plano
                  </Button>
                  <S.Divisor />
                  <S.TextSubheading textAlign="center">
                    PRINCIPAIS COBERTURAS
                  </S.TextSubheading>
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        Despesas médicas, hospitalares e/ou odontológicas - dmho
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 350.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        morte acidental
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        extravio de bagagem
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.DetailsButton
                    onClick={() => setIsModalComparativeOpen(true)}
                  >
                    lista completa
                  </S.DetailsButton>
                </S.ProposalCard>
              </Col>
              <Col lg={4}>
                <S.ProposalCard>
                  <S.ProposalCardHeader>
                    <VerticalList
                      marginBetweenElements={11}
                      noSpacing
                      elements={[
                        <Text type="heading4" color="gray6" bold>
                          Brasil Terra
                        </Text>,
                        <Text type="captionUppercase" color="gray5" bold>
                          6x sem juros de R$ 209,97
                        </Text>,
                        <Text type="heading4" color="gray6" bold>
                          R$ 1.259,82 à vista
                        </Text>,
                      ]}
                    />
                  </S.ProposalCardHeader>
                  <S.SelectPlanButton>selecionar plano</S.SelectPlanButton>
                  <S.Divisor />
                  <S.TextSubheading textAlign="center">
                    PRINCIPAIS COBERTURAS
                  </S.TextSubheading>
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        Despesas médicas, hospitalares e/ou odontológicas - dmho
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 350.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        morte acidental
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        extravio de bagagem
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.DetailsButton
                    onClick={() => setIsModalComparativeOpen(true)}
                  >
                    lista completa
                  </S.DetailsButton>
                </S.ProposalCard>
              </Col>
              <Col lg={4}>
                <S.ProposalCard>
                  <S.ProposalCardHeader>
                    <VerticalList
                      marginBetweenElements={11}
                      noSpacing
                      elements={[
                        <Text type="heading4" color="gray6" bold>
                          Brasil Terra
                        </Text>,
                        <Text type="captionUppercase" color="gray5" bold>
                          6x sem juros de R$ 209,97
                        </Text>,
                        <Text type="heading4" color="gray6" bold>
                          R$ 1.259,82 à vista
                        </Text>,
                      ]}
                    />
                  </S.ProposalCardHeader>
                  <S.SelectPlanButton>selecionar plano</S.SelectPlanButton>
                  <S.Divisor />
                  <S.TextSubheading textAlign="center">
                    PRINCIPAIS COBERTURAS
                  </S.TextSubheading>
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        Despesas médicas, hospitalares e/ou odontológicas - dmho
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 350.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        morte acidental
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        extravio de bagagem
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.DetailsButton
                    onClick={() => setIsModalComparativeOpen(true)}
                  >
                    lista completa
                  </S.DetailsButton>
                </S.ProposalCard>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <S.ProposalCard>
                  <S.ProposalCardHeader>
                    <VerticalList
                      marginBetweenElements={11}
                      noSpacing
                      elements={[
                        <Text type="heading4" color="gray6" bold>
                          Brasil Terra
                        </Text>,
                        <Text type="captionUppercase" color="gray5" bold>
                          6x sem juros de R$ 209,97
                        </Text>,
                        <Text type="heading4" color="gray6" bold>
                          R$ 1.259,82 à vista
                        </Text>,
                      ]}
                    />
                  </S.ProposalCardHeader>
                  <S.SelectPlanButton>selecionar plano</S.SelectPlanButton>
                  <S.Divisor />
                  <S.TextSubheading>PRINCIPAIS COBERTURAS</S.TextSubheading>
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        Despesas médicas, hospitalares e/ou odontológicas - dmho
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 350.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        morte acidental
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        extravio de bagagem
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.DetailsButton
                    onClick={() => setIsModalComparativeOpen(true)}
                  >
                    lista completa
                  </S.DetailsButton>
                </S.ProposalCard>
              </Col>
              <Col lg={6}>
                <S.ProposalCard>
                  <S.ProposalCardHeader>
                    <VerticalList
                      marginBetweenElements={11}
                      noSpacing
                      elements={[
                        <Text type="heading4" color="gray6" bold>
                          Brasil Terra
                        </Text>,
                        <Text type="captionUppercase" color="gray5" bold>
                          6x sem juros de R$ 209,97
                        </Text>,
                        <Text type="heading4" color="gray6" bold>
                          R$ 1.259,82 à vista
                        </Text>,
                      ]}
                    />
                  </S.ProposalCardHeader>
                  <S.SelectPlanButton>selecionar plano</S.SelectPlanButton>
                  <S.Divisor />
                  <S.TextSubheading textAlign="center">
                    PRINCIPAIS COBERTURAS
                  </S.TextSubheading>
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        Despesas médicas, hospitalares e/ou odontológicas - dmho
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 350.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        morte acidental
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.Divisor />
                  <VerticalList
                    elements={[
                      <Text color="gray5" bold type="captionUppercase">
                        extravio de bagagem
                      </Text>,
                      <Text color="gray6" bold type="headline">
                        R$ 5.000,00
                      </Text>,
                    ]}
                  />
                  <S.DetailsButton
                    onClick={() => setIsModalComparativeOpen(true)}
                  >
                    lista completa
                  </S.DetailsButton>
                </S.ProposalCard>
              </Col>
            </Row>
            <Row>
              <Col col={12}>
                <S.ProposalCard>
                  <S.FlexContainer>
                    <S.ProposalHorizontalCardHeader>
                      <VerticalList
                        marginBetweenElements={11}
                        noSpacing
                        css={`
                          width: 196px;
                        `}
                        elements={[
                          <Text type="heading4" color="gray6" bold>
                            Brasil Terra
                          </Text>,
                          <Text type="captionUppercase" color="gray5" bold>
                            6x sem juros de R$ 209,97
                          </Text>,
                          <Text type="heading4" color="gray6" bold>
                            R$ 1.259,82 à vista
                          </Text>,
                        ]}
                      />
                    </S.ProposalHorizontalCardHeader>
                    <S.Divisor vertical customSize="212px" />
                    <S.ProposalCoverageList>
                      <Text type="subheading" color="gray5" bold>
                        PRINCIPAIS COBERTURAS
                      </Text>
                      <HorizontalList
                        noPadding
                        size="large"
                        startItems={[
                          <Text color="gray5" bold type="captionUppercase">
                            Despesas médicas, hospitalares
                            <br />
                            e/ou odontológicas - dmho
                          </Text>,
                        ]}
                        endItems={[
                          <Text color="gray6" bold type="body">
                            R$ 350.000,00
                          </Text>,
                        ]}
                      />
                      <HorizontalList
                        noPadding
                        size="medium"
                        startItems={[
                          <Text color="gray5" bold type="captionUppercase">
                            Morte acidental
                          </Text>,
                        ]}
                        endItems={[
                          <Text color="gray6" bold type="body">
                            R$ 5.000,00
                          </Text>,
                        ]}
                      />
                      <HorizontalList
                        noPadding
                        size="medium"
                        startItems={[
                          <Text color="gray5" bold type="captionUppercase">
                            Extravio de bagadem
                          </Text>,
                        ]}
                        endItems={[
                          <Text color="gray6" bold type="body">
                            R$ 5.000,00
                          </Text>,
                        ]}
                      />
                      <HorizontalList
                        noPadding
                        size="medium"
                        startItems={[
                          <ButtonLink
                            noIcon
                            onClick={() => setIsModalComparativeOpen(true)}
                          >
                            lista completa
                          </ButtonLink>,
                        ]}
                      />
                    </S.ProposalCoverageList>
                  </S.FlexContainer>
                  <S.SelectPlanButton>selecionar plano</S.SelectPlanButton>
                </S.ProposalCard>
              </Col>
            </Row>
          </Col>
        </Row>
      </S.Container>
      <MockComparativeModal
        isOpen={isModalComparativeOpen}
        handleClose={() => setIsModalComparativeOpen(false)}
      />
      <ComissionDetailsModal
        isOpen={isComissionDetailsModalOpen}
        handleClose={() => setIsComissionDetailsModalOpen(false)}
      />
    </>
  )
}

export default CustomerDataForm
