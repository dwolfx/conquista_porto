import Currency from './Currency'

export default class BRLCurrency extends Currency {
  constructor(
    value: string,
    numberFormatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }
  ) {
    super(value, Intl.NumberFormat('pt-BR', numberFormatOptions))
  }

  validation(value: string): boolean {
    return /(R\$)?[\t ]*((\d{1,3}\.?)+(,\d{2}))/.test(value)
  }

  toNumber(): number {
    return Number(
      this.value
        .replace(/[.]/g, '')
        .replace(/,/g, '.')
        .replace(/[^0-9.-]+/g, '')
    )
  }
}
