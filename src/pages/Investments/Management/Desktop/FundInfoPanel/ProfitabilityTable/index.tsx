import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Text from 'components/Text'
import { TableGridContent, Cell, CellHeader, StateContainer } from './styles'
import { printFieldText } from 'helpers'

import ErrorState from 'pages/Home/commons/ErrorState'
import LoadingState from 'pages/Home/commons/LoadingState'

import { GetComparativeProfitabilityDataRequest } from 'store/modules/Investment/ComparativeProfitability/action'

interface IProfitabilityTableProps {
  fundId?: string
}

const ProfitabilityTable: React.FC<IProfitabilityTableProps> = ({ fundId }) => {
  const dispatch = useDispatch()

  const {
    profitability,
    profitabilityIsLoading,
    profitabilityHasError,
  } = useSelector((state: any) => ({
    profitabilityIsLoading: state.comparativeProfitability.isLoading,
    profitabilityHasError: state.comparativeProfitability.hasError,
    profitability: state.comparativeProfitability.data,
  }))

  useEffect(() => {
    if (fundId) {
      dispatch(GetComparativeProfitabilityDataRequest(fundId))
    }
  }, [fundId, dispatch])

  const handleFetchProfitability = useCallback(() => {
    if (fundId) {
      dispatch(GetComparativeProfitabilityDataRequest(fundId))
    }
  }, [dispatch, fundId])

  const renderContent = () => {
    if (profitabilityIsLoading) {
      return (
        <StateContainer>
          <LoadingState data-testid="profitability-loading-component" />
        </StateContainer>
      )
    }

    if (profitabilityHasError) {
      return (
        <StateContainer>
          <ErrorState
            data-testid="fundInfo-error-component"
            onRetry={handleFetchProfitability}
          />
        </StateContainer>
      )
    }

    return (
      <TableGridContent>
        <CellHeader alignLeft borderBottom>
          <Text type="subheading" color="gray6">
            HISTÓRICO DE RENTABILIDADE
          </Text>
        </CellHeader>
        <CellHeader borderBottom>
          <Text type="subheading" color="gray6">
            MÊS ANTERIOR
          </Text>
        </CellHeader>
        <CellHeader borderBottom>
          <Text type="subheading" color="gray6">
            ANO
          </Text>
        </CellHeader>
        <CellHeader borderBottom>
          <Text type="subheading" color="gray6">
            ÚLT. 12M
          </Text>
        </CellHeader>
        <CellHeader borderBottom>
          <Text type="subheading" color="gray6">
            24M
          </Text>
        </CellHeader>
        <CellHeader borderBottom>
          <Text type="subheading" color="gray6">
            36M
          </Text>
        </CellHeader>
        <Cell alignLeft borderBottom>
          <Text bold type="body" color="gray5">
            Fundo (%)
          </Text>
        </Cell>
        <Cell borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rentabil_mes_anteiror
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(profitability.hist_rentabil_fundo.rentabil_ano)}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rentabil_12_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rentabil_24_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rentabil_36_meses
              )}
          </Text>
        </Cell>

        <Cell alignLeft borderBottom>
          <Text bold type="body" color="gray5">
            {`${profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.benchmark.nome
              )} (%)`}
          </Text>
        </Cell>
        <Cell borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.rentabil_mes_anteiror
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.rentabil_Ano
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.rentabil_12_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.rentabil_24_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft borderBottom>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.rentabil_36_meses
              )}
          </Text>
        </Cell>

        <Cell alignLeft>
          <Text bold type="body" color="gray5">
            {profitability &&
            profitability.hist_rentabil_benchmark.benchmark.nome === 'CDI'
              ? 'Variação (%)'
              : 'Variação (p.p.)'}
          </Text>
        </Cell>
        <Cell>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rel_fundo_benchmark_mes_ant
              )}
          </Text>
        </Cell>
        <Cell borderLeft>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rel_fundo_benchmark_ano
              )}
          </Text>
        </Cell>
        <Cell borderLeft>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rel_fundo_benchmark_12_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rel_fundo_benchmark_24_meses
              )}
          </Text>
        </Cell>
        <Cell borderLeft>
          <Text type="subheading" color="gray6">
            {profitability &&
              printFieldText(
                profitability.hist_rentabil_fundo.rel_fundo_benchmark_36_meses
              )}
          </Text>
        </Cell>
      </TableGridContent>
    )
  }

  return renderContent()
}

export default ProfitabilityTable
