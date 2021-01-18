import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import store from 'store'
import { Provider } from 'react-redux'
import useStackFluxManagement from './useStackFluxManagement'
import { Steps } from 'pages/TripInsurance/Creation/types'

interface ITestProvider {
  children: React.ReactNode
}

describe('Stack FluxManagament', () => {
  it('should call hook useStackFluxManagement to add all steps', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useStackFluxManagement(), { wrapper })
    act(() => {
      result.current.instantiate(Steps.originTrip)
      result.current.instantiate(Steps.coverageDate)
      result.current.instantiate(Steps.passengerStep)
      result.current.instantiate(Steps.adventureSports)
      result.current.instantiate(Steps.motocicleQuestion)
      result.current.instantiate(Steps.choosePlan)
      result.current.instantiate(Steps.companionStep)
      result.current.instantiate(Steps.paymentStep)
      result.current.instantiate(Steps.informationConfirmation)
    })
    expect(result.current.getLength()).toEqual(9)

    act(() => {
      result.current.reset()
    })
  })

  it('should call hook useStackFluxManagement to remove step', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useStackFluxManagement(), { wrapper })
    act(() => {
      result.current.instantiate(Steps.originTrip)
    })
    expect(result.current.getLength()).toEqual(1)

    act(() => {
      result.current.pop()
    })
    expect(result.current.getLength()).toEqual(0)
  })

  it('should call hook useStackFluxManagement to get last step', () => {
    const wrapper = ({ children }: ITestProvider) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useStackFluxManagement(), { wrapper })
    act(() => {
      result.current.instantiate(Steps.originTrip)
      result.current.instantiate(Steps.coverageDate)
    })
    expect(result.current.getLength()).toEqual(2)

    act(() => {
      result.current.getLast()
    })
    expect(result.current.getLast()).toEqual(result.current.stack[1])
  })
})
