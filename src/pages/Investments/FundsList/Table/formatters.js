import React from 'react'
import PropTypes from 'prop-types'
import { formatMoney, formatNumber } from 'helpers'
import { useSelector } from 'react-redux'

import Text from 'components/Text'

import {
  FundoWrapper,
  WrapperContent,
  FundoNameWrapper,
  LockIcon,
  FundoOutterWrapper,
  CustomPopover,
  RiskColorTag,
  SizedInvestButton,
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
        {cell.row.original.categoria_arena.toLowerCase() === 'renda variável'
          ? 'Ações'
          : cell.row.original.categoria_arena}
      </Text>
    </FundoWrapper>
  </FundoOutterWrapper>
)

const FormatMoneyCell = column => (
  <WrapperContent isTbody>{formatMoney(column.cell.value)}</WrapperContent>
)

const FormatEnabledCell = (
  column,
  handleLayerOpen,
  clickedFundInvestButton
) => {
  const { suitabilityIsLoading, finatialApplicationIsLoading } = useSelector(
    state => ({
      suitabilityIsLoading: state.suitabilityInfo.isLoading,
      finatialApplicationIsLoading: state.financialApplicationGetData.isLoading,
    })
  )
  return (
    <WrapperContent isTbody lineHeight="0">
      {column.cell.value && column.cell.row.original.aplicao_liberada ? (
        <SizedInvestButton
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={column.cell.row.original.apelido}
          data-gtm-name="investir"
          type="button"
          loading={
            column.cell.row.original.id_fundo === clickedFundInvestButton &&
            (suitabilityIsLoading || finatialApplicationIsLoading)
          }
          loadingColor="white"
          color="secondary"
          onClick={event => {
            event.stopPropagation()
            handleLayerOpen(column.cell.row.original.id_fundo)
          }}
        >
          Investir
        </SizedInvestButton>
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
      ? `${formatNumber(column.cell.value)}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

const FormatColumnDotToCommaBold = column => (
  <WrapperContent isBold>
    {column.cell.value.toString() !== '-'
      ? `${formatNumber(column.cell.value)}%`
      : column.cell.value.toString()}
  </WrapperContent>
)

export default function FormatColumns(
  columns,
  handleLayerOpen,
  clickedFundInvestButton
) {
  const formatters = {
    fundo: column => ({
      ...column,
      Cell: FormatFundoCell,
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
      Cell: cell =>
        FormatEnabledCell(cell, handleLayerOpen, clickedFundInvestButton),
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
