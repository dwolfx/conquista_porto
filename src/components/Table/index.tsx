import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { useSticky } from 'react-table-sticky'
import 'styled-components/macro'

import formatColumns from './formatColumns'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import { ITable } from './types'
import * as s from './styles'
import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 * @author: André Tanaka <andre.tanaka@sciensa.com>
 * @author: Matheus Lopes <matheus.lopes@sciensa.com>
 */

const Table = ({
  columns: columnsProps,
  data,
  hasError = false,
  errorMessage = 'Não foi possível carregar suas informações da tabela.',
  emptyMessage,
  loadingMessage,
  isFiltering = false,
  filteringEmptyMessage,
  isLoading = false,
  isSticky = false,
  hasPagination = false,
  disableSort = false,
  onRowClick,
  customRef,
  onError = () => {},
  ...rest
}: ITable) => {
  const formatColumnsMemo = useMemo(
    () => formatColumns(columnsProps, onRowClick),
    [columnsProps, onRowClick]
  )

  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    state: { pageIndex },
    rows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
    page,
  } = useTable.apply(
    undefined,
    disableSort
      ? [
          {
            // to edit how each column should render see formatColumns function
            columns: formatColumnsMemo,
            data,
            defaultCanSort: false,
            disableMultiSort: false,
          },
          useSticky,
          usePagination,
        ]
      : [
          {
            // to edit how each column should render see formatColumns function
            columns: formatColumnsMemo,
            data,
            defaultCanSort: false,
            disableMultiSort: false,
          },
          useSticky,
          usePagination,
          useSortBy,
        ]
  )

  const ref = useRef() as React.RefObject<HTMLDivElement>
  const tableRef = customRef || ref
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(true)
  const [indexPage, setIndexPage] = useState(pageIndex + 1)
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<
    HTMLInputElement
  >

  useEffect(() => {
    gotoPage(0)
    setIndexPage(1)
    if (inputRef?.current?.value) {
      inputRef.current.value = '1'
    }
  }, [inputRef, data, gotoPage, setIndexPage])

  useEffect(() => {
    if (tableRef?.current) {
      tableRef.current.onscroll = ({ srcElement }: any) => {
        const { scrollLeft, clientWidth, scrollWidth } = srcElement
        const posX = scrollLeft / (scrollWidth - clientWidth)

        if (posX === 0) {
          setShowRightShadow(true)
          setShowLeftShadow(false)
        } else if (posX > 0 && posX < 1) {
          setShowRightShadow(true)
          setShowLeftShadow(true)
        } else {
          setShowRightShadow(false)
          setShowLeftShadow(true)
        }
      }
    }
  }, [tableRef])

  const calculateStickWidth = (acc: string, cur: any) => {
    let pixelValue = acc.split('+')[1].replace(/\D/g, '')
    let percentageValue = acc.split('+')[0].replace(/\D/g, '')

    if (typeof cur.styles.width === 'string') {
      if (cur.styles.width.indexOf('%') > -1) {
        percentageValue += +cur.styles.width.replace('%', '')
      } else {
        pixelValue += +cur.styles.width.replace('px', '')
      }
    } else {
      pixelValue += cur.styles.width
    }

    return `calc(${percentageValue}% + ${pixelValue}px)`
  }

  const hasStickyElementRight = columns.filter(
    (column: any) => column.sticky === 'right'
  )

  const hasStickyElementLeft = columns.filter(
    (column: any) => column.sticky === 'left'
  )

  const stickyElementRight =
    hasStickyElementRight.length > 0 &&
    hasStickyElementRight.reduce(
      (acc, cur) => calculateStickWidth(acc, cur),
      'calc(0% + 7px)'
    )

  const stickyElementLeft =
    hasStickyElementLeft.length > 0 &&
    hasStickyElementLeft.reduce(
      (acc, cur) => calculateStickWidth(acc, cur),
      'calc(0% + 0px)'
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
              {columns.map(header => (
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
              page={page}
              isLoading={isLoading}
              prepareRow={prepareRow}
              hasError={hasError}
              errorMessage={errorMessage}
              loadingMessage={loadingMessage}
              emptyMessage={emptyMessage}
              isFiltering={isFiltering}
              filteringEmptyMessage={filteringEmptyMessage}
              onRowClick={onRowClick}
              hasPagination={hasPagination}
              onError={onError}
            />
          </s.Tbody>
        </s.Table>
      </s.TableWrapper>
      {hasPagination &&
      <s.PaginationWrapper>
        <s.Pagination>
          <Text type="body" bold color="gray5">Página</Text>
            <s.Input
              ref={inputRef}
              type="text"
              defaultValue={pageIndex + 1}
              onFocus={() => inputRef.current.value = ''}
              onBlur={() => inputRef.current.value = (pageIndex + 1).toString()}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                if (page < 0 || page === 0) {
                  gotoPage(0)
                  setIndexPage(1)
                  inputRef.current.value = ''
                } else if(page > pageCount -1) {
                  gotoPage(pageCount -1)
                  setIndexPage(pageCount -1)
                  inputRef.current.value = (pageCount - 1).toString()
                } else {
                  setIndexPage(page)
                  gotoPage(page)
                }
              }}
            />
          <Text type="body" bold color="gray5">de {hasError ? 0 : pageCount}</Text>
          <s.PageButtons>
            <s.Button onClick={() => {
              previousPage()
              setIndexPage(indexPage - 1)
              inputRef.current.value = (indexPage - 1).toString()
            }} disabled={!canPreviousPage}>
              <IconExporter name="arrowleft" color="blue4" />
            </s.Button>
            <s.Button onClick={() => {
              nextPage()
              setIndexPage(indexPage + 1)
              inputRef.current.value = (indexPage + 1).toString()
            }} disabled={!canNextPage}>
              <IconExporter name="arrowright" color="blue4"/>
            </s.Button>
          </s.PageButtons>
        </s.Pagination>
      </s.PaginationWrapper>
      }
    </s.Wrapper>
  )
}

export default Table
