import { renderHook } from '@testing-library/react-hooks'
import useFetchTripInsurance from './useFetchTripInsurance'

describe('TripInsurance', () => {
  it('should call hook useFetchTripInsurance', () => {
    const { result } = renderHook(() => useFetchTripInsurance())
    expect(result).toBeDefined()
  })
})
