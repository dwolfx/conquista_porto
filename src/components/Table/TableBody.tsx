import React from 'react'
import 'styled-components/macro'

import Button from 'components/Button'
import Loading from 'components/Loading'
import Text from 'components/Text'

import { ITableBody } from './types'
import * as s from './styles'

const TableBody = ({
  isLoading,
  hasError,
  errorMessage,
  emptyMessage = 'No momento não possuímos nenhum fundo de investimento em nossa plataforma.',
  loadingMessage = 'Aguarde enquanto buscamos informações de fundos de investimentos...',
  rows,
  prepareRow,
  onError,
  onRowClick,
  isFiltering,
  filteringEmptyMessage = 'Nenhum fundo de investimento encontrado com os filtros selecionados.',
  hasPagination,
  page,
}: ITableBody) => {
  const rowOrPage = hasPagination ? page : rows
  if (isLoading) {
    return (
      <s.InfoTableContent>
        <div>
          <Loading type="bar" legend={loadingMessage} textAlign="center" />
        </div>
      </s.InfoTableContent>
    )
  }

  if (hasError) {
    return (
      <s.InfoTableContent>
        <div>
          <Text
            type="headline"
            color="magenta2"
            textAlign="center"
            css={`
              margin-bottom: 14px;
            `}
          >
            {errorMessage}
          </Text>
          {onError ? <Button onClick={onError}>Tentar novamente</Button> : null}
        </div>
      </s.InfoTableContent>
    )
  }

  if (!rowOrPage || (rowOrPage.length === 0 && !isLoading)) {
    return (
      <s.InfoTableContent>
        <div>
          <Text type="headline" color="gray5">
            {isFiltering ? filteringEmptyMessage : emptyMessage}
          </Text>
        </div>
      </s.InfoTableContent>
    )
  }

  return (
    <>
      {rowOrPage.map((row: any) => {
        prepareRow(row)

        return (
          <s.TbodyTr
            {...row.getRowProps()}
            onClick={() => (onRowClick ? onRowClick(row.original) : null)}
            hasClickOnRow={!!onRowClick}
            // onClick={event => onRowClick({ event, row: row.original })}
          >
            {row.cells.map((cell: any) => {
              const styles = cell.column.styles || cell.column

              return (
                <s.TbodyTd
                  width={styles.width}
                  minWidth={styles.minWidth}
                  align={cell.column.align}
                  isSticky={!!cell.column.sticky}
                  inheritMarginFirstCell={styles.inheritMarginFirstCell}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </s.TbodyTd>
              )
            })}
          </s.TbodyTr>
        )
      })}
    </>
  )
}

export default TableBody
