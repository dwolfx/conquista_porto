import { renderHook } from '@testing-library/react-hooks'
import useFetchPointsBalance from './useFetchPointsBalance'

describe('Points', () => {
  it('should call hook useFetchPointsBalance', () => {
    const { result } = renderHook(() => useFetchPointsBalance())
    expect(result).toBeDefined()
  })
})
