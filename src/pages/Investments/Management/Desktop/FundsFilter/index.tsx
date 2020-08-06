import React from 'react'
import { useSelector } from 'react-redux'

import {
  TFundsLayout,
  GTM_DATA_FUNDS_FILTROS,
} from 'pages/Investments/Management/types'
import useFundsList from 'pages/Investments/Management/useFundsList'

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
  const { investmentPosition } = useSelector((state: any) => ({
    investmentPosition: state.investmentPosition.data,
  }))

  const fundsListToFilters = [
    ...new Set(
      investmentPosition?.map(
        // TODO: Trocar  categoria por categoria_arena
        (fund: { [item: string]: any }) => fund.categoria
      )
    ),
  ]
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

  const getFilterName = (category: string): string => {
    if (category === 'renda variável') {
      return 'ações'
    }
    if (category === 'investimento no exterior') {
      return 'inv. no exterior'
    }
    return category
  }

  return (
    <RowContent>
      <LeftContent>
        {fundsListToFilters &&
          fundsListToFilters.map((category: any) => (
            <ButtonTagStyled
              key={category}
              color={handleFilterColors(category.toLowerCase())}
              onClick={() => handleFilters(category.toLowerCase())}
              {...GTM_DATA_FUNDS_FILTROS}
              data-gtm-name={`botao filtro categoria ${category}`}
            >
              {getFilterName(category.toLowerCase())}
            </ButtonTagStyled>
          ))}
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
