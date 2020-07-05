import React from 'react'
import {
  TFundsLayout,
  FUNDS_FILTER_TYPES,
} from 'pages/Investments/Management_old/types'
import {
  LeftContent,
  RightContent,
  RowContent,
  ButtonTagStyled,
  ButtonClear,
  ButtonLayoutGrid,
  ButtonLayoutList,
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
    if (filters.includes(category)) {
      return 'primary'
    }
    return ''
  }

  return (
    <RowContent>
      <LeftContent>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[1])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[1])}
        >
          renda fixa
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[2])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[2])}
        >
          multimercado
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[3])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[3])}
        >
          ações
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[4])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[4])}
        >
          inv. no exterior
        </ButtonTagStyled>
        <ButtonTagStyled
          color={handleFilterColors(FUNDS_FILTER_TYPES[5])}
          onClick={() => handleFilters(FUNDS_FILTER_TYPES[5])}
        >
          cambial
        </ButtonTagStyled>
        <ButtonClear noIcon onClick={handleClearFilters}>
          limpar filtros
        </ButtonClear>
      </LeftContent>
      <RightContent viewMode={viewMode}>
        <ButtonLayoutGrid
          data-gtm-subname="fundos filtros"
          data-gtm-name="botao fundos layout cards"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          backgroundcolor={viewMode === 'CARDS' ? 'primary' : 'secondary'}
          onClick={() => onHandleChangeView('CARDS')}
        />
        <ButtonLayoutList
          data-gtm-subname="fundos filtros"
          data-gtm-name="botao fundos layout lista"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          backgroundcolor={viewMode === 'LIST' ? 'primary' : 'secondary'}
          onClick={() => onHandleChangeView('LIST')}
        />
      </RightContent>
    </RowContent>
  )
}

export default FundsFilter
