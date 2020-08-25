export default interface ITransaction {
  id_fundo: number
  id_operacao: number
  data_operacao: number
  tipo_operacao: string
  data_liquidacao: number
  valor_bruto: number
}
