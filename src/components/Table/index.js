import React, { useMemo } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'

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

export default function TableRender({ columns: columnsProp, data: dataProp }) {
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
    pageIndex,
    nextPage,
    previousPage,
    gotoPage,
  } = useTable(
    {
      columns: columnsProp,
      data: dataProp,
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
            <TheadTh {...column.getHeaderProps()}>
              {column.render('Header')}
              <div>{column.canFilter ? column.render('Filter') : null}</div>
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
            dataProp={dataProp}
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
