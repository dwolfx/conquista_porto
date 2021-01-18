import { renderHook } from '@testing-library/react-hooks'
import useFetchBankExtract from './useFetchBankExtract'

describe('BankExtract', () => {
  it('should call hook useFetchBankExtract', () => {
    const { result } = renderHook(() => useFetchBankExtract())
    expect(result).toBeDefined()
  })
})
