import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { renderHook } from '@testing-library/react-hooks'
import store from 'store'

import useQueryParams from './useQueryParams'

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
