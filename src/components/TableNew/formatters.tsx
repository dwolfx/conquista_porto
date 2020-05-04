import React from 'react'

import { IColumn, ICell } from './types'
import { WrapperContent } from './styles'

const FormatDefault = ({ cell }: { cell: ICell }) => (
  <WrapperContent>{cell.value}</WrapperContent>
)

export default function FormatColumns(columns: IColumn[], onShowDetails: any) {
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
          return column.format(cell.row.original, onShowDetails)
        },
      }
    }

    return formatters.default(column)
  })
}
