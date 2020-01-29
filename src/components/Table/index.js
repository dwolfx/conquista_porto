import React, { useMemo } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import PropTypes from 'prop-types'

import {
  TheadTr,
  TheadTh,
  Table,
  TbodyTr,
  TbodyTd,
  InputFilter,
  InputFilterWrapper,
  Tfoot,
  TfootTd,
  PaginationButton,
  ForwardIcon,
  BackwardIcon,
} from './styles'

const filterText = (rows, id, filterValue) =>
  rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue !== undefined
      ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
      : true
  })

const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header },
}) => (
  <InputFilterWrapper>
    <InputFilter
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Filtrar ${Header}`}
    />
  </InputFilterWrapper>
)

const TfootWrapper = ({
  pageIndex,
  dataProp,
  canNextPage,
  canPreviousPage,
  pageCount,
  nextPage,
  gotoPage,
  previousPage,
}) => (
  <Tfoot>
    <tr>
      <TfootTd paddingLeft="10">
        Total {dataProp.length} | Página {pageIndex + 1} de {pageCount}
      </TfootTd>
      <TfootTd colSpan="3" textAlign="right">
        <PaginationButton
          marginRight="70"
          padding="0 10px"
          visibility={canPreviousPage ? 'visible' : 'hidden'}
          onClick={() => gotoPage(0)}
        >
          <BackwardIcon width="7" />
          <BackwardIcon width="7" />
          &nbsp; Primeira
        </PaginationButton>
        {canPreviousPage && (
          <>
            <PaginationButton onClick={() => previousPage()}>
              <BackwardIcon />
            </PaginationButton>

            <PaginationButton onClick={() => gotoPage(pageIndex - 1)}>
              {pageIndex}
            </PaginationButton>
          </>
        )}
        <PaginationButton className="active">{pageIndex + 1}</PaginationButton>
        {canNextPage && (
          <>
            <PaginationButton onClick={() => nextPage()}>
              {pageIndex + 2}
            </PaginationButton>
            <PaginationButton onClick={() => nextPage()}>
              <ForwardIcon />
            </PaginationButton>
          </>
        )}
        <PaginationButton
          marginLeft="180"
          marginRight="10"
          padding="0 10px"
          visibility={canNextPage ? 'visible' : 'hidden'}
          onClick={() => gotoPage(pageCount - 1)}
        >
          Última &nbsp;
          <ForwardIcon width="7" />
          <ForwardIcon width="7" />
        </PaginationButton>
      </TfootTd>
    </tr>
  </Tfoot>
)

export default function TableRender({ columns, data, showFilter }) {
  const filterTypes = useMemo(
    () => ({
      text: filterText,
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    flatColumns,
    page,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageCount,
    pageIndex = 0,
    nextPage,
    previousPage,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      state: {
        pageSize: 5,
      },
    },
    useFilters,
    usePagination
  )

  return (
    <Table {...getTableProps()}>
      <thead>
        <TheadTr>
          {flatColumns.map(column => (
            <TheadTh hasFilter={showFilter} {...column.getHeaderProps()}>
              {column.render('Header')}
              <div>
                {column.canFilter && showFilter
                  ? column.render('Filter')
                  : null}
              </div>
            </TheadTh>
          ))}
        </TheadTr>
      </thead>
      {page.length ? (
        <>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <TbodyTr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TbodyTd {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TbodyTd>
                  ))}
                </TbodyTr>
              )
            })}
          </tbody>
          <TfootWrapper
            pageIndex={pageIndex}
            dataProp={data}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageCount={pageCount}
            nextPage={nextPage}
            gotoPage={gotoPage}
            previousPage={previousPage}
          />
        </>
      ) : (
        <tbody>
          <TbodyTr>
            <TbodyTd colSpan={flatColumns.length}>
              Nenhum item disponível.
            </TbodyTd>
          </TbodyTr>
        </tbody>
      )}
    </Table>
  )
}

DefaultColumnFilter.propTypes = {
  column: PropTypes.object,
}

DefaultColumnFilter.defaultProps = {
  column: {},
}

TfootWrapper.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  dataProp: PropTypes.array.isRequired,
  canNextPage: PropTypes.bool,
  canPreviousPage: PropTypes.bool,
  pageCount: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
}

TfootWrapper.defaultProps = {
  canNextPage: false,
  canPreviousPage: false,
}

TableRender.propTypes = {
  showFilter: PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.array,
}

TableRender.defaultProps = {
  showFilter: true,
  columns: [],
  data: () => {},
}
