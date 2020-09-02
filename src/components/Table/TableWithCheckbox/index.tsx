import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
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

    useEffect(() => {
      if (resolvedRef?.current?.indeterminate) {
        resolvedRef.current.indeterminate = indeterminate
      }
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox
          ref={resolvedRef}
          {...rest}
          css={`
            z-index: 1;
          `}
        />
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

    return `calc(${percentageValue}% + ${pixelValue}px)`
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
