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
  const TbodyRender = () => {
    if (isLoading) {
      return (
        <s.InfoTableContent>
          <td>
            <Loading
              type="bar"
              legend="Aguarde enquanto buscamos informações de fundos de investimentos..."
            />
          </td>
        </s.InfoTableContent>
      )
    }
    if (isError) {
      return (
        <s.InfoTableContent>
          <td>
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
          </td>
        </s.InfoTableContent>
      )
    }

    if (!rows || rows.length === 0) {
      return (
        <s.InfoTableContent>
          <td>
            <Text type="headline" color="gray5">
              {isFiltering
                ? 'Nenhum fundo de investimento encontrado com os filtros selecionados.'
                : 'No momento não possuímos nenhum fundo de investimento em nossa plataforma.'}
            </Text>
          </td>
        </s.InfoTableContent>
      )
    }

    return rows.map((row: any) => {
      prepareRow(row)

      return (
        <s.TbodyTr
          {...row.getRowProps()}
          onClick={() => onRowClick(row.original)}
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
    })
  }

  return TbodyRender()
}

export default TableBody
