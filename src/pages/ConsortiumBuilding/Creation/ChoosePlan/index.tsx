import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import {
  IConsortiumBuildingProposalSimulation,
  ISimulation,
} from 'store/modules/ConsortiumBuilding/ProposalSimulations/types'
import { PostProposalSimulationsRequest } from 'store/modules/ConsortiumBuilding/ProposalSimulations/action'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { StepComponentProps } from 'hooks/FluxManagement/types'

import { GetCountriesRequest } from 'store/modules/ConsortiumBuilding/Countries/action'
import { GetCivilStatusRequest } from 'store/modules/ConsortiumBuilding/CivilStatus/action'
import { GetFatcaRequest } from 'store/modules/ConsortiumBuilding/Fatca/action'
import { GetJobsRequest } from 'store/modules/ConsortiumBuilding/Jobs/action'
import { IFormConsortiumBuilding, Steps } from '../types'
import * as s from './styles'
import PlanCard from './PlanCard'

const ChoosePlan: React.FC = () => {
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()
  const { updateForm, form } = useFormFluxManagement<IFormConsortiumBuilding>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()
  const { addToast } = useToast()

  const {
    consortiumBuildingProposalSimulations,
    isLoading,
    hasError,
  } = useSelector(
    (state: {
      consortiumBuildingProposalSimulations: IConsortiumBuildingProposalSimulation
    }) => ({
      consortiumBuildingProposalSimulations:
        state.consortiumBuildingProposalSimulations.data?.simulacoes,
      isLoading: state.consortiumBuildingProposalSimulations.isLoading,
      hasError: state.consortiumBuildingProposalSimulations.hasError,
    })
  )

  const simulationDispatch = useCallback(() => {
    dispatch(
      PostProposalSimulationsRequest({
        payload: {
          tipoPessoa: form.tipoPessoa,
          tipoBusca: form.tipoBusca,
          codigoProduto: form.codigoProduto,
          valorCredito: form.valorCredito || 0,
          uf: form.uf,
          codigoCanal: `${form.codigoCanal}`,
        },
        onErrorToast: addToast,
        onSuccess: () => null,
      })
    )
  }, [addToast, dispatch, form])

  const renderHeader = () => (
    <s.ContextWrapper>
      {!isMobile ? (
        <s.SimulationText color="gray4" type="headline">
          Simulação
        </s.SimulationText>
      ) : null}
      <s.Text color="white" type="headline">
        Consórcio de Imóvel
      </s.Text>
    </s.ContextWrapper>
  )

  const renderTitle = (cardsQuantity: number) => (
    <s.TitleWrapper cardsQuantity={cardsQuantity}>
      {cardsQuantity > 1 ? (
        <s.Title color="white" type={isMobile ? 'heading4' : 'heading3'}>
          Escolha um dos planos mensais
        </s.Title>
      ) : null}
    </s.TitleWrapper>
  )

  const renderContent = () => {
    if (
      !isLoading &&
      consortiumBuildingProposalSimulations &&
      consortiumBuildingProposalSimulations?.length <= 0
    ) {
      return (
        <s.BackgroundWrapper>
          <s.SmallDarkBackground />
          <s.ContentContainer>
            {renderHeader()}
            <s.ErrorState>
              <s.Text type="headline">
                Desculpe, no momento não temos um plano adequado para suas
                necessidades.
              </s.Text>
              <s.ButtonsWrapper>
                <s.ExitButton
                  loading={isLoading}
                  onClick={() => instantiate(Steps.chooseState)}
                >
                  INICIO
                </s.ExitButton>
                <s.SimulateAgainButton
                  outline
                  loading={isLoading}
                  onClick={() => simulationDispatch()}
                >
                  SIMULAR NOVAMENTE
                </s.SimulateAgainButton>
              </s.ButtonsWrapper>
            </s.ErrorState>
          </s.ContentContainer>
        </s.BackgroundWrapper>
      )
    }
    if (hasError) {
      return (
        <s.BackgroundWrapper>
          <s.SmallDarkBackground />
          <s.ContentContainer>
            {renderHeader()}
            <s.ErrorState>
              <s.Text type="headline" color="magenta2">
                Desculpe, não foi possível carregar suas informações. Aguarde
                alguns instantes e tente novamente.
              </s.Text>
              <s.TryAgainButton
                loading={isLoading}
                onClick={() => simulationDispatch()}
              >
                TENTAR NOVAMENTE
              </s.TryAgainButton>
            </s.ErrorState>
          </s.ContentContainer>
        </s.BackgroundWrapper>
      )
    }
    if (isLoading) {
      return (
        <s.BackgroundWrapper>
          <s.SmallDarkBackground />
          <s.ContentContainer>
            {renderHeader()}
            <s.LoadingContainer>
              <s.Loading
                type="bar"
                legend="Aguarde, estamos buscando as melhores opções para você..."
                textAlign="center"
              />
            </s.LoadingContainer>
          </s.ContentContainer>
        </s.BackgroundWrapper>
      )
    }

    return (
      <>
        <s.BackgroundWrapper>
          <s.DarkBackground />
          <s.ContentSchemeContainer>
            {renderHeader()}
            <s.Divider />
            <s.ContentWrapper>
              {consortiumBuildingProposalSimulations &&
                renderTitle(consortiumBuildingProposalSimulations?.length)}
              <s.CardsWrapper
                cardsQuantity={
                  consortiumBuildingProposalSimulations?.length || 1
                }
              >
                {consortiumBuildingProposalSimulations &&
                  consortiumBuildingProposalSimulations.map(
                    (simulation: ISimulation) => (
                      <PlanCard
                        creditValue={simulation.valorCredito}
                        monthlyValue={simulation.valorParcela}
                        numberInstallment={simulation.prazo}
                        groupCode={simulation.codigoGrupo}
                        quota={simulation.numeroCota}
                        reserveFund={simulation.fundoReserva}
                        administrativeFee={simulation.taxaAdministrativa}
                        lifeInsurance={simulation.seguroVida}
                        key={simulation.codigoGrupo}
                        handlerClick={() => {
                          updateForm({
                            ...form,
                            plan: simulation,
                          })

                          dispatch(GetCountriesRequest())
                          dispatch(GetCivilStatusRequest())
                          dispatch(GetFatcaRequest())
                          dispatch(GetJobsRequest())
                          instantiate(Steps.informationConfirmationStep)
                        }}
                      />
                    )
                  )}
              </s.CardsWrapper>
            </s.ContentWrapper>
          </s.ContentSchemeContainer>
        </s.BackgroundWrapper>

        <s.Footer>
          <s.Button
            data-gtm-name="alterar dados"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            outline
            onClick={() => {}}
          >
            alterar dados
          </s.Button>
        </s.Footer>
      </>
    )
  }

  return <s.Container>{renderContent()}</s.Container>
}

export default ChoosePlan
