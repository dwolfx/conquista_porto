import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import store from 'store'
import { Provider } from 'react-redux'
import useSelectedPosition from './useSelectedPosition'

interface ITestProvider {
  children: React.ReactNode
}

describe('Testing useSelectedPosition', () => {
  it('should call hook useSelectedPositions to see if is defined', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>{children}</Provider>
    )

    const { result } = renderHook(() => useSelectedPosition(), { wrapper })

    expect(result).toBeDefined()
  })
})
