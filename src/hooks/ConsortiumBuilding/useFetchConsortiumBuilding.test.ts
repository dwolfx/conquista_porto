import { renderHook } from '@testing-library/react-hooks'
import useFetchConsortiumBuilding from './useFetchConsortiumBuilding'

describe('ConsortiumBuilding', () => {
  it('should call hook useFetchConsortiumBuilding', () => {
    const { result } = renderHook(() => useFetchConsortiumBuilding())
    expect(result).toBeDefined()
  })
})
