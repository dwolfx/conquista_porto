import { renderHook } from '@testing-library/react-hooks'
import useFetchSuitabilityInfo from './useFetchSuitabilityInfo'

describe('Suitability', () => {
  it('should call hook useFetchSuitabilityInfo', () => {
    const { result } = renderHook(() => useFetchSuitabilityInfo())
    expect(result).toBeDefined()
  })
})
