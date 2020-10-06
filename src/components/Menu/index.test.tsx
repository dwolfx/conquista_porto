import React, { useRef } from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import Menu from '.'

describe('Menu component', () => {
  it('should render correctly', () => {
    const scrollFn = jest.fn()
    renderWithReduxAndTheme(
      <Menu 
        scrollFunc={scrollFn}
        ref1={jest.fn().mockReturnValueOnce({current: {offsetTop: 0}}) as unknown as React.RefObject<HTMLDivElement>}
        ref2={jest.fn().mockReturnValueOnce({current: {offsetTop: 500}}) as unknown as React.RefObject<HTMLDivElement>} 
        ref3={jest.fn().mockReturnValueOnce({current: {offsetTop: 1300}}) as unknown as React.RefObject<HTMLDivElement>} 
        homeContentRef={jest.fn().mockReturnValueOnce({current: {getBoundingClientRect: jest.fn()}}) as unknown as React.RefObject<HTMLDivElement>} />
    )
      expect(screen.getByText('Produtos')).toBeTruthy()
      expect(screen.getByText('Objetivos')).toBeTruthy()
      expect(screen.getByText('Pontos')).toBeTruthy()
  })

  it('should be styled correctly', () => {
    const scrollFn = jest.fn()
    renderWithReduxAndTheme(
      <Menu 
        scrollFunc={scrollFn}
        ref1={jest.fn().mockReturnValueOnce({current: {offsetTop: 0}}) as unknown as React.RefObject<HTMLDivElement>}
        ref2={jest.fn().mockReturnValueOnce({current: {offsetTop: 500}}) as unknown as React.RefObject<HTMLDivElement>} 
        ref3={jest.fn().mockReturnValueOnce({current: {offsetTop: 1300}}) as unknown as React.RefObject<HTMLDivElement>} 
        homeContentRef={jest.fn().mockReturnValueOnce({current: {getBoundingClientRect: jest.fn()}}) as unknown as React.RefObject<HTMLDivElement>} />
    )
      expect(screen.getByTestId('produtos-option')).toHaveStyle('background-color: #F1F1F1;')
      expect(screen.getByTestId('objetivos-option')).toHaveStyle('background-color: transparent;')
      expect(screen.getByTestId('pontos-option')).toHaveStyle('background-color: transparent;')
  })

  it('should click on products button', () => {
    const scrollFn = jest.fn()
    renderWithReduxAndTheme(
      <Menu 
        scrollFunc={scrollFn}
        ref1={jest.fn().mockReturnValueOnce({current: {offsetTop: 0}}) as unknown as React.RefObject<HTMLDivElement>}
        ref2={jest.fn().mockReturnValueOnce({current: {offsetTop: 500}}) as unknown as React.RefObject<HTMLDivElement>} 
        ref3={jest.fn().mockReturnValueOnce({current: {offsetTop: 1300}}) as unknown as React.RefObject<HTMLDivElement>} 
        homeContentRef={jest.fn().mockReturnValueOnce({current: {getBoundingClientRect: jest.fn()}}) as unknown as React.RefObject<HTMLDivElement>} />
    )
      fireEvent.click(screen.getByTestId('produtos-option'))
      expect(scrollFn).toBeCalled()
  })
  it('should click on objectives button', () => {
    const scrollFn = jest.fn()
    renderWithReduxAndTheme(
      <Menu 
        scrollFunc={scrollFn}
        ref1={jest.fn().mockReturnValueOnce({current: {offsetTop: 0}}) as unknown as React.RefObject<HTMLDivElement>}
        ref2={jest.fn().mockReturnValueOnce({current: {offsetTop: 500}}) as unknown as React.RefObject<HTMLDivElement>} 
        ref3={jest.fn().mockReturnValueOnce({current: {offsetTop: 1300}}) as unknown as React.RefObject<HTMLDivElement>} 
        homeContentRef={jest.fn().mockReturnValueOnce({current: {getBoundingClientRect: jest.fn()}}) as unknown as React.RefObject<HTMLDivElement>} />
    )
      fireEvent.click(screen.getByTestId('objetivos-option'))
      expect(scrollFn).toBeCalled()
  })
  it('should click on points button', () => {
    const scrollFn = jest.fn()
    renderWithReduxAndTheme(
      <Menu 
        scrollFunc={scrollFn}
        ref1={jest.fn().mockReturnValueOnce({current: {offsetTop: 0}}) as unknown as React.RefObject<HTMLDivElement>}
        ref2={jest.fn().mockReturnValueOnce({current: {offsetTop: 500}}) as unknown as React.RefObject<HTMLDivElement>} 
        ref3={jest.fn().mockReturnValueOnce({current: {offsetTop: 1300}}) as unknown as React.RefObject<HTMLDivElement>} 
        homeContentRef={jest.fn().mockReturnValueOnce({current: {getBoundingClientRect: jest.fn()}}) as unknown as React.RefObject<HTMLDivElement>} />
    )
      fireEvent.click(screen.getByTestId('pontos-option'))
      expect(scrollFn).toBeCalled()
  })
})
