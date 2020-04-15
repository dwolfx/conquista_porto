import React from 'react'
import PropTypes from 'prop-types'
import { formatMoney, handleGiwRedirect } from 'helpers'
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

const FormatEnabledCell = (column, idGoal) => (
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
            }&r=true${idGoal ? `idObjetivo=${idGoal}` : ''}`
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

const FormatDefault = column => (
  <WrapperContent>{column.cell.value}</WrapperContent>
)

const FormatDotToComma = column => (
  <WrapperContent>
    {column.cell.value.toString() !== '-'
      ? `${column.cell.value.toString().replace('.', ',')}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

const FormatToPercentBold = column => (
  <WrapperContent isPercent>
    {column.cell.value.toString() !== '-'
      ? `${column.cell.value.toString().replace('.', ',')}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

export default function FormatColumns(
  columns,
  toggleModal,
  isModalOpen,
  idGoal
) {
  const formatters = {
    fundo: column => ({
      ...column,
      Cell: FormatFundoCell,
      toggleModal,
      isModalOpen,
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
      Cell: cell => FormatEnabledCell(cell, idGoal),
    }),
    minimo_inicial: column => ({
      ...column,
      Cell: FormatMoneyCell,
    }),
    taxa_administracao: column => ({
      ...column,
      Cell: FormatDotToComma,
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
      Cell: FormatToPercentBold,
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
    isModalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
  }).isRequired,
}
