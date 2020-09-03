export default class UnexpectedTextException extends Error {
  constructor(location: String, expected: String[], received: String) {
    super(
      `${location} expected ${expected
        .map(i => `"${i}"`)
        .join(' or ')}, but received "${received}".`
    )
    this.name = this.constructor.name
  }
}
