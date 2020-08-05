import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import useSelectedPosition from 'hooks/useSelectedPosition'
import FundInfo from './FundInfo'
import ProfitabilityTable from './ProfitabilityTable'
import Text from 'components/Text'

import ErrorState from 'pages/Home/commons/ErrorState'
import LoadingState from 'pages/Home/commons/LoadingState'

import { IModalProps } from 'pages/Investments/Management/types'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'

import { Container } from './styles'

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

  const { auth, isLoading, hasError } = useSelector((state: any) => ({
    auth: state.auth,
    isLoading: state.investmentPosition.isLoading,
    hasError: state.investmentPosition.hasError,
  }))

  const handleFetchPosition = useCallback(() => {
    dispatch(GetPositionDataRequest(auth.cpf))
  }, [dispatch, auth.cpf])

  const renderContent = () => {
    if (isLoading) {
      return (
        <Container>
          <LoadingState data-testid="fundInfo-loading-component" />
        </Container>
      )
    }

    if (hasError) {
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
        <ProfitabilityTable fundId={position.id} />
      </>
    )
  }

  return renderContent()
}

export default FundInfoPanel
