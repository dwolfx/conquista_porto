import { renderHook } from '@testing-library/react-hooks'
import useFetchVehicleFinancing from './useFetchVehicleFinancing'

describe('VehicleFinancing', () => {
  it('should call hook useFetchVehicleFinancing', () => {
    const { result } = renderHook(() => useFetchVehicleFinancing())
    expect(result).toBeDefined()
  })
})
