import CurrencyException from './CurrencyException'

export default class ValidationCurrencyException extends CurrencyException {
  constructor(value: string) {
    super(`The value "${value}" is not a currency`)
  }
}
