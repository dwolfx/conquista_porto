import { renderHook } from '@testing-library/react-hooks'
import useFetchCustomerProfile from './useFetchCustomerProfile'
import { useCustomerProfile } from './useCustomerProfile'

describe('CustomerProfile', () => {
  it('should call hook useFetchCustomerProfile', () => {
    const { result } = renderHook(() => useFetchCustomerProfile())
    expect(result).toBeDefined()
  })

  it('should call hook useCustomerProfile', () => {
    const { result } = renderHook(() => useCustomerProfile())
    expect(result).toBeDefined()
  })
})
