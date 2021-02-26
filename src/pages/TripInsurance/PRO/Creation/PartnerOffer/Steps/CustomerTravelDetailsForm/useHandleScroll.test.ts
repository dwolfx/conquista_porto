import { renderHook } from '@testing-library/react-hooks'
import useHandleScroll from './useHandleScroll'

describe('CustomerTravelDetailsForm', () => {
  it('should call hook useFetchFundDetails', () => {
    const { result } = renderHook(() => useHandleScroll())
    expect(result).toBeDefined()
  })
})
