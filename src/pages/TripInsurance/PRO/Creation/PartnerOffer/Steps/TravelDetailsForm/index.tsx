import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import 'styled-components/macro'
import moment from 'moment'
import { Row, Col } from 'styled-bootstrap-grid'
import StepBar from 'pages/TripInsurance/commons/StepBar'

import DatePickerRange from 'components/Dates/DatePickerRange'
import MultiSelector from 'components/MultiSelector'
import { INTERVAL_DATE_TYPE } from 'components/Dates/types'
import Text from 'components/Text'
import UserCard from 'components/Card/UserCard'
import { IOption } from 'components/MultiSelector/types'
import { IForm } from 'pages/TripInsurance/PRO/types'
import {
  hasLatinAmerica,
  hasOnlyLatinAmerica,
} from 'pages/TripInsurance/Creation/OriginTripStep/helpers'
import ComparativeModal from 'pages/TripInsurance/Creation/ComparativeModal'
import { useToast } from 'hooks/toast'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { StepComponent } from 'hooks/FluxManagement/types'
import { GetDestinationCountriesRequest } from 'store/modules/TripInsurance/DestinationCountries/action'
import { PostInsuranceQuotationRequest } from 'store/modules/TripInsurance/InsuranceQuotation/action'
import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { base64decode } from 'helpers'

import ComissionDetailsModal from './ComissionDetailsModal'
import ProposalCard from './ProposalCard'
import ProposalSkeleton from './ProposalSkeleton'
import { IBase64DecodedResponse } from '../../types'
import {
  NavWrapper,
  NavTitleWrapper,
  Tag,
  TagText,
  TagsWrapper,
  Divisor,
  BadgeNotification,
  SectionTitleWrapper,
} from '../../styles'

import * as S from './styles'

const TravelDetailsForm: StepComponent = () => {
  const dispatch = useDispatch()
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const { hash } = useParams<{ hash: string }>()
  const { addToast } = useToast()
  const {
    destinationCountries,
    isDestinationCountriesLoading,
    insuranceQuotationData,
    isInsuranceQuotationLoading,
    hasInsuranceQuotationError,
  } = useSelector((state: any) => ({
    destinationCountries: state.destinationCountries.data,
    isDestinationCountriesLoading: state.destinationCountries.isLoading,
    isInsuranceQuotationLoading: state.tripInsuranceQuotation.isLoading,
    hasInsuranceQuotationError: state.tripInsuranceQuotation.hasError,
    insuranceQuotationData: state.tripInsuranceQuotation.data,
  }))

  const [quotationPlans, setQuotationPlans] = useState<IPlan[] | null>(null)

  // hash decoded
  const [customer, setCustomer] = useState<IBase64DecodedResponse | null>(null)

  // Navigation states > Ref
  const [activeMenuItem, setActiveMenuItem] = useState<string>('section-1')
  const sectionOne = useRef<HTMLTableSectionElement | null>(null)
  const sectionTwo = useRef<HTMLTableSectionElement | null>(null)
  const sectionThree = useRef<HTMLTableSectionElement | null>(null)
  const sectionFour = useRef<HTMLTableSectionElement | null>(null)
  const sectionFive = useRef<HTMLTableSectionElement | null>(null)

  // Modal State
  const [isModalComparativeOpen, setIsModalComparativeOpen] = useState(false)
  const [
    isComissionDetailsModalOpen,
    setIsComissionDetailsModalOpen,
  ] = useState(false)

  // Input states
  const [isFormPristine, setIsFormPristine] = useState(true)
  const [isSectionOneValid, setIsSectionOneValid] = useState(false)
  const [isSectionTwoValid, setIsSectionTwoValid] = useState(false)
  const [isSectionThreeValid, setIsSectionThreeValid] = useState(false)
  const [isSectionFourValid, setIsSectionFourValid] = useState(false)
  const [isSectionFiveValid, setIsSectionFiveValid] = useState(false)

  // section 1
  const [selectedCountries, setSelectedCountries] = useState<IOption[]>([])
  const [destinationOptions, setDestinationOptions] = useState<IOption[]>([])
  const [selectedOrigin, setSelectedOrigin] = useState({
    id: 28,
    name: 'Brasil',
  })
  const [selectedDestinationType, setSelectedDestinationType] = useState({
    id: 0,
    name: '',
  })

  // section 2
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)

  // section 3
  const [counts, setCounts] = useState({ young: 0, old: 0, total: 0 })

  // section 4
  const [isPraticaAventura, setIsPraticaAventura] = useState(0)
  const [isMotocicleta, setIsMotocicleta] = useState(0)

  // section 5
  const [selectedCommission, setSelectedComission] = useState({
    id: 0,
    name: '',
    value: '',
  })

  const scrollListenerFunc = useCallback(() => {
    const layerBody = window.document.getElementById('layer-children')
    let sectionOnePos = null
    let sectionTwoPos = null
    let sectionThreePos = null
    let sectionFourPos = null
    let sectionFivePos = null

    if (
      !!sectionOne.current &&
      !!sectionTwo.current &&
      !!sectionThree.current &&
      !!sectionFour.current &&
      !!sectionFive.current
    ) {
      sectionOnePos = sectionOne.current.offsetTop
      sectionTwoPos = sectionTwo.current.offsetTop
      sectionThreePos = sectionThree.current.offsetTop
      sectionFourPos = sectionFour.current.offsetTop
      sectionFivePos = sectionFive.current.offsetTop

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
    }
  }, [])

  useEffect(() => {
    if (insuranceQuotationData) {
      setQuotationPlans(insuranceQuotationData.ViagemPacote.pacotes)
    }
  }, [insuranceQuotationData])

  useEffect(() => {
    setCounts(prevCounts => ({
      ...prevCounts,
      total: prevCounts.young + prevCounts.old,
    }))
  }, [counts.young, counts.old])

  useEffect(() => {
    if (hash) {
      const dataDecoded: IBase64DecodedResponse = base64decode(hash)
      if (dataDecoded) {
        setCustomer(dataDecoded)
      }
    }
  }, [hash])

  useEffect(() => {
    dispatch(GetDestinationCountriesRequest())
  }, [dispatch])

  useEffect(() => {
    if (destinationCountries) {
      const { ViagemPais } = destinationCountries
      const mappedOptions: IOption[] = ViagemPais.destinos.map(
        (destinationCountry: any) => ({
          id: destinationCountry.id,
          text: destinationCountry.text,
          value: destinationCountry.value,
        })
      )
      setDestinationOptions(mappedOptions)
    }
  }, [destinationCountries])

  useEffect(() => {
    const layerBody = window.document.getElementById('layer-children')
    if (layerBody !== null) {
      layerBody.addEventListener('scroll', scrollListenerFunc)
    }
    return () => layerBody?.removeEventListener('scroll', scrollListenerFunc)
  }, [scrollListenerFunc])

  useEffect(() => {
    if (selectedDestinationType.id === 2 && selectedCountries.length) {
      setIsSectionOneValid(true)
    } else {
      setIsSectionOneValid(false)
    }

    if (selectedDestinationType.id === 1) {
      setIsSectionOneValid(true)
    }

    if (initialDate !== null && finalDate !== null) {
      setIsSectionTwoValid(true)
    } else {
      setIsSectionTwoValid(false)
    }

    if (counts.old || counts.young) {
      setIsSectionThreeValid(true)
    } else {
      setIsSectionThreeValid(false)
    }

    if (isPraticaAventura === 0 && isMotocicleta === 0) {
      setIsSectionFourValid(false)
    } else {
      setIsSectionFourValid(true)
    }

    if (selectedCommission.id) {
      setIsSectionFiveValid(true)
    } else {
      setIsSectionFiveValid(false)
    }
  }, [
    selectedDestinationType,
    selectedCountries,
    counts,
    initialDate,
    finalDate,
    isPraticaAventura,
    selectedCommission.id,
    isMotocicleta,
  ])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    const section = document.querySelector('#layer-children')
    if (ref.current) {
      return section?.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
    return false
  }

  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }

  const onSubmitForm = () => {
    setIsFormPristine(false)
    const payload = {
      isPraticaAventura: isPraticaAventura === 1,
      isMotocicleta: isMotocicleta === 1,
      codigoCanal: 1,
      motivoViagem: 1,
      codigoUfOrigem: 'SP',
      qtdPassagMaiorSetentaAnos: counts.old,
      qtdPassagMenorSetentaAnos: counts.young,
      dataIda: moment(initialDate).format('DD/MM/YYYY'),
      dataVolta: moment(finalDate).format('DD/MM/YYYY'),
      codigoPaisDestino: `${
        selectedCountries.length ? selectedCountries[0].id : '28'
      }`,
      passageiroPrincipal: {
        numeroCpf: `${customer?.cpfCliente}`.slice(0, 9),
        digitoCpf: `${customer?.cpfCliente}`.slice(9, 11),
      },
      paisesAdicionais: selectedCountries.map(sC => ({
        codigo: `${sC.id}`,
        descricao: sC.text,
      })),
    }
    updateForm({
      ...form,
      ...payload,
      codigoOperacao: selectedCommission.value,
      susep: '1VZA9X',
      idParceiro: customer ? Number(customer.idCorretor) : -1,
    })
    dispatch(
      PostInsuranceQuotationRequest({
        payload,
        onErrorToast: addToast,
        onSuccess: () => null,
      })
    )
  }

  const commissionOptions = [
    {
      id: 1,
      text: '15A',
      value: '15-A',
      onClick: () =>
        setSelectedComission({ id: 1, name: '15A', value: '15-A' }),
    },
    {
      id: 1,
      text: '20A',
      value: '20-A',
      onClick: () =>
        setSelectedComission({ id: 1, name: '20A', value: '20-A' }),
    },
    {
      id: 1,
      text: '25B',
      value: '25-B',
      onClick: () =>
        setSelectedComission({ id: 1, name: '25B', value: '25-B' }),
    },
    {
      id: 1,
      text: '30C',
      value: '30-C',
      onClick: () =>
        setSelectedComission({ id: 1, name: '30C', value: '30-C' }),
    },
  ]

  const destinationTypeOptions = [
    {
      id: 1,
      text: 'Nacional',
      value: 1,
      onClick: () => {
        setSelectedCountries([])
        setSelectedDestinationType({ id: 1, name: 'Nacional' })
      },
    },
    {
      id: 2,
      text: 'Internacional',
      value: 2,
      onClick: () =>
        setSelectedDestinationType({ id: 2, name: 'Internacional' }),
    },
  ]

  const originOptions = [
    {
      id: 1,
      text: 'Brasil',
      value: 1,
      onClick: () => setSelectedOrigin({ id: 1, name: 'Brasil' }),
    },
  ]

  const getColSize = (length: number) => {
    switch (true) {
      case length === 1:
        return 12
      case length === 2:
        return 6
      default:
        return 4
    }
  }

  return (
    <>
      <StepBar title="Proposta" actualStep={2} totalNumberOfSteps={3} />
      <S.Container>
        <Row>
          <Col lg={3}>
            <NavWrapper>
              <NavTitleWrapper>
                <Text type="subheading" bold color="gray6">
                  DADOS DA SIMULAÇÃO
                </Text>
              </NavTitleWrapper>
              <TagsWrapper>
                <Tag
                  active={activeMenuItem === 'section-1'}
                  onClick={() => {
                    scrollToSection(sectionOne)
                  }}
                >
                  <TagText>Origem e destino</TagText>
                  {!isSectionOneValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={activeMenuItem === 'section-2'}
                  onClick={() => {
                    scrollToSection(sectionTwo)
                  }}
                >
                  <TagText>Período da viagem</TagText>
                  {!isSectionTwoValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={activeMenuItem === 'section-3'}
                  onClick={() => {
                    scrollToSection(sectionThree)
                  }}
                >
                  <TagText>Passageiros</TagText>
                  {!isSectionThreeValid && <BadgeNotification />}
                </Tag>
                <Tag
                  active={activeMenuItem === 'section-4'}
                  onClick={() => {
                    scrollToSection(sectionFour)
                  }}
                >
                  <TagText>Coberturas adicionais</TagText>
                </Tag>
                <Tag
                  active={activeMenuItem === 'section-5'}
                  onClick={() => {
                    scrollToSection(sectionFive)
                  }}
                >
                  <TagText>Comissões</TagText>
                  {!isSectionFiveValid && <BadgeNotification />}
                </Tag>
              </TagsWrapper>
              <Divisor />
              <NavTitleWrapper>
                <Text type="subheading" color="gray5" bold>
                  ENVIAR PROPOSTA PARA:
                </Text>
              </NavTitleWrapper>
              <UserCard
                name={customer?.nomeCliente || 'Cliente'}
                type="cliente"
              />
            </NavWrapper>
          </Col>
          <Col lg={8}>
            <section id="section-1" ref={sectionOne}>
              <S.FirstSectionCard overflow="visible">
                <S.SectionTitleWrapper>
                  <S.SectionTitle>ORIGEM E DESTINO</S.SectionTitle>
                </S.SectionTitleWrapper>
                <S.SectionContentWrapper flexDirection="column">
                  <S.Select
                    label="origem"
                    options={originOptions}
                    disabled
                    hasLockIcon
                    testId="origem"
                    selected={selectedOrigin}
                  />
                  <S.Select
                    label="destino"
                    testId="destino"
                    options={destinationTypeOptions}
                    selected={selectedDestinationType}
                  />
                  {selectedDestinationType.id === 2 && (
                    <MultiSelector
                      inputLabel="você irá para qual(is) países?"
                      options={destinationOptions}
                      selectedOptions={selectedCountries}
                      loading={isDestinationCountriesLoading}
                      onChange={value => value}
                      optionsContainerHeight={260}
                      setSelectedOptions={setSelectedCountries}
                    />
                  )}
                </S.SectionContentWrapper>
              </S.FirstSectionCard>
            </section>

            <section id="section-2" ref={sectionTwo}>
              <S.SectionCard overflow="visible" id="section-2">
                <SectionTitleWrapper>
                  <S.SectionTitle>PERÍODO DA VIAGEM</S.SectionTitle>
                </SectionTitleWrapper>
                <S.SectionContentWrapper>
                  <DatePickerRange
                    idDatePickerRange="id-coverage-date-range-drawer"
                    numberOfMonths={1}
                    startDateText="Data de partida"
                    endDateText="Data de chegada"
                    blockPastDays
                    keepOpenOnDateSelect={false}
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
                  <S.CleanButton
                    onClick={() => {
                      setInitialDate(null)
                      setFinalDate(null)
                    }}
                  >
                    limpar
                  </S.CleanButton>
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-3" ref={sectionThree}>
              <S.SectionCard>
                <SectionTitleWrapper>
                  <S.SectionTitle>PASSAGEIROS</S.SectionTitle>
                </SectionTitleWrapper>
                <S.SectionContentWrapper>
                  <S.InputNumber
                    maxValue={20 - counts.old}
                    disabledCase={counts.total >= 20}
                    label={
                      <Text type="headline" color="gray6">
                        Passageiros até 70 anos
                      </Text>
                    }
                    afterOnChange={value =>
                      setCounts({ ...counts, young: value })
                    }
                  />
                  <S.InputNumber
                    maxValue={20 - counts.young}
                    disabledCase={counts.total === 20}
                    afterOnChange={value => {
                      setCounts({ ...counts, old: value })
                      setIsPraticaAventura(2)
                    }}
                    label={
                      <Text type="headline" color="gray6">
                        Passageiros de 71 até 90 anos
                      </Text>
                    }
                  />
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-4" ref={sectionFour}>
              <S.SectionCard
                css={`
                  padding: 35px 7px 35px 35px;
                `}
              >
                <SectionTitleWrapper>
                  <S.SectionTitle>COBERTURAS ADICIONAIS</S.SectionTitle>
                </SectionTitleWrapper>
                <S.SectionContentWrapper flexDirection="column">
                  <S.QuestionWrapper>
                    <S.InputWrapper>
                      <Text type="headline" color="gray6">
                        Pretende praticar esportes de aventura durante a viagem?
                      </Text>
                      <S.RadioWrapper>
                        <S.Radio
                          label="Sim"
                          id="esportes-sim"
                          value
                          checked={isPraticaAventura === 1}
                          disabled={counts.old > 0}
                          name="isPraticaAventura"
                          handleChange={() => setIsPraticaAventura(1)}
                        />
                        <S.Radio
                          label="Não"
                          aria-label="radio-esportes-nao"
                          id="esportes-nao"
                          checked={isPraticaAventura === 2}
                          disabled={counts.old > 0}
                          value={false}
                          name="isPraticaAventura"
                          handleChange={() => setIsPraticaAventura(2)}
                        />
                      </S.RadioWrapper>
                    </S.InputWrapper>
                    {counts.old > 0 && (
                      <S.InformationWrapper>
                        <Text type="caption" bold color="gray5">
                          Informamos que a cobertura adicional não contempla
                          grupos com uma ou mais pessoas acima de 70 anos.
                        </Text>
                      </S.InformationWrapper>
                    )}
                  </S.QuestionWrapper>
                  <S.QuestionWrapper>
                    <S.InputWrapper>
                      <Text type="headline" color="gray6">
                        Pretende usar motocicleta durante a viagem?
                      </Text>
                      <S.RadioWrapper>
                        <S.Radio
                          label="Sim"
                          id="motocicleta-sim"
                          value
                          checked={isMotocicleta === 1}
                          name="isMotocicleta"
                          handleChange={() => setIsMotocicleta(1)}
                          disabled={
                            hasOnlyLatinAmerica(selectedCountries) ||
                            selectedDestinationType.id === 1
                          }
                        />
                        <S.Radio
                          label="Não"
                          id="motocicleta-nao"
                          value={false}
                          name="isMotocicleta"
                          handleChange={() => setIsMotocicleta(2)}
                          checked={
                            hasOnlyLatinAmerica(selectedCountries) ||
                            isMotocicleta === 2 ||
                            selectedDestinationType.id === 1
                          }
                          disabled={
                            hasOnlyLatinAmerica(selectedCountries) ||
                            selectedDestinationType.id === 1
                          }
                        />
                      </S.RadioWrapper>
                    </S.InputWrapper>
                    {(hasLatinAmerica(selectedCountries) ||
                      selectedDestinationType.id === 1) && (
                      <S.InformationWrapper>
                        <Text type="caption" bold color="gray5">
                          Informamos que a cobertura adicional não contempla
                          acidentes de motocicleta em qualquer destino na
                          América Latina.
                        </Text>
                      </S.InformationWrapper>
                    )}
                  </S.QuestionWrapper>
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-5" ref={sectionFive}>
              <S.SectionCard overflow="visible" id="section-5">
                <SectionTitleWrapper>
                  <S.SectionTitle>COMISSÕES</S.SectionTitle>
                </SectionTitleWrapper>
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
                </S.SectionContentWrapper>
              </S.SectionCard>
            </section>

            <section id="section-submit">
              <S.LastSectionCard overflow="visible" id="section-submit-card">
                <S.FindProposalButton
                  disabled={
                    !isSectionOneValid ||
                    !isSectionTwoValid ||
                    !isSectionThreeValid ||
                    !isSectionFourValid ||
                    !isSectionFiveValid
                  }
                  onClick={onSubmitForm}
                >
                  {isFormPristine ? 'carregar planos' : 'atualizar planos'}
                </S.FindProposalButton>
              </S.LastSectionCard>
            </section>

            {!isInsuranceQuotationLoading &&
              !hasInsuranceQuotationError &&
              !insuranceQuotationData && (
                <S.HintText>
                  Selecione o tipo de viagem acima para verificarmos as opções
                  disponíveis.
                </S.HintText>
              )}
            {hasInsuranceQuotationError && (
              <S.ErrorText>
                Desculpe, não foi possível carregar suas informações. Aguarde
                alguns instantes e tente novamente.
              </S.ErrorText>
            )}
            {isInsuranceQuotationLoading && (
              <Row
                css={`
                  margin-top: 14px;
                `}
              >
                <Col lg={6}>
                  <ProposalSkeleton />
                </Col>
                <Col lg={6}>
                  <ProposalSkeleton />
                </Col>
              </Row>
            )}
            {insuranceQuotationData &&
              !hasInsuranceQuotationError &&
              !isInsuranceQuotationLoading && (
                <div
                  css={`
                    margin-top: 14px;
                  `}
                >
                  <Row>
                    {quotationPlans?.map(
                      (pacote: IPlan, _: number, { length }: IPlan[]) => (
                        <Col
                          lg={getColSize(length)}
                          key={`pacote-${pacote.nomePlano}`}
                        >
                          <ProposalCard
                            proposal={pacote}
                            horizontal={length === 1}
                            handleOpenDetailsModal={() =>
                              setIsModalComparativeOpen(true)
                            }
                          />
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              )}
          </Col>
        </Row>
      </S.Container>
      {quotationPlans && (
        <ComparativeModal
          isOpen={isModalComparativeOpen}
          travelPlans={quotationPlans}
          handleClose={() => setIsModalComparativeOpen(false)}
        />
      )}
      <ComissionDetailsModal
        isOpen={isComissionDetailsModalOpen}
        handleClose={() => setIsComissionDetailsModalOpen(false)}
      />
    </>
  )
}

export default TravelDetailsForm
