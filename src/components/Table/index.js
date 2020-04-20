import React, { useMemo } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import PropTypes from 'prop-types'
import 'styled-components/macro'

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
  ButtonGroup,
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
      data-gtm-form="input"
      data-gtm-name={`Filtrar ${Header}`}
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
}) => {
  const updatePages = currentPage => {
    const allPages = [...new Array(pageCount)].map((_, index) => index + 1)
    let currentPages = pageCount > 3 ? [1, 2, 3] : allPages

    if (currentPage > 2) {
      currentPages = allPages.slice(currentPage - 2, currentPage + 1)
    }
    return currentPages
  }

  const handleGoToPage = item => {
    gotoPage(item - 1)
  }

  return (
    <Tfoot>
      <tr>
        <TfootTd paddingLeft="10">
          Total {dataProp.length} | Página {pageIndex + 1} de {pageCount}
        </TfootTd>
        <TfootTd colSpan="2" textAlign="right">
          <ButtonGroup>
            <PaginationButton
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="paginacao"
              data-gtm-name="primeira"
              disabled={!canPreviousPage}
              onClick={() => gotoPage(0)}
            >
              <BackwardIcon width="7" />
              <BackwardIcon width="7" />
              &nbsp; Primeira
            </PaginationButton>
            <PaginationButton
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="paginacao"
              data-gtm-name="icone backward"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              <BackwardIcon />
            </PaginationButton>
            {updatePages(pageIndex + 1).map(item => (
              <PaginationButton
                key={`page-buttom-${item + 1}`}
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname="paginacao"
                data-gtm-name={pageIndex + 1}
                className={pageIndex === item - 1 ? 'active' : ''}
                onClick={() => handleGoToPage(item)}
              >
                {item}
              </PaginationButton>
            ))}
            <PaginationButton
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="paginacao"
              data-gtm-name="icone forward"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              <ForwardIcon />
            </PaginationButton>

            <PaginationButton
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="paginacao"
              data-gtm-name="ultima"
              disabled={!canNextPage}
              padding="0 10px"
              onClick={() => gotoPage(pageCount - 1)}
            >
              Última &nbsp;
              <ForwardIcon width="7" />
              <ForwardIcon width="7" />
            </PaginationButton>
          </ButtonGroup>
        </TfootTd>
      </tr>
    </Tfoot>
  )
}

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
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
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
  data: [],
}
