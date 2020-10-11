import React from 'react'

import Table from 'components/Table'

import * as s from './styles'

interface IProps {
  dataTable: any[]
}

const extractTable: React.FC<IProps> = ({ dataTable }) => {
  return (
    <s.RowTable>
      <Table
        data={dataTable}
        columns={[
          {
            Header: 'Data da Transação',
            accessor: 'transactionDate',
          },
          {
            Header: 'Tipo',
            accessor: 'type',
          },
          {
            Header: 'Valor',
            accessor: 'value',
          },
        ]}
      />
    </s.RowTable>
  )
}

export default extractTable
