import React, { useCallback, useEffect, useState } from 'react'
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
  const isMobile = useMedia('xs')

  const [modalOpen, setModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPortoSeguroCard, setIsPortoSeguroCard] = useState(false)
  const { updateForm, form } = useFormFluxManagement<IForm>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const {
    tripInsuranceQuotations,
    isLoading,
    hasError,
    urlGeneralConditions,
    urlManual,
    simulationID,
  } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations:
        state.tripInsuranceQuotation.data?.ViagemPacote.pacotes,
      isLoading: state.tripInsuranceQuotation.isLoading,
      hasError: state.tripInsuranceQuotation.hasError,
      simulationID: state.tripInsuranceQuotation.data?.idSimulacao,
      urlGeneralConditions:
        state.tripInsuranceQuotation.data?.urlCondicoesGerais,
      urlManual: state.tripInsuranceQuotation.data?.urlManuais,
    })
  )

  const handleClick = (choosedPlan: string) => {
    updateForm({
      ...form,
      pacoteEscolhido: choosedPlan,
      passageiroPrincipal: {
        ...form.passageiroPrincipal,
        isResidePais: form.passageiroPrincipal?.isResidePais ?? true,
      },
      idSimulacao: simulationID ?? '',
      pessoaExposta: {
        ...form?.pessoaExposta,
        grauRelacionamento: 2,
      },
    })
    instantiate(Steps.informationConfirmationStep)
  }

  const quotationDispatch = useCallback(() => {
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

  useEffect(() => {
    quotationDispatch()
  }, [quotationDispatch])

  const renderHeader = () => (
    <s.ContextWrapper>
      {!isMobile ? (
        <s.SimulationText color="gray4" type="headline">
          Simulação
        </s.SimulationText>
      ) : null}
      <Text color="white" type="headline">
        Seguro Viagem
      </Text>
    </s.ContextWrapper>
  )

  const renderTitle = (cardsQuantity: number) => (
    <s.TitleWrapper cardsQuantity={cardsQuantity}>
      {cardsQuantity > 1 ? (
        <s.Title color="white" type={isMobile ? 'heading4' : 'heading3'}>
          Escolha um plano disponível
        </s.Title>
      ) : null}

      <s.SwitchWrapper>
        <s.SwitchText
          color="white"
          type="subheading"
          bold
          textTransform="uppercase"
        >
          simular em até 12x sem juros com 5% de desconto no Cartão Porto Seguro
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

  const renderContent = () => {
    if (hasError) {
      return (
        <s.ErrorState>
          <Text type="headline" color="magenta2">
            Desculpe, não foi possível carregar suas informações. Aguarde alguns
            instantes e tente novamente.
          </Text>
          <s.TryAgainButton
            loading={isLoading}
            onClick={() => quotationDispatch()}
          >
            TENTAR NOVAMENTE
          </s.TryAgainButton>
        </s.ErrorState>
      )
    }
    if (isLoading) {
      return <s.LoadingState />
    }

    return (
      <>
        <s.BackgroundWrapper>
          <s.DarkBackground />
          <s.ContentContainer>
            {renderHeader()}
            <s.Divider />
            <s.ContentWrapper>
              {tripInsuranceQuotations &&
                renderTitle(tripInsuranceQuotations.length)}
              <s.CardsWrapper
                cardsQuantity={tripInsuranceQuotations?.length || 1}
              >
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
                possuem restrições para indenização e/ou prestação de serviços,
                com riscos excluídos.
              </Text>
              <Text color="gray5" bold>
                Consulte as{' '}
                <s.Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={urlGeneralConditions}
                >
                  Condições Gerais
                </s.Link>{' '}
                e{' '}
                <s.Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={urlManual}
                >
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
      {renderContent()}
    </s.Container>
  )
}

export default ChoosePlan
