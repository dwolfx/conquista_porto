import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import useSuitability from './useSuitability'
import { MemoryRouter } from 'react-router-dom'
import store from 'store'

interface ITestProvider {
  children: React.ReactNode
}

describe('Suitability', () => {
  it('should call hook useSuitability', async () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
    const { result } = renderHook(
      () => useSuitability({ errorPath: '/', goalType: '1' }),
      { wrapper }
    )

    expect(result).toBeDefined()
  })
})
