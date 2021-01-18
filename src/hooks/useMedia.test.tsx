import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import useMedia from './useMedia'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import store from 'store'
import { Provider } from 'react-redux'

interface ITestProvider {
  children: React.ReactNode
}

describe('Testing useMedia', () => {
  it('should call hook useMedia to see if is defined', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    )

    const { result } = renderHook(() => useMedia('sm'), { wrapper })
    expect(result.current).toBeDefined()
  })
})
