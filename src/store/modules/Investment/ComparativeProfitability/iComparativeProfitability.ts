export default interface IComparativeProfitability {
  hist_rentabil_benchmark: IHistoryBenchmark
  hist_rentabil_fundo: IHistoryFund
}

interface IHistoryBenchmark {
  benchmark: {
    id: number
    nome: string
  }
  rentabil_Ano: string
  rentabil_mes: string
  rentabil_dia: string
  rentabil_mes_anteiror: string
  rentabil_12_meses: string
  rentabil_24_meses: string
  rentabil_36_meses: string
}

interface IHistoryFund {
  id_carteira: number
  rentabil_dia: string
  rentabil_mes: string
  rentabil_ano: string
  rentabil_mes_anteiror: string
  rentabil_12_meses: string
  rentabil_24_meses: string
  rentabil_36_meses: string
  rel_fundo_benchmark_dia: string
  rel_fundo_benchmark_mes: string
  rel_fundo_benchmark_ano: string
  rel_fundo_benchmark_mes_ant: string
  rel_fundo_benchmark_12_meses: string
  rel_fundo_benchmark_24_meses: string
  rel_fundo_benchmark_36_meses: string
}
