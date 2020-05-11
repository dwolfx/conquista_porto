export const ORDER_TYPES = {
  1: 'minimo_inicial',
  2: 'cotizacaoIndex',
  3: 'taxa_administracao',
  4: 'rentabil_fundo_mes',
  5: 'rentabil_fundo_ano',
  6: 'rentabil_fundo_12_meses',
}

export const ORDER_SORT = {
  1: 'asc',
  2: 'desc',
}

export const FILTER_TYPES = {
  1: 'renda fixa',
  2: 'multimercado',
  3: 'renda variável',
  4: 'investimento no exterior',
  5: 'cambial',
}

interface IFILTER_RISKS {
  [key: number]: string
}

export const FILTER_RISKS: IFILTER_RISKS = {
  1: 'baixo',
  2: 'medio-baixo',
  3: 'medio',
  4: 'medio-alto',
  5: 'alto',
}
