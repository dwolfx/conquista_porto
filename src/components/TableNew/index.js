import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, useSortBy } from 'react-table'
import { useSticky } from 'react-table-sticky'
import 'styled-components/macro'
import PropTypes from 'prop-types'

import FormatColumns from './formatters'
import TableBody from './TableBody'
// import { IHeaderWithColumns, ISimpleHeader, ITheadWrapper } from './types'
import * as s from './styles'

/**
 * @author: Rodrigo Condurú <rodrigo.conduru@sciensa.com>
 * @author: Hugo Cicarelli <hugo.cicarelli@sciensa.com>
 */

const SimpleHeader = ({ header }) => {
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
          <s.TheadText
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
          >
            {headerContent}
          </s.TheadText>
        )}
      </s.TheadContent>
    </s.TheadTh>
  )
}

const HeaderWithColumns = ({ header }) => (
  <s.TheadThWithColumns width={header.width}>
    {header.Header}
    <s.TheadContent>
      {header.columns.map(headerColumn => (
        <s.TheadColumn
          data-gtm-type="click"
          data-gtm-clicktype="menu"
          data-gtm-subname="menu de ordenação dos fundos"
          data-gtm-name={headerColumn.render('Header')}
          width={headerColumn.width}
          key={`inner-header-${headerColumn.Header}`}
          {...headerColumn.getHeaderProps(headerColumn.getSortByToggleProps())}
        >
          <s.TheadText
            isSorted={headerColumn.isSorted}
            isSortedDesc={headerColumn.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerColumn.render('Header')}
          </s.TheadText>
        </s.TheadColumn>
      ))}
    </s.TheadContent>
  </s.TheadThWithColumns>
)

const TheadWrapper = ({ header }) =>
  'columns' in header ? (
    <HeaderWithColumns header={header} />
  ) : (
    <SimpleHeader header={header} />
  )

const TableFunds = ({
  data,
  isLoading,
  isError,
  isFiltering = false,
  onShowDetails,
  columns: columnsProps,
  isSticky,
  ...rest
}) => {
  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(() => FormatColumns(columnsProps, onShowDetails), [
        columnsProps,
        onShowDetails,
      ]),
      data,
    },
    useSortBy,
    useSticky
  )

  const tableRef = useRef()
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(true)

  useEffect(() => {
    if (tableRef) {
      tableRef.current.onscroll = ({ srcElement }) => {
        const { scrollLeft, clientWidth, scrollWidth } = srcElement
        const pos = scrollLeft / (scrollWidth - clientWidth)
        if (pos === 0) {
          setShowRightShadow(true)
          setShowLeftShadow(false)
        } else if (pos > 0 && pos < 1) {
          setShowRightShadow(true)
          setShowLeftShadow(true)
        } else {
          setShowRightShadow(false)
          setShowLeftShadow(true)
        }
      }
    }
  }, [tableRef])

  const calculateStickWidth = (acc, cur) => {
    let curWidth = cur.styles.width

    if (typeof curWidth === 'string') {
      curWidth = cur.styles.width.replace('px', '')
    }

    return acc + curWidth
  }

  const stickyElementRight = columns.filter(column => column.sticky === 'right')
  const stickyElementRightPosition = stickyElementRight.reduce(
    (acc, cur) => calculateStickWidth(acc, cur),
    7
  )
  const stickyElementLeft = columns.filter(column => column.sticky === 'left')
  const stickyElementLeftPosition = stickyElementLeft.reduce(
    (acc, cur) => calculateStickWidth(acc, cur),
    0
  )

  return (
    <>
      <s.TableWrapper {...rest}>
        {isSticky && stickyElementLeftPosition > 0 && showLeftShadow && (
          <s.StickyDivisor position={stickyElementLeftPosition} side="left" />
        )}
        {isSticky && stickyElementRightPosition > 0 && showRightShadow && (
          <s.StickyDivisor position={stickyElementRightPosition} side="right" />
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
            />
          </s.Tbody>
        </s.Table>
      </s.TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isFiltering: PropTypes.bool,
  isSticky: PropTypes.bool,
  onShowDetails: PropTypes.func.isRequired,
  setIsOpenForInvestments: PropTypes.func,
  fundsType: PropTypes.array.isRequired,
}

TableFunds.defaultProps = {
  isLoading: false,
  isError: false,
  isFiltering: false,
  isSticky: false,
  setIsOpenForInvestments: () => null,
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
    widthHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    styles: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      header: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }),
    render: PropTypes.func.isRequired,
    isSorted: PropTypes.bool.isRequired,
    isSortedDesc: PropTypes.bool,
    getSortByToggleProps: PropTypes.func.isRequired,
    getHeaderProps: PropTypes.func.isRequired,
    canSort: PropTypes.bool.isRequired,
    justifyHeader: PropTypes.string,
    align: PropTypes.string,
  }).isRequired,
}

export default TableFunds
