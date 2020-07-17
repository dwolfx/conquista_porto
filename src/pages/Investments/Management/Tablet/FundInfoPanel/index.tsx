import React, { useCallback } from 'react'

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

interface IProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
}

const FundInfoPanel = ({ onChangeModalSuitabilityInfo }: IProps) => {
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
        <InfoContainer>
          <LoadingStyled
            data-testid="fundInfo-loading-component"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </InfoContainer>
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
        />
        <TextHeader>Histórico de Rentabilidade</TextHeader>
        <ProfitabilityInfo
          profitability={position.fundo.comparativo_hist_rentabil}
        />
      </>
    )
  }

  return renderContent()
}

export default FundInfoPanel
