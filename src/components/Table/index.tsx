import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy } from 'react-table'
import { useSticky } from 'react-table-sticky'
import 'styled-components/macro'

import Icon from 'components/IconExporter'

import FormatColumns from './formatters'
import TableBody from './TableBody'
import { ITable } from './types'
import * as s from './styles'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 */

const SimpleHeader = ({ header }: any) => {
  const headerContent = header.render('Header')
  const styles = header.styles ? header.styles.header || header.styles : header

  return (
    <s.TheadTh
      width={styles.width}
      minWidth={styles.minWidth}
      canSort={header.canSort}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <s.TheadContent
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
      >
        {headerContent && (
          <>
            <s.TheadText type="subheading" color="gray6" bold>
              {headerContent}
            </s.TheadText>
            <s.IconContainer
              isSorted={header.isSorted}
              isSortedDesc={header.isSortedDesc}
            >
              <Icon name="arrowsortable" color="gray4" />
            </s.IconContainer>
          </>
        )}
      </s.TheadContent>
    </s.TheadTh>
  )
}

const HeaderWithColumns = ({ header }: any) => (
  <s.TheadThWithColumns width={header.width}>
    {header.Header}
    <s.TheadContent>
      {header.columns.map((headerColumn: any) => (
        <s.TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <s.TheadText>{headerColumn.render('Header')}</s.TheadText>
        </s.TheadColumn>
      ))}
    </s.TheadContent>
  </s.TheadThWithColumns>
)

const TheadWrapper = ({ header }: any) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

const Table = ({
  columns: columnsProps,
  data,
  isError = false,
  isFiltering = false,
  isLoading = false,
  isSticky = false,
  onRowClick,
  ...rest
}: ITable) => {
  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
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
    useSticky
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
              {columns.map(header => (
                <TheadWrapper
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
              isError={isError}
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
