import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import store from 'store'
import { Provider } from 'react-redux'
import useQueryParams from './useQueryParams'
import { MemoryRouter } from 'react-router-dom'

interface ITestProvider {
  children: React.ReactNode
}

describe('Testing useParams', () => {
  test('should call hook useQueryParams to see if is defined', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )

    const { result } = renderHook(() => useQueryParams(), { wrapper })

    expect(result.current.get('idFund')).toBeDefined()
  })
})
