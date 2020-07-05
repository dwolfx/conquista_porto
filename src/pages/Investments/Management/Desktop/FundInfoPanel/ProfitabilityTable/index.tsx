import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleVariance } from 'pages/Investments/Management/utils'
import Text from 'components/Text'
import { TableGridContent, Cell, CellHeader, StateContainer } from './styles'
import { formatNumber } from 'helpers'

import ErrorState from 'pages/Home/commons/ErrorState'
import LoadingState from 'pages/Home/commons/LoadingState'

import { GetComparativeProfitabilityDataRequest } from 'store/modules/Investment/ComparativeProfitability/action'

interface IProfitabilityTableProps {
  fundId?: string
}

const ProfitabilityTable: React.FC<IProfitabilityTableProps> = ({ fundId }) => {
  const dispatch = useDispatch()

  const printFieldText = (text: string) => text || '---'
  const printFieldTextWithPercent = (text: string) =>
    text && text !== '-' ? `${formatNumber(text)}%` : '---'

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
      <>
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
              Rentabilidade em %*
            </Text>
          </Cell>
          <Cell borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_fundo.rentabil_mes_anteiror
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_fundo.rentabil_ano
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_fundo.rentabil_12_meses
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_fundo.rentabil_24_meses
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_fundo.rentabil_36_meses
                )}
            </Text>
          </Cell>

          <Cell alignLeft borderBottom>
            <Text bold type="body" color="gray5">
              {`Referência em ${profitability &&
                printFieldText(
                  profitability.hist_rentabil_benchmark.benchmark.nome
                )}*`}
            </Text>
          </Cell>
          <Cell borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_benchmark.rentabil_mes_anteiror
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_benchmark.rentabil_Ano
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_benchmark.rentabil_12_meses
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_benchmark.rentabil_24_meses
                )}
            </Text>
          </Cell>
          <Cell borderLeft borderBottom>
            <Text type="subheading" color="gray6">
              {profitability &&
                printFieldTextWithPercent(
                  profitability.hist_rentabil_benchmark.rentabil_36_meses
                )}
            </Text>
          </Cell>

          <Cell alignLeft>
            <Text bold type="body" color="gray5">
              Variação (P.P.)
            </Text>
          </Cell>
          <Cell>
            <Text type="subheading" color="gray6">
              {handleVariance(
                profitability?.hist_rentabil_benchmark.benchmark.nome,
                profitability?.hist_rentabil_fundo.rentabil_mes_anteiror,
                profitability?.hist_rentabil_benchmark.rentabil_mes_anteiror
              )}
            </Text>
          </Cell>
          <Cell borderLeft>
            <Text type="subheading" color="gray6">
              {handleVariance(
                profitability?.hist_rentabil_benchmark.benchmark.nome,
                profitability?.hist_rentabil_fundo.rentabil_ano,
                profitability?.hist_rentabil_benchmark.rentabil_Ano
              )}
            </Text>
          </Cell>
          <Cell borderLeft>
            <Text type="subheading" color="gray6">
              {handleVariance(
                profitability?.hist_rentabil_benchmark.benchmark.nome,
                profitability?.hist_rentabil_fundo.rentabil_12_meses,
                profitability?.hist_rentabil_benchmark.rentabil_12_meses
              )}
            </Text>
          </Cell>
          <Cell borderLeft>
            <Text type="subheading" color="gray6">
              {handleVariance(
                profitability?.hist_rentabil_benchmark.benchmark.nome,
                profitability?.hist_rentabil_fundo.rentabil_24_meses,
                profitability?.hist_rentabil_benchmark.rentabil_24_meses
              )}
            </Text>
          </Cell>
          <Cell borderLeft>
            <Text type="subheading" color="gray6">
              {handleVariance(
                profitability?.hist_rentabil_benchmark.benchmark.nome,
                profitability?.hist_rentabil_fundo.rentabil_36_meses,
                profitability?.hist_rentabil_benchmark.rentabil_36_meses
              )}
            </Text>
          </Cell>
        </TableGridContent>
        {/*<Text type="caption" bold color="gray6">
        *O CDI é uma referência do mercado para quanto seu dinheiro pode render.
        A referência é dada com base no valor ganho pelos bancos de um dia para
        outro.
        </Text>*/}
      </>
    )
  }

  return renderContent()
}

export default ProfitabilityTable
