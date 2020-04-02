import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { formatMoney, handleGiwRedirect } from 'helpers'

import Text from 'components/Text'

import {
  FundoWrapper,
  WrapperContent,
  InformationIcon,
  FundoNameWrapper,
  InvestButton,
  LockIcon,
  FundoOutterWrapper,
  LogoImg,
  PopoverCustom,
} from './styles'

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

const FormatFundoCell = ({ cell, column }) => {
  const dispatch = useDispatch()

  return (
    <FundoOutterWrapper>
      <LogoImg bg={cell.row.original.url_logo_gestor}></LogoImg>
      <FundoWrapper {...cell.getCellProps()}>
        <FundoNameWrapper>{cell.row.original.apelido}</FundoNameWrapper>
        <InformationIcon
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={cell.row.original.apelido}
          data-gtm-name="icone de informação do fundo"
          onClick={() => {
            dispatch(GetInvestmentDetailsRequest(cell.row.original.id_fundo))
            column.toggleModal(!column.isModalOpen)
          }}
        />
      </FundoWrapper>
    </FundoOutterWrapper>
  )
}

const FormatMoneyCell = column => (
  <WrapperContent isTbody>{formatMoney(column.cell.value)}</WrapperContent>
)

const FormatEnabledCell = (column, idGoal) => (
  <WrapperContent isTbody>
    {column.cell.value && column.cell.row.original.aplicao_liberada ? (
      <InvestButton
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
      </InvestButton>
    ) : (
      <PopoverCustom
        content={() => (
          <Text type="body" color="gray5">
            Fundo fechado para movimentações
          </Text>
        )}
        placement="left"
      >
        <LockIcon />
      </PopoverCustom>
    )}
  </WrapperContent>
)

const FormatDefault = column => (
  <WrapperContent isTbody>{column.cell.value}</WrapperContent>
)

const FormatDotToComma = column => (
  <WrapperContent isTbody>
    {column.cell.value.toString().replace('.', ',')}
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
      Cell: FormatDotToComma,
    }),
    default: column => ({
      ...column,
      Cell: FormatDefault,
    }),
  }

  return columns.map(column => {
    if (column.columns) {
      if (column.accessor === 'rentabilidade') {
        return {
          ...column,
          columns: column.columns
            ? column.columns.map(formatters.rentabilidade)
            : null,
        }
      }
      return {
        ...column,
        columns: column.columns ? column.columns.map(formatters.default) : null,
      }
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
        id_fundo: PropTypes.string,
      }),
    }),
  }).isRequired,
  column: PropTypes.shape({
    isModalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
  }).isRequired,
}
