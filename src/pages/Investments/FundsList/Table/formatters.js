import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import { formatMoney } from 'helpers'

import {
  FundoWrapper,
  WrapperContent,
  InformationIcon,
  FundoNameWrapper,
  InvestButton,
  LockIcon,
  FundoOutterWrapper,
  LogoImg,
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

const FormatEnabledCell = column => (
  <WrapperContent isTbody>
    {column.cell.value ? (
      <InvestButton type="button" color="secondary">
        Investir
      </InvestButton>
    ) : (
      <LockIcon />
    )}
  </WrapperContent>
)

const FormatDefault = column => (
  <WrapperContent isTbody>{column.cell.value}</WrapperContent>
)

export default function FormatColumns(columns, toggleModal, isModalOpen) {
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
      Cell: FormatEnabledCell,
    }),
    minimo_inicial: column => ({
      ...column,
      Cell: FormatMoneyCell,
    }),
    default: column => ({
      ...column,
      Cell: FormatDefault,
    }),
  }

  return columns.map(column => {
    if (column.columns) {
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
