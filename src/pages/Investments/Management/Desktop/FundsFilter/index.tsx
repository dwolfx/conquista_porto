import React from 'react'
import IconFilter from 'components/Button/Icon'
import { TFundsLayout } from '../../filters'

import {
  LeftContent,
  RightContent,
  RowContent,
  ButtonTagStyled,
  ButtonClear,
  PriorNextFundsButtons,
  ButtonLayoutGrid,
  ButtonLayoutList,
} from './styles'

import { FUNDS_FILTER_TYPES } from '../../filters'
interface IProps {
  filters: any
  fundsLayout: TFundsLayout
  isNextPriorButtonsVisible: boolean
  onHandleChangeLayout: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

const FundsFilter: React.FC<IProps> = ({
  filters,
  fundsLayout,
  isNextPriorButtonsVisible,
  onHandleChangeLayout,
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
      <RightContent>
        <ButtonLayoutGrid
          data-gtm-subname="fundos filtros"
          data-gtm-name="botao fundos layout cards"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          backgroundcolor={fundsLayout === 'CARDS' ? 'primary' : 'secondary'}
          onClick={() => onHandleChangeLayout('CARDS')}
        />
        <ButtonLayoutList
          data-gtm-subname="fundos filtros"
          data-gtm-name="botao fundos layout lista"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          backgroundcolor={fundsLayout === 'LIST' ? 'primary' : 'secondary'}
          onClick={() => onHandleChangeLayout('LIST')}
        />
        {isNextPriorButtonsVisible && (
          <PriorNextFundsButtons>
            <IconFilter
              icon="arrowleft"
              size="small"
              isLoading={false}
              onClick={() => {}}
            />
            <IconFilter
              icon="arrowright"
              size="small"
              isLoading={false}
              onClick={() => {}}
            />
          </PriorNextFundsButtons>
        )}
      </RightContent>
    </RowContent>
  )
}

export default FundsFilter
