import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'

import {
  IConsortiumBuildingProposalSimulation,
  ISimulation,
} from 'store/modules/ConsortiumBuilding/ProposalSimulations/types'
import { PostProposalSimulationsRequest } from 'store/modules/ConsortiumBuilding/ProposalSimulations/action'

import PlanCard from './PlanCard'

import * as s from './styles'

const ChoosePlan: React.FC = () => {
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()
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
          tipoPessoa: 1,
          tipoBusca: 1,
          codigoProduto: 2,
          valorCredito: 92000, // Colocar informação que vem do form
          uf: 'SP', // Colocar informação que vem do form
          codigoCanal: '7',
        },
        onErrorToast: addToast,
        onSuccess: () => null,
      })
    )
  }, [addToast, dispatch])

  useEffect(() => {
    simulationDispatch()
  }, [simulationDispatch])

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
    if (isLoading) {
      return (
        <s.BackgroundWrapper>
          <s.DarkBackgroundLoading />
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
          <s.ContentContainer>
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
                      />
                    )
                  )}
              </s.CardsWrapper>
            </s.ContentWrapper>
          </s.ContentContainer>
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
