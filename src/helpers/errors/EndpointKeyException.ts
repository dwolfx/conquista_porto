export default class EndpointKeyException extends TypeError {
  constructor(
    endpoint: string,
    key: string,
    expectedType: string,
    receivedType: string
  ) {
    super(
      `At endpoint ${endpoint} the key ${key} expects to be of type ${expectedType}, but it is of type ${receivedType}.`
    )
    this.name = this.constructor.name
  }
}
