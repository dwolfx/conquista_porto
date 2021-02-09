import React from 'react'

import { TColumns } from 'components/Table/types'

import { ITableTitles } from './types'

import * as s from './styles'

export const columns = (columnTitles: ITableTitles[]): TColumns[] => {
  const columnsTemplate: TColumns[] = [
    {
      accessor: 'coverage',
      Header: 'COBERTURAS',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      sticky: 'left',
      styles: {
        minWidth: '250px',
        width: '250px',
        header: {
          width: '222px',
          minWidth: '222px',
        },
        marginLeftCell: 1,
      },
      format: (row: any) => (
        <s.FirstColumnCellWrapper>
          <s.FirstColumnCellText color="gray5" bold>
            {row[0]}
          </s.FirstColumnCellText>
        </s.FirstColumnCellWrapper>
      ),
    },
  ]

  columnTitles.map((column, index) =>
    columnsTemplate.push({
      accessor: `plan-${column.planId}`,
      Header: column.planName,
      align: 'center',
      justifyHeader: 'center',
      styles: {
        minWidth: '236px',
        width: '236px',
        header: {
          width: '222px',
          minWidth: '222px',
        },
        marginLeftCell: 1,
      },
      format: row => (
        <s.CellWrapper>
          <s.CellText color="gray5" bold>
            {row[index + 1]}
          </s.CellText>
        </s.CellWrapper>
      ),
    })
  )

  return columnsTemplate
}
