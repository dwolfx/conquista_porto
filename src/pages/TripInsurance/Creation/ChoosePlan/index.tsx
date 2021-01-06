import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostInsuranceQuotationRequest } from 'store/modules/TripInsurance/InsuranceQuotation/action'
import Text from 'components/Text'
import Switch from 'components/Inputs/Switch'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import {
  IPlan,
  ITripInsuranceQuotation,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'

import LoadingState from 'pages/Home/commons/LoadingState'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import EditDrawer from '../EditDrawer'
import ComparativeModal from '../ComparativeModal'
import PlanCard from './PlanCard'
import * as s from './styles'
import {
  getTheSixthInstallmentOrLessFormated,
  getUpfrontPaymentFormated,
} from './helpers'
import { IForm, Steps } from '../types'

const ChoosePlan: StepComponent = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isMobile = useMedia('sm')
  const isTabletHorizontal = useMedia('mdUp')
  const isLgDown = useMedia('lg')
  const [modalOpen, setModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPortoSeguroCard, setIsPortoSeguroCard] = useState(false)
  const { updateForm, form } = useFormFluxManagement<IForm>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const { tripInsuranceQuotations, isLoading } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
      isLoading: state.tripInsuranceQuotation.isLoading,
      hasError: state.tripInsuranceQuotation.hasError,
      idSimulation: state.tripInsuranceQuotation.data?.idSimulacao,
    })
  )

  useEffect(() => {
    dispatch(
      PostInsuranceQuotationRequest({
        payload: {
          dataIda: form.dataIda,
          dataVolta: form.dataVolta,
          motivoViagem: 1,
          isPraticaAventura: form.isPraticaAventura,
          isMotocicleta: form.isMotocicleta,
          qtdPassagMenorSetentaAnos: form.qtdPassagMenorSetentaAnos,
          qtdPassagMaiorSetentaAnos: form.qtdPassagMaiorSetentaAnos,
          codigoUfOrigem: form.codigoUfOrigem,
          codigoPaisDestino: form.codigoPaisDestino,
          paisesAdicionais: form.paisesAdicionais,
          passageiroPrincipal: {
            numeroCpf: form.passageiroPrincipal?.numeroCpf,
            digitoCpf: form.passageiroPrincipal?.digitoCpf,
          },
          codigoCanal: 1,
        },
        onErrorToast: addToast,
        onSuccess: () => null,
      })
    )
  }, [dispatch, addToast, form])

  const handleClick = (choosedPlan: string) => {
    updateForm({
      ...form,
      pacoteEscolhido: choosedPlan,
    })
    instantiate(Steps.informationConfirmationStep)
  }

  const contentWrapper = () => {
    if (
      tripInsuranceQuotations &&
      tripInsuranceQuotations.length === 2 &&
      isTabletHorizontal &&
      isLgDown
    ) {
      return (
        <s.TitleWrapperColumn>
          <s.Title color="white" type="heading3">
            Escolha um plano disponível
          </s.Title>
          <s.SwitchWrapper>
            <s.SwitchText
              color="white"
              type="subheading"
              bold
              textTransform="uppercase"
            >
              simular em até 12x sem juros com 5% de desconto no Cartão Porto
              Seguro
            </s.SwitchText>
            <Switch
              id="123"
              value={isPortoSeguroCard}
              onChangeSwitch={() => setIsPortoSeguroCard(!isPortoSeguroCard)}
              disabled={false}
              leftLabel=""
              rightLabel=""
              isToggle
            />
          </s.SwitchWrapper>
        </s.TitleWrapperColumn>
      )
    }

    if (
      tripInsuranceQuotations &&
      tripInsuranceQuotations.length === 1 &&
      isTabletHorizontal
    ) {
      return (
        <s.TitleWrapperCentralized>
          <s.SwitchWrapper>
            <s.SwitchText
              color="white"
              type="subheading"
              bold
              textTransform="uppercase"
            >
              simular em até 12x sem juros com 5% de desconto no Cartão Porto
              Seguro
            </s.SwitchText>
            <Switch
              id="is-porto-seguro-card"
              value={isPortoSeguroCard}
              onChangeSwitch={() => setIsPortoSeguroCard(!isPortoSeguroCard)}
              isToggle
            />
          </s.SwitchWrapper>
        </s.TitleWrapperCentralized>
      )
    }

    return (
      <s.TitleWrapper>
        <s.Title color="white" type={isMobile ? 'heading4' : 'heading3'}>
          Escolha um plano disponível
        </s.Title>
        <s.SwitchWrapper>
          <s.SwitchText
            color="white"
            type="subheading"
            bold
            textTransform="uppercase"
          >
            simular em até 12x sem juros com 5% de desconto no Cartão Porto
            Seguro
          </s.SwitchText>
          <Switch
            id="123"
            value={isPortoSeguroCard}
            onChangeSwitch={() => setIsPortoSeguroCard(!isPortoSeguroCard)}
            disabled={false}
            leftLabel=""
            rightLabel=""
            isToggle
          />
        </s.SwitchWrapper>
      </s.TitleWrapper>
    )
  }

  return (
    <s.Container>
      <ComparativeModal
        isOpen={modalOpen}
        handleClose={setModalOpen}
        travelPlans={tripInsuranceQuotations}
        isLoading={isLoading}
      />
      <EditDrawer isDrawerOpen={isDrawerOpen} handleClose={setIsDrawerOpen} />
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <s.BackgroundWrapper>
            <s.DarkBackground />
            <s.ContentContainer>
              {isMobile ? (
                <s.ContextWrapper>
                  <Text color="white" type="heading4">
                    Seguro Viagem
                  </Text>
                </s.ContextWrapper>
              ) : (
                <s.ContextWrapper>
                  <s.SimulationText color="gray4" type="headline">
                    Simulacao
                  </s.SimulationText>
                  <Text color="white" type="headline">
                    Seguro Viagem
                  </Text>
                </s.ContextWrapper>
              )}
              <s.Divider />
              <s.ContentWrapper>
                {contentWrapper()}
                <s.CardsWrapper>
                  {tripInsuranceQuotations &&
                    tripInsuranceQuotations.map((quotation: IPlan) => {
                      const firstCoverageAmount = quotation.ViagemCobertura.coberturas.find(
                        coverage =>
                          coverage.descricao.toLowerCase() ===
                          'despesas médicas, hospitalares e/ou odontológicas - dmho'
                      )
                      const secondCoverageAmount = quotation.ViagemCobertura.coberturas.find(
                        coverage =>
                          coverage.descricao.toLowerCase() === 'morte acidental'
                      )
                      const thridCoverageAmount = quotation.ViagemCobertura.coberturas.find(
                        coverage =>
                          coverage.descricao.toLowerCase() ===
                          'extravio de bagagem'
                      )
                      const installment = getTheSixthInstallmentOrLessFormated(
                        quotation.formasPagamento.listaParcelamentoCartao,
                        quotation.formasPagamento.listaParcelamentoCartaoPorto,
                        isPortoSeguroCard
                      )
                      const upfronPayment = getUpfrontPaymentFormated(
                        quotation.formasPagamento.listaParcelamentoCartao,
                        quotation.formasPagamento.listaParcelamentoCartaoPorto,
                        isPortoSeguroCard
                      )
                      return (
                        <PlanCard
                          planName={quotation.nomePlano}
                          planId={quotation.codigoPlano}
                          recommendedPaymentPlan={installment}
                          upfrontPayment={upfronPayment}
                          firstCoverageAmount={firstCoverageAmount?.valor}
                          secondCoverageAmount={secondCoverageAmount?.valor}
                          thridCoverageAmount={thridCoverageAmount?.valor}
                          isLoading={isLoading}
                          key={quotation.nomePlano}
                          onHireClick={handleClick}
                        />
                      )
                    })}
                </s.CardsWrapper>
              </s.ContentWrapper>
              <s.DisclosureWrapper>
                <Text color="gray5" bold>
                  Importante: As coberturas de seguro e serviços de assistência
                  possuem restrições para indenização e/ou prestação de
                  serviços, com riscos excluídos.
                </Text>
                <Text color="gray5" bold>
                  Consulte as{' '}
                  <s.Link href="www.google.com.br">Condições Gerais</s.Link> e{' '}
                  <s.Link href="www.google.com.br">
                    Manual de Assistência Emergencial
                  </s.Link>{' '}
                  do plano escolhido.
                </Text>
                <Text color="gray5" bold>
                  Valores calculados em reais, considerando o câmbio do dia da
                  cotação.
                </Text>
                <Text color="gray5" bold>
                  Orçamento válido somente para a data da cotação.
                </Text>
              </s.DisclosureWrapper>
            </s.ContentContainer>
          </s.BackgroundWrapper>

          <s.Footer>
            <s.Button
              data-gtm-name="comparativo coberturas"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              outline
              onClick={() => setModalOpen(true)}
            >
              comparativo de coberturas
            </s.Button>
            <s.Button
              data-gtm-name="alterar dados"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              outline
              onClick={() => setIsDrawerOpen(true)}
            >
              alterar dados
            </s.Button>
          </s.Footer>
        </>
      )}
    </s.Container>
  )
}

export default ChoosePlan
