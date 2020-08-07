import { IFunds } from 'store/modules/Objective/types'
import { formatFundoInv, formatActions, FormatValue } from './utils'
import { THandleInputChangeFunction } from './types'

export const fundsType = [
  {
    name: 'Renda Fixa',
    value: 'Renda Fixa',
  },
  {
    name: 'Multimercado',
    value: 'multimercado',
  },
  {
    name: 'Ações',
    value: 'rendavariável',
  },
  {
    name: 'Investimento no Exterior',
    value: 'investimentonoexterior',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]

export const columns = (
  handleInputsChange: THandleInputChangeFunction,
  removeAction: (fundId: number) => void
) => [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '40%',
      minWidth: 208,
      header: {
        width: '38%',
        minWidth: 185,
      },
    },
    format: (row: IFunds) => formatFundoInv(row),
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFunds) =>
      FormatValue({
        row,
        onChange: handleInputsChange,
        type: 'initial_value',
      }),
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '20%',
      minWidth: 120,
      header: {
        width: '19%',
        minWidth: 120,
      },
    },
  },
  {
    Header: 'INV. MENSAL',
    accessor: 'monthly_value',
    format: (row: IFunds) =>
      FormatValue({
        row,
        onChange: handleInputsChange,
        type: 'monthly_value',
      }),
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '20%',
      minWidth: 120,
      header: {
        width: '19%',
        minWidth: 110,
      },
    },
  },
  {
    Header: '',
    accessor: 'actions',
    format: (row: IFunds) => formatActions(row, removeAction),
    align: 'center',
    styles: {
      width: '5%',
      minWidth: 80,
      header: {
        width: '5%',
        minWidth: 60,
      },
    },
  },
]
