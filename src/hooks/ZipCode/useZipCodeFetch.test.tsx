import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import store from 'store'
import useZipCodeFetch from './useZipCodeFetch'

const value = (Math.floor(Math.random() * 1000000) + 99999999).toString()
const zipcode = [value.slice(0, 5), '-', value.slice(-3)].join('')

test('should increment counter', async () => {
  const { result } = renderHook(() => useZipCodeFetch(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  })

  act(() => {
    result.current.searchZipCode(zipcode)
  })

  expect(result.current.isLoading).toBe(true)
  expect(result.current.data).toMatchObject({
    data: null,
    hasError: false,
    isLoading: false,
  })
})
