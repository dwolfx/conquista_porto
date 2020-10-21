export default class UnexpectedTextException extends Error {
  constructor(location: string, expected: string[], received: string) {
    super(
      `${location} expected ${expected
        .map(i => `"${i}"`)
        .join(' or ')}, but received "${received}".`
    )
    this.name = this.constructor.name
  }
}
