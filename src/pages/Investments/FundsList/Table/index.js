import React, { useState, useLayoutEffect } from 'react'
import { useTable } from 'react-table'
import PropTypes from 'prop-types'
import {
  Table,
  Thead,
  TheadTr,
  TheadTh,
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

const HeaderWithColumns = ({ header }) => {
  const isLastItem = x => header.columns.length - 1 === x
  return (
    <>
      {header.columns.map((headerColumn, idx) => (
        <TheadTh
          width={headerColumn.width}
          hasBefore={isLastItem(idx)}
          beforeContent={header.Header}
          beforeWidth={header.width}
          key={`inner-header-${headerColumn.Header}`}
        >
          <WrapperContent lineHeight="16px">
            {headerColumn.render('Header')}
          </WrapperContent>
        </TheadTh>
      ))}
    </>
  )
}

const TheadWrapper = ({ header }) => {
  const hasColumns = () => 'columns' in header
  return hasColumns() ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader {...header.getHeaderProps()} header={header} />
  )
}
const FormatFundoCell = ({ cell }) => (
  <FundoWrapper {...cell.getCellProps()}>
    <LogoImg alt="logo" src={cell.value.img} />
    <FundoNameWrapper>{cell.value.name}</FundoNameWrapper>
    <AlertIcon />
  </FundoWrapper>
)

const FormatEnabledCell = column =>
  column.cell.value ? (
    <InvestButton type="button" color="secondary">
      Investir
    </InvestButton>
  ) : (
    <LockIcon />
  )

const formatColumns = columns => {
  const formatters = {
    fundo: column => ({ ...column, Cell: FormatFundoCell }),
    enabled: column => ({ ...column, Cell: FormatEnabledCell }),
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

  useLayoutEffect(() => {
    setTheadY(
      window.scrollY + document.querySelector('table').getBoundingClientRect().y
    )
  }, [setTheadY])

  useLayoutEffect(() => {
    const getScrollY = () => window.scrollY
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
    columns: formatColumns(columnsProps),
    data,
  })

  return (
    <>
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
                      borderRisk={cell.value.risco}
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
    value: PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

SimpleHeader.propTypes = {
  header: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    render: PropTypes.func.isRequired,
  }).isRequired,
}
