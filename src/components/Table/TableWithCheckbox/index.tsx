import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import { useSticky } from 'react-table-sticky'
import 'styled-components/macro'

import Checkbox from 'components/Inputs/Checkbox'

import FormatColumns from '../formatters'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import { ITable } from '../types'
import * as s from '../styles'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 */

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, any>(
  ({ indeterminate, ...rest }, ref) => {
    const resolvedRef = (ref || useRef()) as React.RefObject<HTMLInputElement>

    React.useEffect(() => {
      if (resolvedRef?.current?.indeterminate) {
        resolvedRef.current.indeterminate = indeterminate
      }
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

interface IProps {
  onSelect: (rows: any) => void
  showSelectAll?: boolean
}

const Table = ({
  columns: columnsProps,
  data,
  hasError = false,
  errorMessage = 'Não foi possível carregar suas informações da tabela.',
  isFiltering = false,
  isLoading = false,
  isSticky = false,
  onRowClick,
  onSelect,
  showSelectAll = true,
  ...rest
}: ITable & IProps) => {
  const {
    getTableProps,
    headers,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
    selectedFlatRows,
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(() => FormatColumns(columnsProps, onRowClick), [
        columnsProps,
        onRowClick,
      ]),
      data,
    },
    useSortBy,
    useSticky,
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
          Cell: ({ row }: any) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
          width: 17,
          inheritMarginFirstCell: true,
        },
        ...cols,
      ])
    }
  )

  const tableRef = useRef() as React.RefObject<HTMLDivElement>
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(true)

  useEffect(() => {
    if (tableRef?.current?.onscroll) {
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

  useEffect(() => {
    const selected = [...selectedFlatRows].map(row => row?.original)
    onSelect(selected)
  }, [selectedFlatRows, onSelect])

  const calculateStickWidth = (acc: string, cur: any) => {
    let pixelValue = acc.split('+')[1].replace(/\D/g, '')
    let percentageValue = acc.split('+')[0].replace(/\D/g, '')

    if (typeof cur.styles.width === 'string') {
      if (cur.styles.width.indexOf('%')) {
        percentageValue += +cur.styles.width.replace('%', '')
      } else {
        pixelValue += +cur.styles.width.replace('px', '')
      }
    } else {
      pixelValue += cur.styles.width
    }

    return `calc(${percentageValue}% + ${pixelValue}px)`
  }

  const stickyElementRight = columns
    .filter((column: any) => column.sticky === 'right')
    .reduce((acc, cur) => calculateStickWidth(acc, cur), 'calc(0% + 7px)')
  const stickyElementLeft = columns
    .filter((column: any) => column.sticky === 'left')
    .reduce((acc, cur) => calculateStickWidth(acc, cur), 'calc(0% + 0px)')

  return (
    <>
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
              errorMessage={errorMessage}
              isFiltering={isFiltering}
              onRowClick={onRowClick}
            />
          </s.Tbody>
        </s.Table>
      </s.TableWrapper>
    </>
  )
}

export default Table
