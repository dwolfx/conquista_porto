import CurrencyException from './CurrencyException'

export default class ParseCurrencyException extends CurrencyException {
  constructor(value: string) {
    super(`The value "${value}" can not be parsed`)
  }
}
