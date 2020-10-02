import Exception from 'helpers/errors/Exception'
export default class NotFoundObjectiveTypeException extends Exception {
  constructor(field: string, value: string) {
    super(`Not found objetive type ${field} ${value}`)
  }
}
