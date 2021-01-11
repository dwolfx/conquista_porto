import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PostInsuranceQuotationRequest } from 'store/modules/TripInsurance/InsuranceQuotation/action'
import Text from 'components/Text'
import Switch from 'components/Inputs/Switch'
import LoadingState from 'pages/TripInsurance/Creation/ResponseStates/Loading'
import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import { StepComponent } from 'hooks/FluxManagement/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { ITripInsuranceQuotation } from 'store/modules/TripInsurance/InsuranceQuotation/types'

import {
  getTheSixthInstallmentOrLessFormated,
  getUpfrontPaymentFormated,
} from './helpers'
import * as s from './styles'
import PlanCard from './PlanCard'
import ComparativeModal from '../ComparativeModal'
import EditDrawer from '../EditDrawer'
import { IForm } from '../types'

const ChoosePlan: StepComponent = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isMobile = useMedia('sm')
  const isTabletHorizontal = useMedia('mdUp')
  const isLgDown = useMedia('lg')
  const [modalOpen, setModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPortoSeguroCard, setIsPortoSeguroCard] = useState(false)
  const { form } = useFormFluxManagement<IForm>()

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
                {tripInsuranceQuotations &&
                tripInsuranceQuotations.length === 2 &&
                isTabletHorizontal &&
                isLgDown ? (
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
                        simular em até 12x sem juros com 5% de desconto no
                        Cartão Porto Seguro
                      </s.SwitchText>
                      <Switch
                        id="123"
                        value={isPortoSeguroCard}
                        onChangeSwitch={() =>
                          setIsPortoSeguroCard(!isPortoSeguroCard)
                        }
                        disabled={false}
                        leftLabel=""
                        rightLabel=""
                        isToggle={true}
                      />
                    </s.SwitchWrapper>
                  </s.TitleWrapperColumn>
                ) : tripInsuranceQuotations &&
                  tripInsuranceQuotations.length === 1 &&
                  isTabletHorizontal ? (
                  <s.TitleWrapperCentralized>
                    <s.SwitchWrapper>
                      <s.SwitchText
                        color="white"
                        type="subheading"
                        bold
                        textTransform="uppercase"
                      >
                        simular em até 12x sem juros com 5% de desconto no
                        Cartão Porto Seguro
                      </s.SwitchText>
                      <Switch
                        id="is-porto-seguro-card"
                        value={isPortoSeguroCard}
                        onChangeSwitch={() =>
                          setIsPortoSeguroCard(!isPortoSeguroCard)
                        }
                        isToggle={true}
                      />
                    </s.SwitchWrapper>
                  </s.TitleWrapperCentralized>
                ) : (
                  <s.TitleWrapper>
                    <s.Title
                      color="white"
                      type={isMobile ? 'heading4' : 'heading3'}
                    >
                      Escolha um plano disponível
                    </s.Title>
                    <s.SwitchWrapper>
                      <s.SwitchText
                        color="white"
                        type="subheading"
                        bold
                        textTransform="uppercase"
                      >
                        simular em até 12x sem juros com 5% de desconto no
                        Cartão Porto Seguro
                      </s.SwitchText>
                      <Switch
                        id="123"
                        value={isPortoSeguroCard}
                        onChangeSwitch={() =>
                          setIsPortoSeguroCard(!isPortoSeguroCard)
                        }
                        disabled={false}
                        leftLabel=""
                        rightLabel=""
                        isToggle={true}
                      />
                    </s.SwitchWrapper>
                  </s.TitleWrapper>
                )}
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
                          recommendedPaymentPlan={installment}
                          upfrontPayment={upfronPayment}
                          firstCoverageAmount={firstCoverageAmount?.valor}
                          secondCoverageAmount={secondCoverageAmount?.valor}
                          thridCoverageAmount={thridCoverageAmount?.valor}
                          isLoading={isLoading}
                          key={quotation.nomePlano}
                          onHireClick={() => {}}
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
