import { renderHook } from '@testing-library/react-hooks'
import useFetchBankData from './useFetchBankData'

describe('BankData', () => {
  it('should call hook useFetchBankData', () => {
    const { result } = renderHook(() => useFetchBankData())
    expect(result).toBeDefined()
  })
})
