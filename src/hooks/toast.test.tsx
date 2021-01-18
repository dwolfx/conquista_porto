import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useToast, ToastProvider } from './toast'
import theme from 'styles/theme'
import { ThemeProvider } from 'styled-components'

const wrapper = ({ children }: any) => (
  <ThemeProvider theme={theme}>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
)

describe('Testing Toast', () => {
  it('should call add toast ', () => {
    const { result } = renderHook(() => useToast(), { wrapper })

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'teste',
        description: 'teste',
      })
    })

    expect(result.current.toasts?.length).toEqual(1)
  })
})
