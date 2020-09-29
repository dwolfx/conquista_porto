import React from 'react'

import Text from 'components/Text'

import { IColumn, ICell } from './types'
import { WrapperContent } from './styles'

const FormatDefault = ({ cell }: { cell: ICell }) => (
  <WrapperContent>
    <Text color="gray5" bold>
      {cell.value}
    </Text>
  </WrapperContent>
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
      const FormatedCell = ({ cell }: any) =>
        column.format(cell.row.original, onRowClick)

      return {
        ...column,
        Cell: FormatedCell,
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
