
import { IBankExtract } from './types'
import { DateFormatter, MoneyFormatter, TypeFormatter, Description } from './utils'
export const columns = (isFundTransaction?: boolean) => {
  const columns = [
    {
      Header: 'DATA DA TRANSAÇÃO',
      accessor: 'data',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      padding: '14px 0',
      styles: {
        width: '25%',
        minWidth: 140,
        header: {
          width: '25%',
          minWidth: 140,
        },
      },
      format: (row: IBankExtract) => DateFormatter(row),
    },
    {
      Header: 'TIPO',
      accessor: 'tipo',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      styles: {
        width: '15%',
        minWidth: 100,
        header: {
          width: '15%',
          minWidth: 100,
        },
      },
      format: (row: IBankExtract) => TypeFormatter(row),
    },
    {
      Header: 'DESCRIÇÃO',
      accessor: 'descricao',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      styles: {
        width: '39%',
        minWidth: 120,
        header: {
          width: '37%',
          minWidth: 120,
        },
      },
      format: (row: IBankExtract) => Description(row),
    },
    {
      Header: 'VALOR',
      accessor: 'valor',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 120,
        width: '15%',
        header: {
          width: '24%',
          minWidth: 110,
        },
      },
      format: (row: IBankExtract) => MoneyFormatter(row),
    },
  ]

  // if (isFundTransaction) {
  //   return 
  // }
  return columns 
}
