import React from 'react'

import { IColumn, ICell } from './types'
import { WrapperContent } from './styles'

const FormatDefault = ({ cell }: { cell: ICell }) => (
  <WrapperContent>{cell.value}</WrapperContent>
)

export default function FormatColumns(columns: IColumn[], onRowClick: any) {
  const formatters: any = {
    default: (column: IColumn) => ({
      ...column,
      Cell: FormatDefault,
    }),
  }

  return columns.map(column => {
    if (column.format) {
      return {
        ...column,
        Cell: (cell: ICell) => {
          return column.format(cell.row.original, onRowClick)
        },
        sortType(rowA: any, rowB: any) {
          if (column.sort) {
            return column.sort(rowA.original, rowB.original)
          }

          return rowA.original[column.accessor] > rowB.original[column.accessor]
            ? 1
            : -1
        },
      }
    }

    return formatters.default(column)
  })
}
