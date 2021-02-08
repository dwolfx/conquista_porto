import * as t from './types'

// const temporária, retirar quando o serviço de bancos estiver disponível
export const bankData = [
  {
    name: 'HSBC Bank do Brasil',
  },
  {
    name: 'Banco Itaú S/A',
  },
  {
    name: 'BCO Bancoob',
  },
  {
    name: 'Banco do Brasil S/A',
  },
  {
    name: 'Santander S/A',
  },
  {
    name: 'Bradesco S/A',
  },
  {
    name: 'Credisis Noroeste Ltda.',
  },
  {
    name: 'Uniprime',
  },
]

// const temporária, retirar quando o serviço de bancos estiver disponível
export const administrationFeeData = [
  {
    name: 'Pagamento integral no ato da venda',
  },
  {
    name: '1% no ato + 1% dividido nas 3 primeiras parcelas',
  },
  {
    name: '2% dividido nas 3 primeiras parcelas',
  },
  {
    name: '2% x 5 primeiras parcelas',
  },
  {
    name: '2% dividido nas 12 primeiras parcelas',
  },
  {
    name: '1% no ato + 1% dividido nas 24 primeiras parcelas',
  },
  {
    name:
      '1% dividido nas 3 primeiras parcelas e 1% dividido nas 24 primeiras parcelas',
  },
  {
    name:
      '1% dividido nas 5 primeiras parcelas e 1% dividido nas 24 primeiras parcelas',
  },
  {
    name:
      '1% dividido nas 12 primeiras parcelas e 1% dividido nas 24 primeiras parcelas',
  },
]

export const formatOption: t.IFormatOption = (
  id,
  bankName,
  setSelectedBank
) => {
  return {
    id: Number(id),
    text: bankName,
    onClick: () =>
      setSelectedBank({
        id: Number(id),
        name: bankName,
      }),
  }
}

export const inputHandleChange: t.IInputHandleChange = (
  event,
  inputSetState
) => {
  event.target.value = event.target.value.replace(/\D/g, '')
  inputSetState(event.target.value)
}
