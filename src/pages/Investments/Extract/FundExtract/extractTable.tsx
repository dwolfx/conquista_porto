import React from 'react'

import * as s from './styles'

interface IProps {
  dataTable: any[]
}

const extractTable: React.FC<IProps> = ({ dataTable }) => {
  return (
    <s.RowTable>
      <s.StyledTable
        data={dataTable}
        columns={[
          {
            Header: 'Data da Transação',
            accessor: 'data',
          },
          {
            Header: 'Tipo',
            accessor: 'tipo',
          },
          {
            Header: 'Valor',
            accessor: 'valor',
          },
        ]}
      />
    </s.RowTable>
  )
}

export default extractTable
