import React, { useMemo } from 'react'

import Card from 'components/Card'
import Table from 'components/Table'

import { columns } from './tableStructure'
import * as t from './types'
import * as s from './styles'

export default function FundsTable({
  funds,
  icon,
  textInfo,
  title,
  ...rest
}: t.IProps) {
  const columnsToRender = useMemo(() => columns, [])

  return (
    <Card headerTitle={title} headerIcon={icon} {...rest}>
      <s.CardBody>
        {textInfo}
        <Table columns={columnsToRender} data={funds} />
      </s.CardBody>
    </Card>
  )
}
