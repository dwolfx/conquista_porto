export default class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
