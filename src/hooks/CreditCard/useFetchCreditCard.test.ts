import { renderHook } from '@testing-library/react-hooks'
import useFetchCreditCard from './useFetchCreditCard'

describe('CreditCard', () => {
  it('should call hook useFetchCreditCard', () => {
    const { result } = renderHook(() => useFetchCreditCard())
    expect(result).toBeDefined()
  })
})
