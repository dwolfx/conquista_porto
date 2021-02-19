import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Col, Container, Row } from 'styled-bootstrap-grid'

import StepBar from 'pages/TripInsurance/commons/StepBar'
import Text from 'components/Text'

import AddressCard from './AddressCard'
import ClientDataCard from './ClientDataCard'
import ClientContactDetailsCard from './ClientContactDetailsCard'
import CompanionInfoCard from './CompanionInfoCard'
import ContactInfoAccidentsCaseCard from './ContactInfoAccidentsCaseCard'
import PaymentInfoCard from './PaymentInfoCard'
import PoliticallyExposedPersonCard from './PoliticallyExposedPersonCard'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { PostTripInsuranceProposalRequest } from 'store/modules/TripInsurance/Proposal/action'

import { ITripInsuranceProposal } from 'store/modules/TripInsurance/Proposal/types'
import { IForm, CustomerSteps } from 'pages/TripInsurance/PRO/types'

import * as S from './styles'

const InsuranceSummary = () => {
  const isMobile = useMedia('xs')
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const { instantiate } = useStackFluxManagement<{}>()
  const { form } = useFormFluxManagement<IForm>()

  const [retries, setRetries] = React.useState<number>(3)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(false)
  const [hasClientDataEmptyData, setHasClientDataEmptyData] = React.useState<
    boolean
  >(false)
  const [
    hasClientContactDetailsEmptyData,
    setHasClientContactDetailsEmptyData,
  ] = React.useState<boolean>(false)
  const [hasPEPEmptyData, setHasPEPEmptyData] = React.useState<boolean>(false)
  const [hasAddressEmptyData, setHasAddressEmptyData] = React.useState<boolean>(
    false
  )
  const [
    hasContactInfoAccidentsCaseData,
    setHasContactInfoAccidentsCaseData,
  ] = React.useState<boolean>(false)

  const { proposalIsLoading, proposalHasError } = useSelector(
    (state: { tripInsuranceProposal: ITripInsuranceProposal }) => ({
      proposalIsLoading: state.tripInsuranceProposal.isLoading,
      proposalHasError: state.tripInsuranceProposal.hasError,
    })
  )

  // Handle with submit button
  React.useEffect(() => {
    setIsButtonDisabled(
      !form.codigoPaisDestino ||
        !form.codigoUfOrigem ||
        !form.dataIda ||
        !form.dataVolta ||
        !form.idSimulacao ||
        !form.motivoViagem ||
        !form.pacoteEscolhido ||
        !form.valorComDesconto ||
        !form.valorSemDesconto ||
        hasClientDataEmptyData ||
        hasClientContactDetailsEmptyData ||
        hasPEPEmptyData ||
        hasAddressEmptyData ||
        hasContactInfoAccidentsCaseData
    )
  }, [
    form.codigoPaisDestino,
    form.codigoUfOrigem,
    form.dataIda,
    form.dataVolta,
    form.idSimulacao,
    form.motivoViagem,
    form.pacoteEscolhido,
    form.valorComDesconto,
    form.valorSemDesconto,
    hasClientDataEmptyData,
    hasClientContactDetailsEmptyData,
    hasPEPEmptyData,
    hasAddressEmptyData,
    hasContactInfoAccidentsCaseData,
  ])

  // Error step
  React.useEffect(() => {
    if (proposalHasError && retries === 0) {
      instantiate(CustomerSteps.errorStep)
    }
  }, [proposalHasError, retries, instantiate])

  const handleClick = () => {
    dispatch(
      PostTripInsuranceProposalRequest({
        payload: {
          dataIda: form.dataIda,
          dataVolta: form.dataVolta,
          motivoViagem: form.motivoViagem,
          isPraticaAventura: form.isPraticaAventura,
          isMotocicleta: form.isMotocicleta,
          qtdPassagMenorSetentaAnos: form.qtdPassagMenorSetentaAnos,
          qtdPassagMaiorSetentaAnos: form.qtdPassagMaiorSetentaAnos,
          codigoUfOrigem: form.codigoUfOrigem,
          codigoPaisDestino: form.codigoPaisDestino,
          pacoteEscolhido: form.pacoteEscolhido,
          valorSeguro: form.pagamento?.isCartaoPorto
            ? Number(form.valorComDesconto)
            : Number(form.valorSemDesconto),
          passageiroPrincipal: form.passageiroPrincipal,
          acompanhantes: form.acompanhantes,
          pagamento: form.pagamento,
          isAceiteTermos: form.isAceiteTermos,
          isCienteMoto: form.isCienteMoto,
          idSimulacao: form.idSimulacao,
        },
        onErrorToast: addToast,
        onSuccess: instantiate,
        Step: CustomerSteps.successStep,
        setRetries: () => setRetries(retries - 1),
      })
    )
  }

  return (
    <>
      <StepBar title="Contratação" actualStep={2} totalNumberOfSteps={2} />
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={3} sm={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Proposta de Seguro Viagem especial para você!
                </Text>
              </S.HeaderTitleWrapper>

              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Se precisar tirar dúvidas fale com seu parceiro.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>

          <Col lg={8} md={9} sm={12}>
            <ClientDataCard setHasEmptyData={setHasClientDataEmptyData} />
            <ClientContactDetailsCard
              setHasEmptyData={setHasClientContactDetailsEmptyData}
            />
            <PoliticallyExposedPersonCard
              setHasEmptyData={setHasPEPEmptyData}
            />
            <AddressCard setHasEmptyData={setHasAddressEmptyData} />
            <ContactInfoAccidentsCaseCard
              setHasEmptyData={setHasContactInfoAccidentsCaseData}
            />
            <CompanionInfoCard />
            <PaymentInfoCard />
          </Col>
        </Row>
      </S.Container>

      <S.FooterContainer>
        <Container>
          <Row>
            <Col lg={3} md={3} sm={12} />
            <S.FooterCol lg={8} md={9} sm={12}>
              <S.Popover
                placement="top"
                turnOff={!isButtonDisabled}
                content={
                  <Text bold type="body" color="gray5">
                    Há campos vazios ou com
                    <br />
                    erros. Por favor, verifique e
                    <br />
                    tente novamente.
                  </Text>
                }
              >
                <S.SubmitButton
                  tryAgain={retries < 3}
                  disabled={isButtonDisabled}
                  loading={proposalIsLoading}
                  onClick={() => handleClick()}
                >
                  {retries < 3 ? `TENTAR NOVAMENTE` : `CONTRATAR`}
                </S.SubmitButton>
              </S.Popover>
            </S.FooterCol>
          </Row>
        </Container>
      </S.FooterContainer>
    </>
  )
}

export default InsuranceSummary
