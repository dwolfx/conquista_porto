import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useTable, useSortBy } from 'react-table'
import { useSticky } from 'react-table-sticky'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Loading from 'components/Loading'
import Button from 'components/Button'
import Text from 'components/Text'

import { GetInvestmentListRequest } from 'store/modules/Investment/action'
import { useDispatch } from 'react-redux'
import FormatColumns from './formatters'
import TableBody from './TableBody'

import {
  Table,
  Thead,
  TheadTr,
  TheadTh,
  Tbody,
  TheadContent,
  TableWrapper,
  TheadText,
  StickyDivisor,
  InfoTableContent,
  InfoTableContainer,
  ErrorText,
} from './styles'

const SimpleHeader = ({ header }) => {
  const headerContent = header.render('Header')
  const styles = header.styles
    ? header.styles.header || header.styles
    : header.width
  return (
    <TheadTh
      width={styles.width}
      minWidth={styles.minWidth}
      canSort={header.canSort}
      data-testid={header.dataTestId}
      {...header.getHeaderProps(header.getSortByToggleProps())}
    >
      <TheadContent
        justifyHeader={header.justifyHeader}
        data-gtm-type="click"
        data-gtm-clicktype="menu"
        data-gtm-subname="menu de ordenação dos fundos"
        data-gtm-name={headerContent}
        lineHeight="16px"
      >
        {headerContent && (
          <TheadText
            showSortArrows={header.canSort}
            isSorted={header.isSorted}
            isSortedDesc={header.isSortedDesc}
            top="28px"
            right="5px"
          >
            {headerContent}
          </TheadText>
        )}
      </TheadContent>
    </TheadTh>
  )
}

export default function TableFunds({
  data,
  isLoading,
  isError,
  isFiltering,
  onChangeIsFundDetailOpen,
  isTablet,
  handleLayerOpen,
  setIsOpenForInvestments,
  columns: columnsProps,
  clickedFundInvestButton,
  filteredFundListEmpty,
}) {
  const {
    getTableProps,
    columns,
    getTableBodyProps,
    prepareRow,
    rows,
  } = useTable(
    {
      // to edit how each column should render see FormatColumns function
      columns: useMemo(
        () =>
          FormatColumns(columnsProps, handleLayerOpen, clickedFundInvestButton),
        [columnsProps, handleLayerOpen, clickedFundInvestButton]
      ),
      data,
      disableSortBy: isTablet,
    },
    useSortBy,
    useSticky
  )
  const tableRef = useRef()
  const dispatch = useDispatch()
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)

  // Monitorar o evento de scroll da tabela
  useEffect(() => {
    if (tableRef) {
      tableRef.current.onscroll = ({ srcElement }) => {
        const { scrollLeft, clientWidth, scrollWidth } = srcElement
        // Cálculo da posição do scroll horizontal para um float entre 0 e 1
        const pos = scrollLeft / (scrollWidth - clientWidth)
        // Condicionalmente adicionando a sombra da coluna
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

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <InfoTableContainer>
          <InfoTableContent>
            <Loading
              type="bar"
              legend="Buscando informações dos fundos de investimentos…"
              data-testid="funds-loading"
            />
          </InfoTableContent>
        </InfoTableContainer>
      )
    }

    if (isError) {
      return (
        <InfoTableContainer>
          <InfoTableContent>
            <ErrorText>
              Não foi possível carregar a lista de fundos. Por favor, tente
              novamente.
            </ErrorText>
            <Button onClick={() => dispatch(GetInvestmentListRequest())}>
              Tentar novamente
            </Button>
          </InfoTableContent>
        </InfoTableContainer>
      )
    }

    if (filteredFundListEmpty) {
      return (
        <InfoTableContainer>
          <InfoTableContent>
            <Text type="headline" color="gray5">
              No momento, não temos fundos com essas especificações.
            </Text>
          </InfoTableContent>
        </InfoTableContainer>
      )
    }

    if (!data || data.length === 0) {
      return (
        <InfoTableContainer>
          <InfoTableContent>
            <Text type="headline" color="gray5">
              No momento não possuímos nenhum fundo de investimento em nossa
              plataforma.
            </Text>
          </InfoTableContent>
        </InfoTableContainer>
      )
    }

    return (
      <>
        <Thead className="header">
          <TheadTr>
            {columns.map(header => (
              <SimpleHeader
                header={header}
                key={`header-${header.Header}`}
                canSort={false}
              />
            ))}
          </TheadTr>
        </Thead>
        <Tbody {...getTableBodyProps()} className="body">
          <TableBody
            onChangeIsFundDetailOpen={onChangeIsFundDetailOpen}
            setIsOpenForInvestments={setIsOpenForInvestments}
            rows={rows}
            isTablet={isTablet}
            isLoading={isLoading}
            prepareRow={prepareRow}
            isError={isError}
            isFiltering={isFiltering}
          />
        </Tbody>
      </>
    )
  }
  return (
    <>
      <TableWrapper>
        {isTablet && stickyElementLeft.length && showLeftShadow && (
          <StickyDivisor position={stickyElementLeftPosition} side="left" />
        )}
        {isTablet && stickyElementRight.length && showRightShadow && (
          <StickyDivisor position={stickyElementRightPosition} side="right" />
        )}
        <Table
          ref={tableRef}
          {...getTableProps()}
          className={`table ${isTablet ? 'sticky' : ''}`}
        >
          {renderTableContent()}
        </Table>
      </TableWrapper>
    </>
  )
}

TableFunds.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool,
  isTablet: PropTypes.bool.isRequired,
  handleLayerOpen: PropTypes.func.isRequired,
  onChangeIsFundDetailOpen: PropTypes.func.isRequired,
  setIsOpenForInvestments: PropTypes.func.isRequired,
  fundsType: PropTypes.array.isRequired,
  clickedFundInvestButton: PropTypes.string,
  filteredFundListEmpty: PropTypes.bool.isRequired,
}

TableFunds.defaultProps = {
  isFiltering: false,
  clickedFundInvestButton: '',
}

SimpleHeader.propTypes = {
  header: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    widthHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataTestId: PropTypes.string,
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
