import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react'
import { useTable, useSortBy, useRowSelect, usePagination } from 'react-table'
import { useSticky } from 'react-table-sticky'
import 'styled-components/macro'

import formatColumns from '../formatColumns'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import { ITable } from '../types'
import * as s from '../styles'
import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 */

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, any>(
  ({ indeterminate, ...rest }, ref) => {
    const resolvedRef = (ref || useRef()) as React.RefObject<HTMLInputElement>

    useEffect(() => {
      if (resolvedRef?.current?.indeterminate) {
        resolvedRef.current.indeterminate = indeterminate
      }
    }, [resolvedRef, indeterminate])

    return <s.Checkbox ref={resolvedRef} {...rest} />
  }
)

interface IProps {
  onSelect: (rows: any) => void
  showSelectAll?: boolean
}

const Table = ({
  columns: columnsProps,
  data,
  disableSort = false,
  hasError = false,
  errorMessage = 'Não foi possível carregar suas informações da tabela.',
  isFiltering = false,
  isLoading = false,
  isSticky = false,
  onRowClick,
  onSelect,
  showSelectAll = true,
  hasPagination = false,
  onError = () => {},
  ...rest
}: ITable & IProps) => {
  const CellWithCheckbox = useCallback(({ row }: any) => {
    const checked =
      row?.original?.checked || row.getToggleRowSelectedProps().checked
    const isDisabled = row?.original?.checked

    return (
      <div>
        <IndeterminateCheckbox
          {...row.getToggleRowSelectedProps()}
          checked={checked}
          disabled={isDisabled}
        />
      </div>
    )
  }, [])

  const {
    getTableProps,
    headers,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
  } = useTable(
    {
      // to edit how each column should render see formatColumns function
      columns: useMemo(() => formatColumns(columnsProps, onRowClick), [
        columnsProps,
        onRowClick,
      ]),
      data,
      initialState: { pageIndex: 0, pageSize: 12 },
      disableSortBy: disableSort,
    },
    useSortBy,
    usePagination,
    useSticky,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(cols => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: any) =>
            showSelectAll ? (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ) : null,
          Cell: CellWithCheckbox,
          width: 35,
          minWidth: 35,
          styles: {
            width: 35,
            minWidth: 35,
            header: {
              width: 7,
              minWidth: 7,
            },
          },
          inheritMarginFirstCell: true,
          sticky: 'left',
          canSort: false,
        },
        ...cols,
      ])
    }
  )

  const tableRef = useRef() as React.RefObject<HTMLDivElement>
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)
  const [indexPage, setIndexPage] = useState(pageIndex + 1)
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<
    HTMLInputElement
  >

  useEffect(() => {
    const hasLeftSticky = columns.filter((item: any) => item.sticky === 'left')
    const hasRightSticky = columns.filter(
      (item: any) => item.sticky === 'right'
    )

    if (hasLeftSticky.length && rows?.length) {
      setShowLeftShadow(true)
    }
    if (hasRightSticky.length && rows?.length) {
      setShowRightShadow(true)
    }
  }, [columns, rows])

  useEffect(() => {
    const selected = [...selectedFlatRows].map(row => row?.original)
    onSelect(selected)
  }, [selectedFlatRows, onSelect])

  const calculateStickWidth = (acc: string, cur: any) => {
    let pixelValue = +acc.split('+')[1].replace(/\D/g, '')
    let percentageValue = +acc.split('+')[0].replace(/\D/g, '')
    const widthToCalculate = cur?.styles?.width
    const minWidthToCalculate = cur?.styles?.minWidth

    if (typeof widthToCalculate === 'string') {
      if (widthToCalculate.indexOf('%')) {
        percentageValue +=
          +widthToCalculate?.replace('%', '') ||
          +minWidthToCalculate?.replace('%', '') ||
          0
      } else {
        pixelValue +=
          +widthToCalculate?.replace('px', '') ||
          minWidthToCalculate?.replace('px', '') ||
          0
      }
    } else {
      pixelValue += +widthToCalculate || +minWidthToCalculate || 0
    }

    return `calc(${percentageValue}% + ${pixelValue - 7}px)`
  }

  const stickyElementRight = useMemo(
    () =>
      columns
        .filter((column: any) => column.sticky === 'right')
        .reduce((acc, cur) => calculateStickWidth(acc, cur), 'calc(0% + 7px)'),
    [columns]
  )
  const stickyElementLeft = useMemo(
    () =>
      columns
        .filter((column: any) => column.sticky === 'left')
        .reduce((acc, cur) => calculateStickWidth(acc, cur), 'calc(0% + 42px)'),
    [columns]
  )

  return (
    <s.Wrapper>
      <s.TableWrapper {...rest}>
        {isSticky && !!stickyElementLeft && showLeftShadow && (
          <s.StickyDivisor position={stickyElementLeft} side="left" />
        )}
        {isSticky && !!stickyElementRight && showRightShadow && (
          <s.StickyDivisor position={stickyElementRight} side="right" />
        )}
        <s.Table
          ref={tableRef}
          className={`table ${isSticky ? 'sticky' : ''}`}
          {...getTableProps()}
        >
          <s.Thead className="header">
            <s.TheadTr>
              {headers.map(header => (
                <TableHeader
                  key={`header-with-column-${header.Header}`}
                  header={header}
                />
              ))}
            </s.TheadTr>
          </s.Thead>
          <s.Tbody {...getTableBodyProps()} className="body">
            <TableBody
              rows={rows}
              isLoading={isLoading}
              prepareRow={prepareRow}
              hasError={hasError}
              onError={onError}
              errorMessage={errorMessage}
              isFiltering={isFiltering}
              onRowClick={onRowClick}
              page={page}
              hasPagination={hasPagination}
            />
          </s.Tbody>
        </s.Table>
      </s.TableWrapper>
      {hasPagination && (
        <s.PaginationWrapper>
          <s.Pagination>
            <Text type="body" bold color="gray5">
              Página
            </Text>
            <s.Input
              ref={inputRef}
              type="text"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                if (page < 0 || page === 0) {
                  gotoPage(0)
                  setIndexPage(1)
                  inputRef.current.value = ''
                } else if (page > pageOptions.length - 1) {
                  gotoPage(pageOptions.length - 1)
                  setIndexPage(pageOptions.length)
                  inputRef.current.value = pageOptions.length.toString()
                } else {
                  setIndexPage(page)
                  gotoPage(page)
                }
              }}
            />
            <Text type="body" bold color="gray5">
              de {hasError ? 0 : pageOptions.length}
            </Text>
            <s.PageButtons>
              <s.Button
                onClick={() => {
                  previousPage()
                  setIndexPage(indexPage - 1)
                  inputRef.current.value = (indexPage - 1).toString()
                }}
                disabled={!canPreviousPage}
              >
                <IconExporter name="arrowleft" color="blue4" />
              </s.Button>
              <s.Button
                onClick={() => {
                  nextPage()
                  setIndexPage(indexPage + 1)
                  inputRef.current.value = (indexPage + 1).toString()
                }}
                disabled={!canNextPage}
              >
                <IconExporter name="arrowright" color="blue4" />
              </s.Button>
            </s.PageButtons>
          </s.Pagination>
        </s.PaginationWrapper>
      )}
    </s.Wrapper>
  )
}

export default Table
