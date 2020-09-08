interface IMessage {
  Mensagem: string
  TipoCritica: string
}

interface ICadastroPessoaProgramaType {
  codigoFidelidade: string
  dataInicioVigencia: string
  nome: string
  segmento: string
}

interface ITypeExtract {
  dataCompra: string
  descricaoTipo: string
  nomeTransacao: string
  pontoGanho: string
  taxaCon: string
  tipoDebitoCredito: string
  valorCompra: string
}

export interface IPoints {
  Message: IMessage
  cadastroPessoaProgramaType: ICadastroPessoaProgramaType
  detalheExtratoOptemaisTypes: ITypeExtract[]
}
