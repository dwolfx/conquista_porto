import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatMoney, handleGiwRedirect, formatDotToComma } from 'helpers'
import ConquistaButton from 'components/Button'

import Text from 'components/Text'

import {
  FundoWrapper,
  WrapperContent,
  FundoNameWrapper,
  LockIcon,
  FundoOutterWrapper,
  CustomPopover,
  RiskColorTag,
} from './styles'

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

const FormatFundoCell = ({ cell }) => (
  <FundoOutterWrapper>
    <RiskColorTag borderRisk={cell.row.original.perfil_risco_ordem} />
    <FundoWrapper {...cell.getCellProps()}>
      <FundoNameWrapper>{cell.row.original.apelido}</FundoNameWrapper>
      <Text type="caption" color="gray4" bold textAlign="left">
        {cell.row.original.categoria_arena}
      </Text>
    </FundoWrapper>
  </FundoOutterWrapper>
)

const FormatMoneyCell = column => (
  <WrapperContent isTbody>{formatMoney(column.cell.value)}</WrapperContent>
)

const FormatEnabledCell = column => {
  const { state: locationState } = useLocation()
  return (
    <WrapperContent isTbody>
      {column.cell.value && column.cell.row.original.aplicao_liberada ? (
        <ConquistaButton
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={column.cell.row.original.apelido}
          data-gtm-name="investir"
          type="button"
          color="secondary"
          onClick={() => {
            handleGiwRedirect(
              `portaldecliente/conquista/aplicacao?idFundo=${
                column.cell.row.original.id_fundo
              }&r=true${
                locationState.idGoal ? `idObjetivo=${locationState.idGoal}` : ''
              }`
            )
          }}
        >
          Investir
        </ConquistaButton>
      ) : (
        <CustomPopover
          content="Fundo fechado para aplicações"
          placement="left"
          tooltip
        >
          <LockIcon />
        </CustomPopover>
      )}
    </WrapperContent>
  )
}

const FormatDefault = column => (
  <WrapperContent>{column.cell.value}</WrapperContent>
)

const FormatColumnDotToComma = column => (
  <WrapperContent>
    {column.cell.value.toString() !== '-'
      ? `${formatDotToComma(column.cell.value)}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

const FormatColumnDotToCommaBold = column => (
  <WrapperContent isBold>
    {column.cell.value.toString() !== '-'
      ? `${formatDotToComma(column.cell.value)}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

export default function FormatColumns(columns, toggleModal) {
  const formatters = {
    fundo: column => ({
      ...column,
      Cell: FormatFundoCell,
      toggleModal,
      sortType(
        { original: { apelido: nextNickname } },
        { original: { apelido: currentNickname } }
      ) {
        const [fst] = [nextNickname, currentNickname].sort(collator.compare)
        return fst === nextNickname ? -1 : 1
      },
    }),
    is_fundo_ativo: column => ({
      ...column,
      disableSortBy: true,
      Cell: cell => FormatEnabledCell(cell),
    }),
    minimo_inicial: column => ({
      ...column,
      Cell: FormatMoneyCell,
    }),
    taxa_administracao: column => ({
      ...column,
      Cell: FormatColumnDotToComma,
    }),
    rentabilidade: column => ({
      ...column,
      sortType(
        { original: { [column.accessor]: nextValue } },
        { original: { [column.accessor]: currentValue } }
      ) {
        const [fst] = [nextValue, currentValue].sort((a, b) => a - b)
        return fst === nextValue ? -1 : 1
      },
      Cell: FormatColumnDotToCommaBold,
    }),
    default: column => ({
      ...column,
      Cell: FormatDefault,
    }),
  }

  return columns.map(column => {
    if (column.accessor.includes('rentabil_fundo')) {
      return formatters[column.accessor]
        ? formatters[column.accessor](column)
        : formatters.rentabilidade(column)
    }

    return formatters[column.accessor]
      ? formatters[column.accessor](column)
      : formatters.default(column)
  })
}

FormatFundoCell.propTypes = {
  cell: PropTypes.shape({
    getCellProps: PropTypes.func.isRequired,
    row: PropTypes.shape({
      original: PropTypes.shape({
        url_logo_gestor: PropTypes.string,
        apelido: PropTypes.string,
        perfil_risco_ordem: PropTypes.string,
        categoria_arena: PropTypes.string,
        id_fundo: PropTypes.string,
      }),
    }),
  }).isRequired,
  column: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}
