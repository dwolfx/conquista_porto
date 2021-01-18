import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import store from 'store'
import { Provider } from 'react-redux'
import useFormFluxManagement from './useFormFluxManagement'

interface ITestProvider {
  children: React.ReactNode
}

describe('FluxManagement', () => {
  it('should call hook useFormFluxManagement', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useFormFluxManagement(), { wrapper })
    act(() => {
      result.current.updateForm({})
    })

    expect(result.current.form).toEqual({})
  })
})
