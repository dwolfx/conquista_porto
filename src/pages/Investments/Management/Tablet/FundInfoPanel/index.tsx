import React, { useCallback, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import useSelectedPosition from 'hooks/useSelectedPosition'
import FundInfo from './FundInfo'
import Text from 'components/Text'
import ProfitabilityInfo from '../../components/ProfitabilityInfo'

import ErrorState from 'pages/Home/commons/ErrorState'

import { IModalProps } from 'pages/Investments/Management/types'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'
import { Container } from '../../Desktop/FundInfoPanel/styles'
import { TextHeader, InfoContainer, LoadingStyled } from './styles'
import { GetComparativeProfitabilityDataRequest } from 'store/modules/Investment/ComparativeProfitability/action'

interface IProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
  setLayerOpen: (isLayerOpen: boolean) => void
  setIsAwareOfTerms: (isAwareOfTerms: boolean) => void
  setIsInvestorLevelModalOpen: (isInvestorLevelModalOpen: boolean) => void
  isInvestorLevelModalOpen: boolean
}

const FundInfoPanel = ({
  onChangeModalSuitabilityInfo,
  setLayerOpen,
  setIsAwareOfTerms,
  setIsInvestorLevelModalOpen,
  isInvestorLevelModalOpen,
}: IProps) => {
  const position = useSelectedPosition()
  const dispatch = useDispatch()

  const {
    isLoading,
    isLoadingComparative,
    hasErrorComparative,
    hasError,
    comparativeProfitability,
  } = useSelector((state: any) => ({
    isLoading: state.investmentPosition.isLoading,
    hasError: state.investmentPosition.hasError,
    comparativeProfitability: state.comparativeProfitability.data,
    isLoadingComparative: state.comparativeProfitability.isLoading,
    hasErrorComparative: state.comparativeProfitability.hasError,
  }))

  useEffect(() => {
    if (position) {
      dispatch(GetComparativeProfitabilityDataRequest(position?.id))
    }
  }, [position, dispatch])

  const handleFetchPosition = useCallback(() => {
    dispatch(GetPositionDataRequest())
  }, [dispatch])

  const renderContent = () => {
    if (isLoading || isLoadingComparative) {
      return (
        <InfoContainer>
          <LoadingStyled
            data-testid="fundInfo-loading-component"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </InfoContainer>
      )
    }

    if (hasError || hasErrorComparative) {
      return (
        <Container>
          <ErrorState
            data-testid="fundInfo-error-component"
            onRetry={handleFetchPosition}
          />
        </Container>
      )
    }

    if (!position) {
      return (
        <Container>
          <Text type="headline" color="gray5">
            Não há fundo selecionado
          </Text>
        </Container>
      )
    }

    return (
      <>
        <FundInfo
          position={position}
          onChangeModalSuitabilityInfo={onChangeModalSuitabilityInfo}
          setLayerOpen={setLayerOpen}
          setIsAwareOfTerms={setIsAwareOfTerms}
          setIsInvestorLevelModalOpen={setIsInvestorLevelModalOpen}
          isInvestorLevelModalOpen={isInvestorLevelModalOpen}
        />
        <TextHeader>Histórico de Rentabilidade</TextHeader>
        <ProfitabilityInfo profitability={comparativeProfitability} />
      </>
    )
  }

  return renderContent()
}

export default FundInfoPanel
