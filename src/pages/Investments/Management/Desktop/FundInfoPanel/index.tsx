import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import useSelectedPosition from 'hooks/useSelectedPosition'
import FundInfo from './FundInfo'
import ProfitabilityTable from './ProfitabilityTable'
import Text from 'components/Text'

import ErrorState from 'pages/Home/commons/ErrorState'
import LoadingState from 'pages/Home/commons/LoadingState'

import { IModalProps } from 'pages/Investments/Management/Desktop'

import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'

import { Container } from './styles'

interface IProps {
  onChangeModalSuitabilityInfo: (data: IModalProps) => void
}

const FundInfoPanel = ({ onChangeModalSuitabilityInfo }: IProps) => {
  const position = useSelectedPosition()
  const dispatch = useDispatch()

  const { auth } = useSelector((state: any) => ({
    auth: state.auth,
  }))

  const handleFetchPosition = useCallback(() => {
    dispatch(GetPositionDataRequest(auth.cpf))
  }, [dispatch, auth.cpf])

  const renderContent = () => {
    if (!position) {
      return (
        <Container>
          <Text type="headline" color="gray5">
            Não há fundo selecionado
          </Text>
        </Container>
      )
    }

    if (position.isLoading) {
      return (
        <Container>
          <LoadingState data-testid="fundInfo-loading-component" />
        </Container>
      )
    }

    if (position.hasError) {
      return (
        <Container>
          <ErrorState
            data-testid="fundInfo-error-component"
            onRetry={handleFetchPosition}
          />
        </Container>
      )
    }

    return (
      <>
        <FundInfo
          position={position}
          onChangeModalSuitabilityInfo={onChangeModalSuitabilityInfo}
        />
        <ProfitabilityTable
          profitability={position.fundo.comparativo_hist_rentabil}
        />
      </>
    )
  }

  return renderContent()
}

export default FundInfoPanel
