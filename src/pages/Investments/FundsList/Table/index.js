import React, { useState, useLayoutEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTable, useSortBy } from 'react-table'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Modal from 'components/Modal/ModalNew'
import FundsInfo from 'components/Solutions/Investments/FundsInfo'
import Loading from 'components/Loading'

import FormatColumns from './formatters'
import Tabs from './Tabs'

import {
  Table,
  Thead,
  TheadTr,
  TheadTh,
  TheadThWithColumns,
  TheadColumn,
  Tbody,
  TbodyTr,
  TbodyTd,
  WrapperContent,
  TableWrapper,
  TheadText,
} from './styles'

const SimpleHeader = ({ header }) => {
  const headerContent = header.render('Header')
  return (
    <TheadTh
      width={header.width}
      canSort={header.canSort}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <WrapperContent
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
        lineHeight="16px"
        isThead
      >
        {headerContent && (
          <TheadText
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerContent}
          </TheadText>
        )}
      </WrapperContent>
    </TheadTh>
  )
}

const HeaderWithColumns = ({ header }) => (
  <TheadThWithColumns width={header.width}>
    {header.Header}
    <WrapperContent>
      {header.columns.map(headerColumn => (
        <TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <TheadText
            isSorted={headerColumn.isSorted}
            isSortedDesc={headerColumn.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerColumn.render('Header')}
          </TheadText>
        </TheadColumn>
      ))}
    </WrapperContent>
  </TheadThWithColumns>
)

const TheadWrapper = ({ header }) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

export default function TableFunds({
  data,
  columns: columnsProps,
  fundsType,
  setSelectedType,
  selectedType,
  idGoal,
}) {
  const [theadY, setTheadY] = useState(0)
  const [stickyThead, setStickyThead] = useState(false)
  const [isModalOpen, toggleModal] = useState(false)
  const { data: fundDetails, isLoading } = useSelector(
    state => state.investmentDetails
  )
  const tableWrapperRef = useRef(null)
  const tableRef = useRef(null)
  const theadRef = useRef(null)

  useLayoutEffect(() => {
    setTheadY(window.scrollY + tableRef.current.getBoundingClientRect().y)
  }, [setTheadY])

  useLayoutEffect(() => {
    const getScrollY = () => window.scrollY
    const shouldSticky = scrollY => {
      const { current: table } = tableRef
      const { current: thead } = theadRef
      const hasMinimumRows = data.length > 3
      const isTheadInvisible = theadY - thead.offsetHeight < scrollY
      const isEndOfTable = table.offsetHeight + 140 < scrollY
      return hasMinimumRows && isTheadInvisible && !isEndOfTable
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
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(
        () => FormatColumns(columnsProps, toggleModal, isModalOpen, idGoal),
        [isModalOpen, columnsProps, idGoal]
      ),
      data,
    },
    useSortBy
  )

  const handleTabsChange = selectedValue => {
    setSelectedType(selectedValue)
    const { current } = tableWrapperRef
    current.scrollLeft = 0
  }

  return (
    <>
      <Modal
        headerIcon="information"
        handleClose={isOpen => toggleModal(!isOpen)}
        isOpen={isModalOpen}
        modalTitle="Informações do fundo"
        alignItems="flex-start"
        maxWidth="1200px"
      >
        <div
          css={`
            margin: 0 -28px;
          `}
        >
          {isLoading ? <Loading /> : <FundsInfo fund={fundDetails} />}
        </div>
      </Modal>
      <Tabs
        options={fundsType}
        onClick={handleTabsChange}
        selectedTab={selectedType}
      />
      <TableWrapper ref={tableWrapperRef}>
        <Table ref={tableRef} {...getTableProps()}>
          <Thead ref={theadRef} className={stickyThead && `sticky`}>
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
                    <TbodyTd
                      borderRisk={cell.row.original.perfil_risco_ordem}
                      width={cell.column.width}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TbodyTd>
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
  idGoal: PropTypes.number,
}

TableFunds.defaultProps = {
  idGoal: null,
}

TheadWrapper.propTypes = {
  header: PropTypes.object.isRequired,
}

HeaderWithColumns.propTypes = {
  header: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    Header: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
}

SimpleHeader.propTypes = {
  header: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    render: PropTypes.func.isRequired,
    isSorted: PropTypes.bool.isRequired,
    isSortedDesc: PropTypes.bool,
    getSortByToggleProps: PropTypes.func.isRequired,
    getHeaderProps: PropTypes.func.isRequired,
    canSort: PropTypes.bool.isRequired,
  }).isRequired,
}
