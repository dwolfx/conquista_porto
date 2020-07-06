import React from 'react'
import 'styled-components/macro'

import Button from 'components/Button'
import Loading from 'components/Loading'
import Text from 'components/Text'

import { ITableBody } from './types'
import * as s from './styles'

const TableBody = ({
  isLoading,
  isError,
  rows,
  prepareRow,
  onError,
  onRowClick,
  isFiltering,
}: ITableBody) => {
  if (isLoading) {
    return (
      <s.InfoTableContent>
        <div>
          <Loading
            type="bar"
            legend="Aguarde enquanto buscamos informações de fundos de investimentos..."
          />
        </div>
      </s.InfoTableContent>
    )
  }

  if (isError) {
    return (
      <s.InfoTableContent>
        <div>
          <Text
            type="headline"
            color="magenta2"
            css={`
              margin-bottom: 14px;
            `}
          >
            Não foi possível carregar suas informações de fundos de
            investimentos.
          </Text>
          <Button onClick={onError}>Tentar novamente</Button>
        </div>
      </s.InfoTableContent>
    )
  }

  if (!rows || rows.length === 0) {
    return (
      <s.InfoTableContent>
        <div>
          <Text type="headline" color="gray5">
            {isFiltering
              ? 'Nenhum fundo de investimento encontrado com os filtros selecionados.'
              : 'No momento não possuímos nenhum fundo de investimento em nossa plataforma.'}
          </Text>
        </div>
      </s.InfoTableContent>
    )
  }

  return (
    <>
      {rows.map((row: any) => {
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
