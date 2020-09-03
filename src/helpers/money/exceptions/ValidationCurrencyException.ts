import CurrencyException from './CurrencyException'

export default class ValidationCurrencyException extends CurrencyException {
  constructor(value: String) {
    super(`The value "${value}" is not a currency`)
  }
}
