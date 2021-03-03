import { renderHook } from '@testing-library/react-hooks'
import useFetchLifeInsurance from './useFetchLifeInsurance'

describe('LifeInsurance', () => {
  it('should call hook useFetchLifeInsurance', () => {
    const { result } = renderHook(() => useFetchLifeInsurance())
    expect(result).toBeDefined()
  })
})
