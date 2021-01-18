import { renderHook } from '@testing-library/react-hooks'
import useFetchConsortiumVehicle from './useFetchConsortiumVehicle'

describe('ConsortiumVehicle', () => {
  it('should call hook useFetchConsortiumVehicle', () => {
    const { result } = renderHook(() => useFetchConsortiumVehicle())
    expect(result).toBeDefined()
  })
})
