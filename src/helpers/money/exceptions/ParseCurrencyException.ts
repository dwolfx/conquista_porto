import CurrencyException from './CurrencyException'

export default class ParseCurrencyException extends CurrencyException {
  constructor(value: String) {
    super(`The value "${value}" can not be parsed`)
  }
}
