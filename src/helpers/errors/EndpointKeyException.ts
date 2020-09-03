export default class EndpointKeyException extends TypeError {
  constructor(
    endpoint: String,
    key: String,
    expectedType: String,
    receivedType: String
  ) {
    super(
      `At endpoint ${endpoint} the key ${key} expects to be of type ${expectedType}, but it is of type ${receivedType}.`
    )
    this.name = this.constructor.name
  }
}
