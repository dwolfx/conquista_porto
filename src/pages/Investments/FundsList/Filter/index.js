import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

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
} from './styles'

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
    if (filter.byPerfilRisco.includes(risk)) {
      onChangeFilter({
        ...filter,
        byPerfilRisco: filter.byPerfilRisco.filter(item => item !== risk),
      })
    } else {
      onChangeFilter({
        ...filter,
        byPerfilRisco: [...filter.byPerfilRisco, risk],
      })
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
            selectedRisk={!filter.byPerfilRisco.includes(FILTER_RISKS[1])}
            value={FILTER_RISKS[1]}
            color="darkBlue2"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[1])
            }}
          />
          <SquareRiskLevel
            selectedRisk={!filter.byPerfilRisco.includes(FILTER_RISKS[2])}
            value={FILTER_RISKS[2]}
            color="blue4"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[2])
            }}
          />
          <SquareRiskLevel
            selectedRisk={!filter.byPerfilRisco.includes(FILTER_RISKS[3])}
            value={FILTER_RISKS[3]}
            color="green3"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[3])
            }}
          />
          <SquareRiskLevel
            selectedRisk={!filter.byPerfilRisco.includes(FILTER_RISKS[4])}
            value={FILTER_RISKS[4]}
            color="yellow2"
            onClick={() => {
              handleClickFilterByRisk(FILTER_RISKS[4])
            }}
          />
          <SquareRiskLevel
            selectedRisk={!filter.byPerfilRisco.includes(FILTER_RISKS[5])}
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
        <VerticalDivisor />
        <ButtonLink
          noIcon
          disabled={
            !filter.byPerfilRisco.length === 0 &&
            filter.byCategoriaArena.length === 0
          }
          onClick={() => {
            onChangeFilter({
              byPerfilRisco: [],
              byCategoriaArena: [],
            })
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
    byPerfilRisco: PropTypes.arrayOf(PropTypes.string),
    orderBy: PropTypes.string,
    sortBy: PropTypes.bool,
  }).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}
