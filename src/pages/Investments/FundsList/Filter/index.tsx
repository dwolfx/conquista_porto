import React from 'react'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import useMedia from 'hooks/useMedia'

import {
  FILTER_TYPES,
  FILTER_RISKS,
} from 'pages/Investments/FundsList/constants'

import {
  RowFilterByType,
  ButtonTagStyled,
  FilterRowContent,
  SquareRiskContainer,
  SquareRiskLevel,
  VerticalDivisor,
  Badge,
} from './styles'
import { IFundSort } from '../DrawerFilter/sortFundList'

export interface IFilterProps {
  byCategoriaArena: string[]
  byPerfilRisco: string[]
}

interface IProps {
  filter: IFilterProps
  filtersCount: number
  isFiltersClean: boolean
  disabled: boolean
  onChangeIsDrawerOpen: (isOpen: boolean) => void
  onChangeFilter: (filter: IFilterProps) => void
  onChangeSort: (sort: IFundSort) => void
  onClearFilter: () => void
  onClearSort: () => void
}

const Filter: React.FC<IProps> = ({
  filter,
  filtersCount,
  disabled,
  onChangeFilter,
  onChangeIsDrawerOpen,
  onClearFilter,
  onClearSort,
  isFiltersClean,
}) => {
  const isTablet = useMedia('lg')
  const handleClickFilterByType = (categoria: string) => {
    if (filter.byCategoriaArena.includes(categoria)) {
      onChangeFilter({
        ...filter,
        byCategoriaArena: filter.byCategoriaArena.filter(
          item => item !== categoria
        ),
      })
    } else {
      onChangeFilter({
        ...filter,
        byCategoriaArena: [...filter.byCategoriaArena, categoria],
      })
    }
  }

  const handleClickFilterByRisk = (risco: string) => {
    if (filter.byPerfilRisco.includes(risco)) {
      onChangeFilter({
        ...filter,
        byPerfilRisco: filter.byPerfilRisco.filter(item => item !== risco),
      })
    } else {
      onChangeFilter({
        ...filter,
        byPerfilRisco: [...filter.byPerfilRisco, risco],
      })
    }
  }

  return (
    <FilterRowContent alignItems="center" justifyContent="between">
      {isTablet ? (
        <Row alignItems="center">
          <ButtonLink
            noIcon
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                onChangeIsDrawerOpen(true)
              }
            }}
          >
            ver filtros
          </ButtonLink>
          <VerticalDivisor />
          <ButtonLink
            noIcon
            disabled={isFiltersClean || disabled}
            onClick={() => {
              if (!disabled) {
                onClearFilter()
                onClearSort()
              }
            }}
          >
            limpar filtros
          </ButtonLink>
          {!!filtersCount && <Badge>{filtersCount}</Badge>}
        </Row>
      ) : (
        <RowFilterByType>
          <ButtonTagStyled
            disabled={disabled}
            color={
              filter.byCategoriaArena.includes(FILTER_TYPES[1]) ? 'primary' : ''
            }
            onClick={() => {
              handleClickFilterByType(FILTER_TYPES[1])
            }}
          >
            Renda Fixa
          </ButtonTagStyled>
          <ButtonTagStyled
            disabled={disabled}
            color={
              filter.byCategoriaArena.includes(FILTER_TYPES[2]) ? 'primary' : ''
            }
            onClick={() => {
              handleClickFilterByType(FILTER_TYPES[2])
            }}
          >
            multimercado
          </ButtonTagStyled>
          <ButtonTagStyled
            disabled={disabled}
            color={
              filter.byCategoriaArena.includes(FILTER_TYPES[3]) ? 'primary' : ''
            }
            onClick={() => {
              handleClickFilterByType(FILTER_TYPES[3])
            }}
          >
            ações
          </ButtonTagStyled>
          <ButtonTagStyled
            disabled={disabled}
            color={
              filter.byCategoriaArena.includes(FILTER_TYPES[4]) ? 'primary' : ''
            }
            onClick={() => {
              handleClickFilterByType(FILTER_TYPES[4])
            }}
          >
            inv. no exterior
          </ButtonTagStyled>
          <ButtonTagStyled
            disabled={disabled}
            color={
              filter.byCategoriaArena.includes(FILTER_TYPES[5]) ? 'primary' : ''
            }
            onClick={() => {
              handleClickFilterByType(FILTER_TYPES[5])
            }}
          >
            cambial
          </ButtonTagStyled>
        </RowFilterByType>
      )}
      <Row alignItems="center">
        <Text
          type="title"
          color="gray5"
          bold
          css={`
            margin-right: 21px;
          `}
        >
          Baixo Risco
        </Text>
        <SquareRiskContainer>
          <SquareRiskLevel
            disabled={disabled}
            selectedRisk={
              filter.byPerfilRisco.includes(FILTER_RISKS[1]) || isTablet
            }
            value={FILTER_RISKS[1]}
            color="darkBlue2"
            onClick={() => {
              if (!isTablet && !disabled) {
                handleClickFilterByRisk(FILTER_RISKS[1])
              }
            }}
          />
          <SquareRiskLevel
            disabled={disabled}
            selectedRisk={
              filter.byPerfilRisco.includes(FILTER_RISKS[2]) || isTablet
            }
            value={FILTER_RISKS[2]}
            color="blue4"
            onClick={() => {
              if (!isTablet && !disabled) {
                handleClickFilterByRisk(FILTER_RISKS[2])
              }
            }}
          />
          <SquareRiskLevel
            disabled={disabled}
            selectedRisk={
              filter.byPerfilRisco.includes(FILTER_RISKS[3]) || isTablet
            }
            value={FILTER_RISKS[3]}
            color="green3"
            onClick={() => {
              if (!isTablet && !disabled) {
                handleClickFilterByRisk(FILTER_RISKS[3])
              }
            }}
          />
          <SquareRiskLevel
            disabled={disabled}
            selectedRisk={
              filter.byPerfilRisco.includes(FILTER_RISKS[4]) || isTablet
            }
            value={FILTER_RISKS[4]}
            color="yellow2"
            onClick={() => {
              if (!isTablet && !disabled) {
                handleClickFilterByRisk(FILTER_RISKS[4])
              }
            }}
          />
          <SquareRiskLevel
            disabled={disabled}
            selectedRisk={
              filter.byPerfilRisco.includes(FILTER_RISKS[5]) || isTablet
            }
            value={FILTER_RISKS[5]}
            color="magenta2"
            onClick={() => {
              if (!isTablet && !disabled) {
                handleClickFilterByRisk(FILTER_RISKS[5])
              }
            }}
          />
        </SquareRiskContainer>
        <Text
          type="title"
          color="gray5"
          bold
          css={`
            margin-left: 21px;
          `}
        >
          Alto Risco
        </Text>
        {!isTablet && (
          <>
            <VerticalDivisor />
            <ButtonLink
              noIcon
              disabled={
                filter.byPerfilRisco.length === 0 &&
                filter.byCategoriaArena.length === 0
              }
              onClick={() => {
                if (!disabled) {
                  onClearFilter()
                }
              }}
            >
              limpar filtros
            </ButtonLink>
          </>
        )}
      </Row>
    </FilterRowContent>
  )
}

export default Filter
