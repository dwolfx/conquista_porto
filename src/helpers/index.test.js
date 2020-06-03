import {
  formatMoney,
  formatMoneyDecimal,
  capitalize,
  formatNumber,
  rgba,
} from '.'

describe('formatMoney', () => {
  describe('accepts number format', () => {
    test('value 1250 should return "R$ 1.250,00"', () => {
      expect(formatMoney(1250)).toBe('R$ 1.250,00')
    })
    test('value 125.0 should return "R$ 125,00"', () => {
      expect(formatMoney(125.0)).toBe('R$ 125,00')
    })
    test('value 12.50 should return "R$ 12,50"', () => {
      expect(formatMoney(12.5)).toBe('R$ 12,50')
    })
  })

  describe('accepts string format', () => {
    test('value 1250 should return "R$ 1.250,00"', () => {
      expect(formatMoney('1250')).toBe('R$ 1.250,00')
    })
    test('value 125.0 should return "R$ 125,00"', () => {
      expect(formatMoney('125.0')).toBe('R$ 125,00')
    })
    test('value 12.50 should return "R$ 12,50"', () => {
      expect(formatMoney('182.5')).toBe('R$ 182,50')
    })
  })
})

describe('formatMoneyDecimal', () => {
  test('value 1500 should return "15,00"', () => {
    expect(formatMoneyDecimal('1500')).toBe('15,00')
  })
  test('value 1522 should return "15,22"', () => {
    expect(formatMoneyDecimal('1522')).toBe('15,22')
  })
})

describe('capitalize', () => {
  test('"conquista" becoming "Conquista"', () => {
    expect(capitalize('conquista')).toBe('Conquista')
  })
})

describe('formatMoneyWithoutCurrencyFlag', () => {
  test('', () => {})
})

describe('formatNumber', () => {
  test('"130.51" becoming "130,51"', () => {
    expect(formatNumber('130.51')).toBe('130,51')
  })
  test('"10030.50" becoming "10.030,50"', () => {
    expect(formatNumber('10030.50', { minimumFractionDigits: 2 })).toBe(
      '10.030,50'
    )
  })
  test('"0.50" becoming "0,50"', () => {
    expect(formatNumber('0.50', { minimumFractionDigits: 2 })).toBe('0,50')
  })
  test('"0.5" becoming "0,5"', () => {
    expect(formatNumber('0.5')).toBe('0,5')
  })
})

describe('hexToRgb', () => {
  test('#ffffff becoming "rgba(255, 255, 255, 0.5)"', () => {
    expect(rgba('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)')
  })

  test('#812dd3 becoming "rgba(129, 45, 211, 1)"', () => {
    expect(rgba('#812dd3', 1)).toBe('rgba(129, 45, 211, 1)')
  })
})
