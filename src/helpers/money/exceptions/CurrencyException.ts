export default class CurrencyException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
