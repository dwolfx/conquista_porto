import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

import {
  RowFilterByType,
  ButtonTagStyled,
  FilterRowContent,
  SquareRiskContainer,
  SquareRiskLevel,
  Divisor,
} from './styles'

export const FILTER_TYPES = {
  1: 'renda fixa',
  2: 'multimercado',
  3: 'renda variável',
  4: 'investimento no exterior',
  5: 'cambial',
}

const FILTER_RISKS = {
  1: 'baixo',
  2: 'medio-baixo',
  3: 'medio',
  4: 'medio-alto',
  5: 'alto',
}

export default function Filter({ filter, onChangeFilter }) {
  const handleClickFilterByType = categoria => {
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

  const handleClickFilterByRisk = risk => {
    if (risk === filter.byPerfilRisco) {
      onChangeFilter({ ...filter, byPerfilRisco: null })
    } else {
      onChangeFilter({ ...filter, byPerfilRisco: risk })
    }
  }

  return (
    <FilterRowContent alignItems="center" justifyContent="between">
      <RowFilterByType>
        <ButtonTagStyled
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
            selectedRisk={filter.byPerfilRisco}
            value={FILTER_RISKS[1]}
            color="darkBlue2"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[1])
            }}
          />
          <SquareRiskLevel
            selectedRisk={filter.byPerfilRisco}
            value={FILTER_RISKS[2]}
            color="blue4"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[2])
            }}
          />
          <SquareRiskLevel
            selectedRisk={filter.byPerfilRisco}
            value={FILTER_RISKS[3]}
            color="green3"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[3])
            }}
          />
          <SquareRiskLevel
            selectedRisk={filter.byPerfilRisco}
            value={FILTER_RISKS[4]}
            color="yellow2"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[4])
            }}
          />
          <SquareRiskLevel
            selectedRisk={filter.byPerfilRisco}
            value={FILTER_RISKS[5]}
            color="magenta2"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[5])
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
        <Divisor />
        <ButtonLink
          noIcon
          disabled={
            !filter.byPerfilRisco && filter.byCategoriaArena.length === 0
          }
          onClick={() => {
            onChangeFilter({ byPerfilRisco: null, byCategoriaArena: [] })
          }}
        >
          limpar filtros
        </ButtonLink>
      </Row>
    </FilterRowContent>
  )
}

Filter.propTypes = {
  filter: PropTypes.shape({
    byCategoriaArena: PropTypes.arrayOf(PropTypes.string),
    byPerfilRisco: PropTypes.string,
  }).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}
