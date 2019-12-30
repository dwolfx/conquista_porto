import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

export default function useExtract() {
  const [data] = useState(useSelector(state => state.bankData.data))
  const [statementData, setStatementData] = useState([])
  useEffect(() => {
    if (!data[0]) return
    data[0].ultimaOperacoes.map(transaction =>
      setStatementData([
        ...statementData,
        {
          transactionDate: transaction.data,
          type: transaction.tipo,
          value: transaction.valor,
          effectuationDate: transaction.data,
        },
      ])
    )
  }, [data])

  const statementColumns = [
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
    {
      Header: 'Data de Efetivação',
      accessor: 'effectuationDate',
    },
  ]

  const selectOptions = [
    {
      name: 'Últimos 7 dias',
      value: 7,
    },
    {
      name: 'Últimos 30 dias',
      value: 30,
    },
    {
      name: 'Período específico',
      value: 'other',
    },
  ]

  return [statementColumns, statementData, selectOptions]
}
