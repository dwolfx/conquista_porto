import { renderHook } from '@testing-library/react-hooks'
import useFetchPosition from './useFetchPosition'
import useFetchInvestmentsList from './useFetchInvestmentsList'
import useFetchFundDetails from './useFetchFundDetails'

describe('Investiments', () => {
  it('should call hook useFetchFundDetails', () => {
    const { result } = renderHook(() => useFetchFundDetails())
    expect(result).toBeDefined()
  })

  it('should call hook useFetchInvestmentsList', () => {
    const { result } = renderHook(() => useFetchInvestmentsList())
    expect(result).toBeDefined()
  })

  it('should call hook useFetchPosition', () => {
    const { result } = renderHook(() => useFetchPosition())
    expect(result).toBeDefined()
  })
})
