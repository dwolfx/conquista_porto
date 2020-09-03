import Currency from './Currency'
import BRLCurrency from './BRLCurrency'
import ParseCurrencyException from './exceptions/ParseCurrencyException'
import CompareCurrencyException from './exceptions/CompareCurrencyException'
import ValidationCurrencyException from './exceptions/ValidationCurrencyException'

const errors = {
  ParseCurrencyException,
  CompareCurrencyException,
  ValidationCurrencyException,
}

export { BRLCurrency, Currency, errors }
