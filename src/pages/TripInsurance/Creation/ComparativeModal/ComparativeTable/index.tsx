import React, { useMemo } from 'react'

import Table from 'components/Table'

import { columns } from './tableStructure'
import * as t from './types'

export default function FundsTable({ rowData, columnTitles }: t.IProps) {
  const columnsToRender = useMemo(() => columns(columnTitles), [columnTitles])

  return <Table columns={columnsToRender} data={rowData} isSticky disableSort />
}
