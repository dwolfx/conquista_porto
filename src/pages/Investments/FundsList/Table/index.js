import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTable } from 'react-table'
import PropTypes from 'prop-types'

import Modal from 'components/Modal'
import FundsInfo from 'components/Solutions/Investments/FundsInfo'
import { formatMoney } from 'helpers'
import { GetDataRequest } from 'store/modules/Investment/Details/action'

import {
  Table,
  Thead,
  TheadTr,
  TheadTh,
  TheadThWithColumns,
  TheadColumn,
  Tbody,
  TbodyTr,
  TBodyTd,
  FundoWrapper,
  LogoImg,
  AlertIcon,
  FundoNameWrapper,
  InvestButton,
  LockIcon,
  WrapperContent,
  Tabs,
  TabsWrapper,
  TableWrapper,
} from './styles'

const SimpleHeader = ({ header }) => (
  <TheadTh width={header.width}>
    <WrapperContent lineHeight="16px">{header.render('Header')}</WrapperContent>
  </TheadTh>
)

const HeaderWithColumns = ({ header }) => (
  <TheadThWithColumns width={header.width}>
    {header.Header}
    <WrapperContent>
      {header.columns.map(headerColumn => (
        <TheadColumn
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
        >
          {headerColumn.render('Header')}
        </TheadColumn>
      ))}
    </WrapperContent>
  </TheadThWithColumns>
)

const TheadWrapper = ({ header }) => {
  const hasColumns = () => 'columns' in header
  return hasColumns() ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader {...header.getHeaderProps()} header={header} />
  )
}
const FormatFundoCell = ({ cell, column }) => {
  const dispatch = useDispatch()

  return (
    <FundoWrapper {...cell.getCellProps()}>
      <LogoImg alt="logo" src={cell.row.original.url_logo_gestor} />
      <FundoNameWrapper>{cell.row.original.apelido}</FundoNameWrapper>
      <AlertIcon
        onClick={() => {
          dispatch(GetDataRequest(cell.row.original.id_fundo))
          column.toggleModal(!column.isModalOpen)
        }}
      />
    </FundoWrapper>
  )
}

const FormatEnabledCell = column =>
  column.cell.value ? (
    <InvestButton type="button" color="secondary">
      Investir
    </InvestButton>
  ) : (
    <LockIcon />
  )

const FormatMoneyCell = column => formatMoney(column.cell.value)

const formatColumns = (columns, toggleModal, isModalOpen) => {
  const formatters = {
    fundo: column => ({
      ...column,
      Cell: FormatFundoCell,
      toggleModal,
      isModalOpen,
    }),
    is_fundo_ativo: column => ({ ...column, Cell: FormatEnabledCell }),
    minimo_inicial: column => ({
      ...column,
      Cell: FormatMoneyCell,
    }),
  }

  return columns.map(column =>
    column.accessor in formatters ? formatters[column.accessor](column) : column
  )
}

export default function TableFunds({
  data,
  columns: columnsProps,
  fundsType,
  setSelectedType,
  selectedType,
}) {
  const [theadY, setTheadY] = useState(0)
  const [stickyThead, setStickyThead] = useState(false)
  const [isModalOpen, toggleModal] = useState(false)
  const fundDetails = useSelector(state => state.investmentDetails.data)

  useLayoutEffect(() => {
    setTheadY(
      window.scrollY + document.querySelector('table').getBoundingClientRect().y
    )
  }, [setTheadY])

  useLayoutEffect(() => {
    const getScrollY = () => window.scrollY - 170
    const shouldSticky = scrollY => {
      const { offsetHeight } = document.querySelector('thead')
      const hasMinimumRows = data.length > 2
      const isTheadInvisible = theadY - 30 - offsetHeight < scrollY
      return hasMinimumRows && isTheadInvisible
    }

    const handleScroll = () => setStickyThead(shouldSticky(getScrollY()))

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [theadY, data])

  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
  } = useTable({
    columns: formatColumns(columnsProps, toggleModal, isModalOpen),
    data,
  })

  function handleClose(isOpen) {
    return toggleModal(!isOpen)
  }
  return (
    <>
      <Modal
        headerIcon="information"
        handleClose={handleClose}
        isOpen={isModalOpen}
        modalTitle="Informações do fundo"
        alignItems="flex-start"
      >
        <FundsInfo fund={fundDetails} />
      </Modal>
      <TabsWrapper>
        {fundsType.map(fundType => (
          <Tabs
            key={fundType.value}
            onClick={() => setSelectedType(fundType.value)}
            className={selectedType === fundType.value && 'active'}
          >
            {fundType.name}
          </Tabs>
        ))}
      </TabsWrapper>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Thead className={stickyThead && `sticky`}>
            <TheadTr>
              {columns.map(header => (
                <TheadWrapper
                  key={`header-with-column-${header.Header}`}
                  header={header}
                />
              ))}
            </TheadTr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              return (
                <TbodyTr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TBodyTd
                      borderRisk={cell.row.original.perfil_risco_ordem}
                      width={cell.column.width}
                      {...cell.getCellProps()}
                    >
                      <WrapperContent>{cell.render('Cell')}</WrapperContent>
                    </TBodyTd>
                  ))}
                </TbodyTr>
              )
            })}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fundsType: PropTypes.array.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
}

TheadWrapper.propTypes = {
  header: PropTypes.shape({
    getHeaderProps: PropTypes.func,
  }).isRequired,
}

HeaderWithColumns.propTypes = {
  header: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    Header: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
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

SimpleHeader.propTypes = {
  header: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    render: PropTypes.func.isRequired,
  }).isRequired,
}
