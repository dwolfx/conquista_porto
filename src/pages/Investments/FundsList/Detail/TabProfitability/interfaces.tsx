export interface IProps {
  histRentabilBenchmark: IHistRentabilBenchmark
  histRentabilFundo: IHistRentabilFundo
}

export interface IFundProps {
  fund: {
    comparativo_hist_rentabil: {
      hist_rentabil_benchmark: IHistRentabilBenchmark
      hist_rentabil_fundo: IHistRentabilFundo
    }
  }
}

export interface IHistRentabilBenchmark {
  benchmark: {
    nome: string
  }
  rentabil_mes_anteiror: string
  rentabil_Ano: string
  rentabil_12_meses: string
  rentabil_24_meses: string
  rentabil_36_meses: string
}

export interface IHistRentabilFundo {
  rentabil_mes_anteiror: string
  rentabil_ano: string
  rentabil_12_meses: string
  rentabil_24_meses: string
  rentabil_36_meses: string
  rel_fundo_benchmark_mes_anteiror: string
  rel_fundo_benchmark_ano: string
  rel_fundo_benchmark_12_meses: string
  rel_fundo_benchmark_24_meses: string
  rel_fundo_benchmark_36_meses: string
}
