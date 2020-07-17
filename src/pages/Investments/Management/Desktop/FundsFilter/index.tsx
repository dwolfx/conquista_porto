import React from 'react'
import {
  TFundsLayout,
  FUNDS_FILTER_TYPES,
  GTM_DATA_FUNDS_FILTROS,
} from 'pages/Investments/Management/types'
import {
  LeftContent,
  RightContent,
  RowContent,
  ButtonTagStyled,
  ButtonClearFilters,
  ButtonViewModeGrid,
  ButtonViewModeList,
} from './styles'

interface IProps {
  filters: any
  viewMode: TFundsLayout
  isNextPriorButtonsVisible: boolean
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

const FundsFilter: React.FC<IProps> = ({
  filters,
  viewMode,
  onHandleChangeView,
  onHandleChangeFilter,
}) => {
  const handleFilters = (category: string) => {
    if (!filters.includes(category)) {
      onHandleChangeFilter([...filters, category])
    } else {
      onHandleChangeFilter([
        ...filters.filter((item: any) => item !== category),
      ])
    }
  }

  const handleClearFilters = () => {
    onHandleChangeFilter([])
  }

  const handleFilterColors = (category: string) => {
    return filters.includes(category) ? 'primary' : ''
  }

  const handleButtonViewModeColors = (buttonViewMode: TFundsLayout) => {
    return viewMode === buttonViewMode ? 'primary' : 'secondary'
  }

  return (
    <RowContent>
      <LeftContent>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[1])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[1])}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria renda fixa"
        >
          renda fixa
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[2])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[2])}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria multimercado"
        >
          multimercado
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[3])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[3])}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria acoes"
        >
          ações
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[4])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[4])}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria inv. no exterior"
        >
          inv. no exterior
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[5])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[5])}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria cambial"
        >
          cambial
        </ButtonTagStyled>
        <ButtonClearFilters
          noIcon
          onClick={handleClearFilters}
          hasFilter={filters.length > 0}
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao filtro categoria limpar filtros"
        >
          limpar filtros
        </ButtonClearFilters>
      </LeftContent>
      <RightContent viewMode={viewMode}>
        <ButtonViewModeGrid
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao fundos layout cards"
          backgroundcolor={handleButtonViewModeColors('CARDS')}
          onClick={() => onHandleChangeView('CARDS')}
        />
        <ButtonViewModeList
          {...GTM_DATA_FUNDS_FILTROS}
          data-gtm-name="botao fundos layout lista"
          backgroundcolor={handleButtonViewModeColors('LIST')}
          onClick={() => onHandleChangeView('LIST')}
        />
      </RightContent>
    </RowContent>
  )
}

export default FundsFilter
