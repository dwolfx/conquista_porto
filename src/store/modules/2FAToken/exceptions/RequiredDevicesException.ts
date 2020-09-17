export default class RequiredDevicesException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
