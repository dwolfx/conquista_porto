import ParseCurrencyException from './exceptions/ParseCurrencyException'
import CompareCurrencyException from './exceptions/CompareCurrencyException'
import ValidationCurrencyException from './exceptions/ValidationCurrencyException'

/**
 * Represents in an abstract way and deals with currency values
 *
 * @export
 * @abstract
 * @class Currency
 *
 * @example
 * import { BRLCurrency, Currency, errors } from 'helpers/money'
 *
 * try {
 *   const n1 = new BRLCurrency('R$ 10,00')
 *   const n2 = new BRLCurrency('R$ 15,00')
 *   const n3 = new BRLCurrency(Currency.parse(20))
 *
 *   console.log(n2.mustBeGreaterThen(n1).mustBeLessThen(n3).value)
 * } catch (error) {
 *
 *   switch (error.constructor) {
 *     case errors.ParseCurrencyException:
 *       console.log('Treatment A')
 *       break
 *     case errors.CompareCurrencyException:
 *       console.log('Treatment B')
 *       break
 *     default:
 *       console.log('Treatment C')
 *   }
 * }
 */
export default abstract class Currency {
  public readonly value: string
  public readonly context: Intl.NumberFormat

  /**
   * Aplly @method validation in monetary value with context passed by the child
   *
   * @memberof Currency
   * @param {string} value - Monetary value
   * @param {Intl.NumberFormat} context - Number format context
   *
   * @example
   * const n1 = new BRLCurrency('1.500,00')
   * const n2 = new BRLCurrency('1500') // throw error
   */
  constructor(value: string, context: Intl.NumberFormat) {
    if (!this.validation(value)) throw new ValidationCurrencyException()

    this.value = value
    this.context = context
  }

  /**
   * Converts numerical value to monetary value at the chosen locales
   *
   * @static
   * @memberof Currency
   * @param {number} value - Numberical value to be converted
   * @param {boolean} hasSymbol - Whether to show the currency symbol
   * @param {string} lang - Currency Locales. "pt-BR" by default.
   * @param {Intl.NumberFormatOptions} numberFormatOptions - Currency type and number style
   * @returns {string} - Representation of monetary value
   *
   * @example
   * Currency.parse(12) // 12,00
   * Currency.parse(9.34, true) // R$ 9,34
   * const n1 = new BRLCurrency(Currency.parse(8)) // BRLCurrency('R$ 8,00')
   */
  static parse(
    value: number,
    hasSymbol: boolean = false,
    lang: string = 'pt-BR',
    numberFormatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'BRL',
    }
  ) {
    const commons = {
      minimumFractionDigits: 2,
    }

    try {
      return hasSymbol
        ? Intl.NumberFormat(lang, {
            ...numberFormatOptions,
            ...commons,
          }).format(value)
        : Intl.NumberFormat(lang, commons).format(value)
    } catch (error) {
      throw new ParseCurrencyException()
    }
  }

  /**
   * Transforms the monetary value into a numerical value
   * in the child implementation
   *
   * @abstract
   * @memberof Currency
   * @returns {number}
   *
   * @example
   * const n1 = new BRLCurrency('R$ 1.500,00')
   * const n2 = new BRLCurrency('R$ 800,56')
   * const n2 = new BRLCurrency('220,60')
   * n1.toNumber() // 1500
   * n2.toNumber() // 800.56
   * n3.toNumber() // 200.6
   */
  abstract toNumber(): number

  /**
   * Validates currency value according to the context
   * passed by the child
   *
   * @abstract
   * @memberof Currency
   * @param {string} value - Currency value
   * @returns {boolean} - Whether the currency value is valid
   *
   * @example
   * const n1 = new BRLCurrency('1.500,00')
   * const n2 = new BRLCurrency('R$ 1.500,00')
   * const n3 = new BRLCurrency('1500') // not valid format
   * const n4 = new BRLCurrency(1500) // not valid format
   */
  abstract validation(value: string): boolean

  /**
   * Chainable method that throws an exception if it is not satisfied
   *
   * @memberof Currency
   * @param {Currency} otherValue
   * @returns {Currency}
   *
   * @example
   * const n1 = new BRLCurrency('R$ 100,00')
   * const n2 = new BRLCurrency('R$ 100,00')
   * const n3 = new BRLCurrency('R$ 80,00')
   * n1.mustBeEqualTo(n2)
   * n1.mustBeEqualTo(n3) // throw error
   */
  mustBeEqualTo(otherValue: Currency): Currency {
    if (this.toNumber() !== otherValue.toNumber())
      throw new CompareCurrencyException('mustBeEqualTo')
    return this
  }

  /**
   * Chainable method that throws an exception if it is not satisfied
   *
   * @memberof Currency
   * @param {Currency} otherValue
   * @returns {Currency}
   *
   * @example
   * const n1 = new BRLCurrency('R$ 100,00')
   * const n2 = new BRLCurrency('R$ 100,00')
   * const n3 = new BRLCurrency('R$ 80,00')
   * n1.mustNotBeEqualTo(n3)
   * n1.mustNotBeEqualTo(n2) // throw error
   */
  mustNotBeEqualTo(otherValue: Currency): Currency {
    if (this.toNumber() === otherValue.toNumber())
      throw new CompareCurrencyException('mustNotBeEqualTo')
    return this
  }

  /**
   * Chainable method that throws an exception if it is not satisfied
   *
   * @memberof Currency
   * @param {Currency} otherValue
   * @returns {Currency}
   *
   * @example
   * const n1 = new BRLCurrency('R$ 80,00')
   * const n2 = new BRLCurrency('R$ 100,00')
   * n1.mustBeLessThen(n2)
   * n2.mustBeLessThen(n1) // throw error
   */
  mustBeLessThen(otherValue: Currency): Currency {
    if (this.toNumber() > otherValue.toNumber())
      throw new CompareCurrencyException('mustBeLessThen')
    return this
  }

  /**
   * Chainable method that throws an exception if it is not satisfied
   *
   * @memberof Currency
   * @param {Currency} otherValue
   * @returns {Currency}
   *
   * @example
   * const n1 = new BRLCurrency('R$ 100,00')
   * const n2 = new BRLCurrency('R$ 80,00')
   * n1.mustBeGreaterThen(n2)
   * n2.mustBeGreaterThen(n1) // throw error
   */
  mustBeGreaterThen(otherValue: Currency): Currency {
    if (this.toNumber() < otherValue.toNumber())
      throw new CompareCurrencyException('mustBeGreaterThen')
    return this
  }
}
